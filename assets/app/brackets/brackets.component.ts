import { NflTeams } from './../../data/nflTeams.data';
import { NbaTeams } from './../../data/nbaTeams.data';
import { Component, OnInit } from "@angular/core";
import { Team } from './team.model';
import { Conference } from './conference.model';

@Component({
	selector: 'brackets',
	templateUrl: './brackets.component.html',
    styleUrls: ['./brackets.component.css',
                './../app.component.css']
})

export class BracketsComponent implements OnInit {

        constructor(private nbaTeams: NbaTeams, private nflTeams: NflTeams) {}

        blankImageName: string = 'Solid_white.svg';
        blank = new Team(null, this.blankImageName, 'nbaEast');
        blankSpotImg = require("../../img/bracket/nba/" + this.blank.logo);
        totalRounds: number;
        allTeamsPicked: Boolean = false;
        firstRoundByes: number = 0;
        teamsWithBye: Array<any>;
        playByeTeamBasedOnRank: Boolean = true;

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
        }

        public loadLogo(round: Number, logo: String) {
            if (round === 1 || logo) {
                return require("../../img/bracket/" + this.allSports[this.selectedSportIndex].name.toLowerCase() + "/" + logo);
            }
            return this.blankSpotImg;
        }
    
        public advanceToNextRound(conferenceName: string, roundNumber: number, teamPosition: number, currentPositionId: string, rank: string) {
            const winningTeamPicture = this.getPictureFromTeamElementId(currentPositionId).getAttribute('src');
            const newId = this.findFutureGameId(currentPositionId);
            const winningPictureBox = this.getPictureFromTeamElementId(newId);
            winningPictureBox.setAttribute('src', winningTeamPicture);
    
            if (newId !== 'champion') {
                const competingTeamPosition = teamPosition % 2 === 0 ? ++teamPosition : --teamPosition;
                const competingTeamId = conferenceName + '-round-' + roundNumber + '-team-' + competingTeamPosition;
                this.clearLoserFromFutureGames(newId, competingTeamId);
                if(this.playByeTeamBasedOnRank && roundNumber === 1) {
                    console.log('bye team check');
                    const idValues = newId.split('-');
                    let newTeamPosition = Number(idValues[4]);
                    const nextTeamToPlayPosition = newTeamPosition % 2 === 0 ? ++newTeamPosition : --newTeamPosition;
                    const nextTeamToPlayId = conferenceName + '-round-2-team-' + nextTeamToPlayPosition;
                    const nextTeamToPlayElem = document.getElementById(nextTeamToPlayId);
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
                            const currentTeamPicture = this.getPictureFromTeamElementId(newId).getAttribute('src');
                            console.log(teamPlayingOtherByeTeamPicture, competingTeamPicture);
                            if (teamPlayingOtherByeTeamPicture === competingTeamPicture ||
                                 teamPlayingOtherByeTeamPicture === currentTeamPicture) {
                                this.getPictureFromTeamElementId(teamPlayingOtherByeTeamId).setAttribute('src',this.blankSpotImg);
                                console.log(otherByeTeamInConfId, teamPlayingOtherByeTeamId);
                                this.clearLoserFromFutureGames(otherByeTeamInConfId, teamPlayingOtherByeTeamId);
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
                                                        .setAttribute('src', newIdPictureElem.getAttribute('src'));
                                                    newIdPictureElem.setAttribute('src', teamPlayingOtherByeTeamPicture);
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
                }
            }
            this.checkToUpdateSubmitButon();
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
    
        private clearLoserFromFutureGames(futureWinnerId: string, losingTeamId: string) {
            const losingTeamPicture = this.getPictureFromTeamElementId(losingTeamId).getAttribute('src');
            if (losingTeamPicture !== this.blankSpotImg) {
                while (futureWinnerId !== 'champion') {
                    futureWinnerId = this.findFutureGameId(futureWinnerId);
                    let futureWinnerPictureElement = this.getPictureFromTeamElementId(futureWinnerId);
                    let futureWinnerPicture = futureWinnerPictureElement.getAttribute('src');
                    if (futureWinnerPicture === losingTeamPicture) {
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
          //TODO: Make validation work. This only works for one key input, so can't work for football
          const  verifyInput = function (e: any) {
            e = e || window.event;
            const keyChar = String.fromCharCode(e.keyCode),
                input = e.target || e.srcElement;
            const maxScore = this.allSports[this.selectedSportIndex].name === 'NBA' ? '4' : '99'
            if (keyChar < '0' || keyChar > maxScore) {
                return false;
            } else {
                input.value = '';
            }
          };
        }

      public sortByKey(array: Array<any>, key: string) {
          return array.sort(function(a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
          });
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
            //   else if(currentTeamImg.indexOf("/nba/")>=0) {
            //       currentTeam = currentTeamImg.substring(currentTeamImg.indexOf("nba")+4,currentTeamImg.indexOf("."));
            //     if(!playoffTeams.includes(currentTeam)){
            //           playoffTeams.push(currentTeam);
            //       } else if(!yourFirstRoundPicks.includes(currentTeam)){
            //           yourFirstRoundPicks.push(currentTeam);
            //       } else if(!yourConferenceFinalPicks.includes(currentTeam)){
            //           yourConferenceFinalPicks.push(currentTeam);
            //       } else if(!yourConferenceChampPicks.includes(currentTeam)){
            //           yourConferenceChampPicks.push(currentTeam);
            //       } else {
            //           yourFinalsChampPick = currentTeam;
            //       }
            //   }
          }
    
          return allTeamsPicked;
      }
    
      public checkToUpdateSubmitButon() {
          this.allTeamsPicked = this.checkForUnpickedTeams(false);
      }
      public submitBracket(event: Event) {
          this.allTeamsPicked = this.checkForUnpickedTeams(true);
          if (this.allTeamsPicked) {
              alert("SORREY!!!!\nThis site is not able to save your brackets yet..\nBut it's next on my To Do list!!");
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
            return this.addBlankMatchUpsToRound(byesCounted, round1MatchUps);
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
    