import { Conference } from './conference.model';
import { NflTeams } from './../../data/nflTeams.data';
import { NbaTeams } from './../../data/nbaTeams.data';
import { Component, OnInit } from "@angular/core";
import { Team } from './team.model';
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

        constructor(private nbaTeams: NbaTeams, private nflTeams: NflTeams, private bracketsService: BracketsService) {}

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
        bracketPicks: Array<Object>;
        userName: string = '';
        playoffWinners: Object = this.nflTeams.getPlayoffWinners();
        playoffScores: Object = this.nflTeams.getPlayoffScores();
        totalPoints: number = 0;
        topBracketScores: Object = {};
        roundsArray: Array<number>;
        hideExtraDetails: Array<boolean> = [];

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
                    this.setUpExtraDetails();
                    this.numberOfRounds(this.allSports[this.selectedSportIndex].playoffTeams[0].teams.length)
                    this.getBestPointFromScore();
                    const self = this;
                    setTimeout(function(){ self.showPicks(); }, 100);
                } else {
                    console.log('no picks from Picks object');
                }
            }
        );
      }

      private setUpExtraDetails() {
        const defaultExtraDetailToggle = true;
        for (const i in this.bracketPicks) {
          this.hideExtraDetails.push(defaultExtraDetailToggle);
        }
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

      public toggleAdditionalDetails(bracketNum: string) {
        this.hideExtraDetails[bracketNum] = !this.hideExtraDetails[bracketNum];
          // console.log(bracketNum);
          // const id = 'game-details-' + bracketNum;
          // const rows = document.getElementsByClassName(id);
          // console.log(rows);
          // for(const index in rows) {
          //   if (typeof rows[index] === 'object') {
              
          //     rows[index]['style'].display = "none";
          //   }
          // }
          // if (x.style.display === "none") {
          //     x.style.display = "table";
          // } else {
          //     x.style.display = "none";
          // }
      }
      public getRoundWins(round: number, picks: any, spot: any, conf: any) {
        const playoffWinners: Array<String> = this.playoffWinners[round];
        let roundWins: number = 0;
        if(spot) {console.log('round loop started ',spot);}
        for (let num in picks) {
            if (picks[num].round == round && 
                !picks[num].isStartingPosition &&
                (!spot || (spot === picks[num].spot && conf === picks[num].Conference))) {
                if (playoffWinners.indexOf(picks[num].team.name) > -1) {
                  if(spot) { console.log(spot, picks[num].team.name, picks[num].spot); }
                    roundWins++;
                }
            }
        }
        this.totalPoints += roundWins;
        return roundWins;
      }

      public getTotalPoints() {
        const bracketTotalPoints = this.totalPoints;
        this.totalPoints = 0;
        return bracketTotalPoints;
      }

      public getPointsFromScore(round: any, bracket: any,  bracketNum: any, metric: string, specificGame: any) {
        let spreadPoints = 0;
        let overUnderPoints = 0;
        let bonusPoints = 0;
        let totalPointsFromScore = 0;
        for(let game in bracket.scores.winners) {
          const gameValues = game.split('-');
          if((round === 'championship' && game === 'champoinship') ||
            Number(gameValues[1]) === round) {
            if(!specificGame || (specificGame.round === gameValues[1] 
              && specificGame.spot === gameValues[2] 
              && specificGame.Conference === gameValues[0])) {
              const winningScore: number = bracket.scores.winners[game] ? Number(bracket.scores.winners[game]) : 0;
              const losingScore: number = bracket.scores.losers[game] ? Number(bracket.scores.losers[game]) : 0;
              const spread: number = this.getSpread(game, bracketNum, winningScore, losingScore);
              const overUnder: number = winningScore + losingScore;
              const actualWinningScore: number = Number(this.playoffScores['winners'][game]);
              const actualLosingScore: number = Number(this.playoffScores['losers'][game]);
              const realSpread: number =  actualWinningScore - actualLosingScore;
              const realOverUnder: number = actualWinningScore + actualLosingScore;
              if (this.topBracketScores[game].spreadDiff === Math.abs(spread - realSpread)) { spreadPoints++; }
              if (this.topBracketScores[game].overUnderDiff === Math.abs(overUnder - realOverUnder)) { overUnderPoints++; }
              if (this.topBracketScores[game].winningScore === winningScore &&
                this.topBracketScores[game].losingScore === losingScore) { 
                  bonusPoints++; 
              }
            }
          }
        }

        this.totalPoints += spreadPoints + overUnderPoints + bonusPoints;
        return spreadPoints + ', ' + overUnderPoints + ', ' + bonusPoints;
      }

      public getBestPointFromScore() {
        for(let bracketNum in this.bracketPicks) {
          let bracketScores = this.bracketPicks[bracketNum]['currentPick']['scores'];
          for(let game in bracketScores.winners) {
            const winningScore: number = bracketScores.winners[game] ? Number(bracketScores.winners[game]) : 0;
            const actualWinningScore: number = Number(this.playoffScores['winners'][game]);
            const losingScore: number = bracketScores.losers[game] ? Number(bracketScores.losers[game]) : 0;
            const actualLosingScore: number = Number(this.playoffScores['losers'][game]);
            const spread: number = this.getSpread(game, bracketNum, winningScore, losingScore);
            const realSpread: number =  actualWinningScore - actualLosingScore;
            const overUnder: number = winningScore + losingScore;
            const realOverUnder: number = actualWinningScore + actualLosingScore;
            if (!this.topBracketScores[game]) {
              this.topBracketScores[game] = {
                'spreadDiff':  Math.abs(spread - realSpread),
                'overUnderDiff': Math.abs(overUnder - realOverUnder),
                'winningScore': this.playoffScores['winners'][game],
                'losingScore': this.playoffScores['losers'][game],
              }
            } else {
              if (this.topBracketScores[game].spreadDiff > Math.abs(spread - realSpread)) {
                this.topBracketScores[game].spreadDiff = Math.abs(spread - realSpread);
              }
              if(this.topBracketScores[game].overUnderDiff > Math.abs(overUnder - realOverUnder)) {
                this.topBracketScores[game].overUnderDiff = Math.abs(overUnder - realOverUnder);
              }
            }
          }
        }
      }

      private getSpread(game: string, bracketNum: any, winningScore: number, losingScore: number) {
        const gameValues = game.split('-');
        let previousRound;
        let previousTeamNum1;
        let previousTeamNum2;
        let previousTeamId1;
        let previousTeamId2;
        let previousTeamNames: Array<string>;
        let topTeamLost: boolean = false;
        let bottomTeamLost: boolean = false;
        let pickedLosingTeamToWin: boolean = false;
        let picksToWinTheRound;
        let playoffWinners: Array<String>;
        let previousPlayoffWinners: Array<String>;
        const picks = this.bracketPicks[bracketNum]['currentPick']['picks'];

        if (gameValues[0] === 'championship') {
          playoffWinners = this.playoffWinners['championship'] || [];
          previousRound = this.totalRounds;
          previousTeamNum1 = 0;
          previousTeamNum2 = 0;
          previousTeamId1 = this.allSports[this.selectedSportIndex].playoffTeams[0].name + '-round-' + previousRound + '-team-' + previousTeamNum1;
          previousTeamId2 = this.allSports[this.selectedSportIndex].playoffTeams[1].name + '-round-' + previousRound + '-team-' + previousTeamNum2;
        } else {
          playoffWinners = this.playoffWinners[String(gameValues[1])] || [];
          previousRound = Number(gameValues[1]) - 1;
          previousTeamNum1 = Number(gameValues[2])*2;
          previousTeamNum2 = previousTeamNum1 + 1;
          previousTeamId1 = gameValues[0] + '-round-' + previousRound + '-team-' + previousTeamNum1;
          previousTeamId2 = gameValues[0] + '-round-' + previousRound + '-team-' + previousTeamNum2;
        }

        previousPlayoffWinners = this.playoffWinners[previousRound] || [];
        const round = gameValues[0] === 'championship' ? 'championship' : 'round-' + (gameValues[1])
        let picksForRound: Array<any> = [];
        for(const num in picks) {
          if (picks[num].id.indexOf(round) > -1) {
            picksForRound.push(picks[num].team.name);
          }
        }
        for(const num in picks) {
          if (picks[num].id === previousTeamId1) {
            if (previousPlayoffWinners.indexOf(picks[num].team.name) > -1 || picks[num].team.isStartingPosition) {
              if (playoffWinners.indexOf(picks[num].team.name) > -1 && picksForRound.indexOf(picks[num].team.name) > -1) {
                return winningScore - losingScore;
              } else if (picksForRound.indexOf(picks[num].team.name) > -1) {
                pickedLosingTeamToWin = true;
              }
              topTeamLost = true;
            }
          } else if (picks[num].id === previousTeamId2) {
            if (previousPlayoffWinners.indexOf(picks[num].team.name) > -1 || picks[num].team.isStartingPosition) {
              if (playoffWinners.indexOf(picks[num].team.name) > -1 && picksForRound.indexOf(picks[num].team.name) > -1) {
                return winningScore - losingScore;
              } else if (picksForRound.indexOf(picks[num].team.name) > -1) {
                pickedLosingTeamToWin = true;
              }
              bottomTeamLost = true;
            }
          } 
        }
        if (bottomTeamLost && topTeamLost)  {
          //Hit case where calculating a spread before game has occurred
          return Math.abs(winningScore - losingScore);
        } else if (pickedLosingTeamToWin) {
          console.log('picked losing team to win!')
          return -Math.abs(winningScore - losingScore);
        }
        return Math.abs(winningScore - losingScore);
      }

      public countPicks(bracketNum: any) {
        let picksForRound: Array<any> = [];
        let totalRoundPicksCounted: number;
        const rounds = [2, 3, 4, 'champ']; //TODO: Get rounds from somewhere else
        const picks = this.bracketPicks[bracketNum]['currentPick']['picks'];

        for(const index in rounds) {
          totalRoundPicksCounted = 0;
          const roundString = rounds[index] === 'champ' ? rounds[index] : 'round-' + rounds[index];

          for(const num in picks) {
            if (picks[num].id.indexOf(roundString) > -1 && !picks[num].isStartingPosition) {
              if (!picksForRound[totalRoundPicksCounted]) {
                picksForRound[totalRoundPicksCounted] = []
              }
              picksForRound[totalRoundPicksCounted][index] =picks[num]
              totalRoundPicksCounted++;
            }
          }
        }
        console.log(picksForRound);
        return picksForRound;
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
        this.roundsArray = rounds;
      }
    }
    