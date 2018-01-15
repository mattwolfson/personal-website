import { NflTeams } from './../../data/nflTeams.data';
import { NbaTeams } from './../../data/nbaTeams.data';
import { Component, OnInit } from "@angular/core";
import { Team } from './team.model';
import { Conference } from './conference.model';
import { Validators } from '@angular/forms/src/validators';
import { BracketsService } from './brackets.service';
import { BracketPicks } from './bracketPicks.model';
import {Router} from '@angular/router';

@Component({
	selector: 'brackets',
	templateUrl: './make-brackets.component.html',
    styleUrls: ['./brackets.component.css',
                './../app.component.css']
})

export class MakeBracketsComponent implements OnInit {

        constructor(private nbaTeams: NbaTeams, 
            private nflTeams: NflTeams, 
            private bracketsService: BracketsService,
            private router: Router) {}

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

        public updateSportData() {
            this.firstRoundByes = 0;
            this.getPictureFromTeamElementId('champion').setAttribute('src', this.blankSpotImg);
            this.allTeamsPicked = false;
            this.yourPicks = [];
        }

        public loadLogo(round: Number, logo: String) {
            if (round === 1 || logo) {
                return require("../../img/bracket/" + this.allSports[this.selectedSportIndex].name.toLowerCase() + "/" + logo);
            }
            return this.blankSpotImg;
        }
    
        public advanceToNextRound(conferenceName: string, roundNumber: number, teamPosition: number, currentPositionId: string, rank: string) {
            const currentPick = this.findPick(currentPositionId);
            if (currentPick && !this.isTeamInNextRound(currentPick.conference, (roundNumber + 1).toString(), currentPick.team)) {
                const winningTeamPicture = this.imageSource + currentPick.team.logo;
                const newId = this.findFutureGameId(currentPositionId);
                const winningPictureBox = this.getPictureFromTeamElementId(newId);
                const previousWinnerImg = winningPictureBox.getAttribute('src');
                winningPictureBox.setAttribute('src', winningTeamPicture);
                const idValues = newId.split('-');

                if (newId !== 'champion') {
                    this.addPick(idValues[2], currentPick.team, idValues[4], false);
                    const competingTeamPosition = teamPosition % 2 === 0 ? ++teamPosition : --teamPosition;
                    const competingTeamId = conferenceName + '-round-' + roundNumber + '-team-' + competingTeamPosition;
                    this.clearLoserFromFutureGames(newId, previousWinnerImg);
                    this.clearLoserFromFutureGames(newId, this.getPictureFromTeamElementId(competingTeamId).getAttribute('src'));
                    if(this.playByeTeamBasedOnRank && roundNumber === 1) {
                        console.log('bye team check');
                        const idValues = newId.split('-');
                        let newTeamPosition = Number(idValues[4]);
                        const nextTeamToPlayPosition = newTeamPosition % 2 === 0 ? ++newTeamPosition : --newTeamPosition;
                        const nextTeamToPlayId = conferenceName + '-round-2-team-' + nextTeamToPlayPosition;
                        const nextTeamToPlayElem = document.getElementById(nextTeamToPlayId);
                        // this.clearLoserFromFutureGames(nextTeamToPlayId, newId);
                        if (nextTeamToPlayElem.classList.contains('byeTeam')) {
                            const teamToPlayIsHigherRanked: Boolean = nextTeamToPlayElem.classList.contains('rank1') ? true : false;
                            const byeTeamElems = document.getElementsByClassName('byeTeam');
                            let otherByeTeamInConfId = null;
                            for (const index in byeTeamElems) {
                                if (typeof byeTeamElems[index] === 'object') {
                                    const byeTeamId = byeTeamElems[index].getAttribute('id');
                                    if (byeTeamId.indexOf(conferenceName) > -1 && byeTeamId !== nextTeamToPlayId) {
                                        console.log(rank);
                                        otherByeTeamInConfId = byeTeamElems[index].getAttribute('id');
                                    }
                                }
                            }
                            if (otherByeTeamInConfId) {
                                const otherByeTeamIdValues = otherByeTeamInConfId.split('-');
                                let newTeamPosition = Number(otherByeTeamIdValues[4]);
                                const nextTeamToPlayPosition = newTeamPosition % 2 === 0 ? ++newTeamPosition : --newTeamPosition;
                                const teamPlayingOtherByeTeamId = conferenceName + '-round-2-team-' + nextTeamToPlayPosition;
                                const teamPlayingOtherByeTeamPicture = this.getPictureFromTeamElementId(teamPlayingOtherByeTeamId).getAttribute('src');
                                const competingTeamPicture = this.getPictureFromTeamElementId(competingTeamId).getAttribute('src');
                                if (teamPlayingOtherByeTeamPicture === competingTeamPicture ||
                                    teamPlayingOtherByeTeamPicture === winningTeamPicture) {
                                    this.getPictureFromTeamElementId(teamPlayingOtherByeTeamId).setAttribute('src',this.blankSpotImg);
                                    this.clearLoserFromFutureGames(otherByeTeamInConfId, teamPlayingOtherByeTeamPicture);
                                } else if (teamPlayingOtherByeTeamPicture.indexOf(this.blankImageName) === -1) {
                                    const playoffTeams = this.allSports[this.selectedSportIndex].playoffTeams
                                    for (const i in playoffTeams) {
                                        if(playoffTeams[i].name === conferenceName) {
                                            const conferenceTeams = playoffTeams[i].teams;
                                            for (const j in conferenceTeams) {
                                                if (teamPlayingOtherByeTeamPicture.indexOf(conferenceTeams[j].logo) > -1) {
                                                    if ((teamToPlayIsHigherRanked && conferenceTeams[j].conferenceRank > rank) ||
                                                        (!teamToPlayIsHigherRanked && conferenceTeams[j].conferenceRank < rank)) {
                                                        const newIdPictureElem = this.getPictureFromTeamElementId(newId);
                                                        this.getPictureFromTeamElementId(teamPlayingOtherByeTeamId)
                                                            .setAttribute('src', winningTeamPicture);
                                                        newIdPictureElem.setAttribute('src', teamPlayingOtherByeTeamPicture);
                                                        this.swapLocations(teamPlayingOtherByeTeamId, newId);
                                                        this.clearLoserFromFutureGames(teamPlayingOtherByeTeamId, teamPlayingOtherByeTeamPicture);
                                                        this.clearLoserFromFutureGames(newId, winningTeamPicture);
                                                        break
                                                    }
                                                }
                                            }
                                            break
                                        }
                                    }
                                    this.allSports[this.selectedSportIndex].playoffTeams[conferenceName]
                                }
                            }
                        }
                    } else {
                    }
                } else {
                    this.addPick('champ', currentPick.team, "0", false);
                }
                this.checkToUpdateSubmitButon();
            }
        }
    
