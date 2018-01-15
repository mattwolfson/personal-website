import { NflTeams } from './../../data/nflTeams.data';
import { NbaTeams } from './../../data/nbaTeams.data';
import { Component, OnInit } from "@angular/core";
import { Team } from './team.model';
import { Conference } from './conference.model';
import { Validators } from '@angular/forms/src/validators';
import { BracketsService } from './brackets.service';
import { BracketPicks } from './bracketPicks.model';
import { Element } from '@angular/compiler';

@Component({
	selector: 'brackets',
	templateUrl: './compare-brackets.component.html',
    styleUrls: ['./brackets.component.css',
                './../app.component.css']
})

export class CompareBracketsComponent implements OnInit {

        constructor(private nbaTeams: NbaTeams, private nflTeams: NflTeams, private bracketsService: BracketsService,) {}

        blankImageName: string = 'Solid_white.svg';
        blank = new Team(null, this.blankImageName, 'nbaEast');
        blankSpotImg = require("../../img/bracket/nba/" + this.blank.logo);
        imageSource = this.blankSpotImg.replace(this.blankImageName, '');
        totalRounds: number;
        allTeamsPicked: Boolean = false;
        firstRoundByes: number = 0;
        teamsWithBye: Array<any>;
        playByeTeamBasedOnRank: Boolean = true;
        yourPicks: Array<any> = [];
        score: Object = {};
        bracketPicks: BracketPicks;
        userName: string = '';

        allSports = [
            {
                name: 'NBA', //Needs to be the same as the folder in img/bracket
                playoffTeams: this.nbaTeams.getPlayoffTeams()
            }, {
                name: 'NFL',
                playoffTeams: this.nflTeams.getPlayoffTeams()
            }
        ];
        selectedSportIndex = this.allSports.length - 1;

      ngOnInit() {
        this.score['winners'] = {};
        this.score['losers'] = {};
        this.userName = localStorage.getItem('token') ? 'You are signed in. Feel free to make picks' : '';
        this.bracketsService.getBracketPicks()
        .subscribe(
            (picks) => {
                if (picks) {
                    console.log(picks);
                    this.bracketPicks = picks;
                    const self = this;
                    setTimeout(function(){ self.showPicks(); }, 100);
                } else {
                    console.log('no picks from Picks object');
                }
            }
        );
      }

      updateSportData() {
        this.getPictureFromTeamElementId('champion').setAttribute('src', this.blankSpotImg);
        const self = this;
        setTimeout(function(){ self.showPicks(); }, 100);
      }

      public showPicks() {
        for(let bracketNum in this.bracketPicks) {
            const picksData = this.bracketPicks[bracketNum]['currentPick'];

            if(picksData.sport === this.allSports[this.selectedSportIndex].name) {

                for(let pick of picksData.picks) {
                    if (!pick.isStartingPosition) {
                        const id = pick.round === 'champ' ? 'champion' : pick.id;
                        const currentPictureElement = this.getPictureFromTeamElementId(bracketNum + '-' + id);
                        currentPictureElement.setAttribute('src', this.imageSource + pick.team.logo);
                    }
                }
                for(let game in picksData.scores['winners']) {
                  const winningScore: any = document.getElementById(bracketNum + '-' + game + '-winner');
                  winningScore.value = picksData.scores['winners'][game];
                }
                for(let game in picksData.scores['losers']) {
                  const losingScore: any = document.getElementById(bracketNum + '-' + game + '-loser');
                  losingScore.value = picksData.scores['losers'][game];
                }
            }
        }
      }


        private getPictureFromTeamElementId(id: string) {
            const team = document.getElementById(id);
            for(let index in team.children) {
                if (team.children[index].className === 'teamPicture') {
                    return team.children[index];
                }
            };
        }
      
      public loadLogo(round: Number, logo: String) {
        if (round === 1 || logo) {
            return require("../../img/bracket/" + this.allSports[this.selectedSportIndex].name.toLowerCase() + "/" + logo);
        }
        return this.blankSpotImg;
      }

    
      public teamsInRound(conferenceTeams: Team[], roundNumber: number) {
        const totalFirstRoundByes = this.firstRoundByes;
        const key: string = 'conferenceRank';
        let byesCounted: number = 0;

        if (roundNumber !== 1) {
            if (roundNumber === 2 && totalFirstRoundByes > 0) {
                const numberOfTeams = conferenceTeams.length + totalFirstRoundByes;
                const roundedNumber = Math.ceil(numberOfTeams / (Math.pow(2, roundNumber - 1)));
                if (totalFirstRoundByes === 1) { //Assume the Max teams on a bye is 2
                    return this.teamsWithBye.concat(Array(roundedNumber-totalFirstRoundByes)
                        .fill(0).map((x, i) => i + totalFirstRoundByes));
                } else if (totalFirstRoundByes === 2) {
                    return [].concat.apply([], [this.teamsWithBye[0], 
                        Array(roundedNumber-totalFirstRoundByes).fill(0).map((x, i) => i + totalFirstRoundByes - 1),
                         this.teamsWithBye[1]]);
                }
                console.log("More than 2 teams on bye!! Unhandled case");
                return this.teamsWithBye.concat(Array(roundedNumber-totalFirstRoundByes)
                    .fill(0).map((x, i) => i + totalFirstRoundByes));
            } 
            const numberOfTeams = conferenceTeams.length;
            const roundedNumber = Math.ceil(numberOfTeams / (Math.pow(2, roundNumber - 1)));
            return Array(roundedNumber).fill(0).map((x, i) => i);
        }

        const sortedConferenceTeams = conferenceTeams.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        this.teamsWithBye = sortedConferenceTeams.slice(0,this.firstRoundByes);
        
        const teamsPlayingInRound1 = sortedConferenceTeams.slice(this.firstRoundByes);

        const betterRound1Teams = teamsPlayingInRound1.slice(0, teamsPlayingInRound1.length/2);
        const worseRound1Teams = teamsPlayingInRound1.slice(teamsPlayingInRound1.length/2).reverse();
        const round1MatchUps = betterRound1Teams.reduce(function(arr, v, i) {
                return arr.concat(v, worseRound1Teams[i]); 
            }, []);
        const round1Games = this.addBlankMatchUpsToRound(byesCounted, round1MatchUps);
        return round1Games;
    }



      private addBlankMatchUpsToRound(byesCounted: number, teamsPlayingInRound: Array<any>): Array<any> {
        const spacer = new Team(null, null, null, 'spacerTeam');
        const blankMatchup: Team[] = [spacer,  spacer];
        let byesToAccountFor = this.firstRoundByes - byesCounted;
        while (byesToAccountFor > 0) {
            if (byesToAccountFor === 1) {
                return [].concat.apply([], [blankMatchup, teamsPlayingInRound]);
            }
            teamsPlayingInRound = [].concat.apply([], [blankMatchup, teamsPlayingInRound, blankMatchup]);
            byesToAccountFor = byesToAccountFor - 2;
        }
        return teamsPlayingInRound;
      }
          
      public numberOfRounds(numberOfTeams: number) {
        const roundEstimate = Math.log(numberOfTeams) / Math.log(2);
        let rounds;
        if (roundEstimate % 1 === 0) {
            rounds = Array(roundEstimate + 1).fill(0).map((x, i) => i + 1);
        } else {
            this.firstRoundByes = Math.pow(2, Math.ceil(roundEstimate)) - numberOfTeams;
            rounds = Array(Math.ceil(roundEstimate) + 1).fill(0).map((x, i) => i + 1);
        }
        this.totalRounds = rounds.length;
        return rounds;
      }
    }
    