        private findFutureGameId(currentPositionId: string) {
            const idValues = currentPositionId.split('-');
            const conferenceName = idValues[0];
            const roundNumber = Number(idValues[2]);
            const teamPosition = Number(idValues[4]);
            let newId;
            if (this.totalRounds === roundNumber) {
                newId = 'champion';
            } else {
                const newRound = roundNumber + 1;
                const newTeamPosition = Math.floor(teamPosition / 2);
                newId = conferenceName + '-round-' + newRound + '-team-' + newTeamPosition;
            }
            return newId;
        }
    
        private clearLoserFromFutureGames(futureWinnerId: string, losingTeamPicture: string) {
            if (losingTeamPicture !== this.blankSpotImg) {
                while (futureWinnerId !== 'champion') {
                    futureWinnerId = this.findFutureGameId(futureWinnerId);
                    let futureWinnerPictureElement = this.getPictureFromTeamElementId(futureWinnerId);
                    let futureWinnerPicture = futureWinnerPictureElement.getAttribute('src');
                    if (futureWinnerPicture === losingTeamPicture) {
                        this.deletePick(futureWinnerId);
                        futureWinnerPictureElement.setAttribute('src', this.blankSpotImg);
                    } else {
                        break;
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
    
    
      ngOnInit() {
        this.score['winners'] = {};
        this.score['losers'] = {};
        this.userName = localStorage.getItem('token') ? 'You are signed in. Feel free to make picks' : '';
      }
    
      public checkForUnpickedTeams(enableAlerts: boolean) {
          var images = document.getElementsByTagName('img');
          var allTeamsPicked = true;
          var playoffTeams = [];
          var yourFirstRoundPicks = [];
          var yourConferenceFinalPicks = [];
          var yourConferenceChampPicks = [];
          var yourFinalsChampPick;
          var currentTeamImg;
          var currentTeam;
          for(var i = 0; i < images.length; i++) {
              currentTeamImg = images[i].src
              if (currentTeamImg.indexOf(this.blankSpotImg) >= 0) {
                if(enableAlerts) {alert("SORREY!!!!\nYou can only submit a bracket once a team is picked for every matchup.\nPlease make a choice between the remaining matchups"); }
                  allTeamsPicked = false;
                  break;
              }
          }
    
          return allTeamsPicked;
      }
    
      public checkToUpdateSubmitButon() {
          this.allTeamsPicked = this.checkForUnpickedTeams(false);
      }
      public submitBracket(event: Event) {
          this.allTeamsPicked = this.checkForUnpickedTeams(true);
          const scoresToPick = this.yourPicks.length - this.allSports[this.selectedSportIndex].playoffTeams[0].teams.length*2;
          if (this.allTeamsPicked) {
              let allScoresPicked =  Object.keys(this.score['winners']).length === scoresToPick 
                &&  Object.keys(this.score['losers']).length === scoresToPick;
              if(!allScoresPicked) {
                  allScoresPicked = confirm("Are you sure you want to submit picks without scores for each game?");
              }

              if(allScoresPicked) {
                const picks = new BracketPicks(this.allSports[this.selectedSportIndex].name, 2017, JSON.stringify(this.yourPicks), 
                    JSON.stringify(this.score), 'Family');
                this.bracketsService.addBracketPicks(picks)
                    .subscribe(
                        data => console.log(data),
                        error => console.error(error)
                    );
                this.allTeamsPicked = false;
                this.yourPicks = [];
                this.router.navigateByUrl('/brackets/compare');
              }

            }
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
                        this.addPick("2", this.teamsWithBye[0], "0", true);
                        return this.teamsWithBye.concat(Array(roundedNumber-totalFirstRoundByes)
                            .fill(0).map((x, i) => i + totalFirstRoundByes));
                    } else if (totalFirstRoundByes === 2) {
                        this.addPick("2", this.teamsWithBye[0], "0", true);
                        this.addPick("2", this.teamsWithBye[1], (roundedNumber - 1).toString(), true);
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
            for (const team in round1Games) {
                if (round1Games[team].conference) {
                    this.addPick("1", round1Games[team], team, true);
                }
            }
            return round1Games;
        }

        private addPick(round: string, team: any, spot: string, isStartingPosition: Boolean) {
            const pickId = team.conference + "-round-" + round + "-team-" + spot;
            const pick = {
                'id': pickId,
                'round': round,
                'spot': spot,
                'Conference': team.conference,
                'team': team,
                'isStartingPosition': isStartingPosition
            };
            //Remove same pick if it exists
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (this.yourPicks[i].id == pickId) {
                    this.yourPicks.splice(i, 1)
                    break;
                }
            }
            this.yourPicks.push(pick);
        }

        private findPick(pickId: string) {
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (this.yourPicks[i].id == pickId) {
                    return this.yourPicks[i];
                }
            }
            return null;
        }
        
        private isTeamInNextRound(conference: string, round: string, team: any) {
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (this.yourPicks[i].conference === conference &&
                    this.yourPicks[i].round === round &&
                    this.yourPicks[i].team === team) {
                    return true;
                }
            }
            return false;
        }

        private deletePick(pickId: string) {
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (this.yourPicks[i].id == pickId) {
                    this.yourPicks.splice(i, 1)
                    break;
                }
            }
        }
        
        private clearPicks() {
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (!this.yourPicks[i].isStartingPosition) {
                    this.yourPicks.splice(i, 1)
                }
            }
        }

        private swapLocations(pickId1: string, pickId2: string) {
            const pickId1Values = pickId1.split('-');
            const pickId2Values = pickId2.split('-');
            let pick1Index;
            let pick2Index;
            for(var i = 0; i < this.yourPicks.length; i++) {
                if (this.yourPicks[i].id == pickId1) {
                    pick1Index = i;
                } else if (this.yourPicks[i].id == pickId2) {
                    pick2Index = i;
                }
            }
            this.yourPicks[pick1Index].id = pickId2;
            this.yourPicks[pick1Index].round = pickId2Values[2]
            this.yourPicks[pick1Index].spot = pickId2Values[4]
            this.yourPicks[pick2Index].id = pickId1;
            this.yourPicks[pick2Index].round = pickId1Values[2]
            this.yourPicks[pick2Index].spot = pickId1Values[4]
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
    