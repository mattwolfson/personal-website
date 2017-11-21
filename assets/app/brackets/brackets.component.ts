import { Component, OnInit } from "@angular/core";
import { Team } from './team.model';
import { Conference } from './conference.model';

@Component({
	selector: 'brackets',
	templateUrl: './brackets.component.html',
    styleUrls: ['./brackets.component.css']
})

export class BracketsComponent implements OnInit {
    
        eastTeams: Team[] = [
            new Team(1, 'Boston_Celtics.svg', 'nbaEast', 'seed-1 game-1 round-1', 'Boston Celtics'),
            new Team(8, 'Chicago_Bulls.svg', 'nbaEast', 'seed-8 game-1 round-1', 'Chicago Bulls'),
            new Team(4, 'Washington_Wizards.svg', 'nbaEast', 'seed-4 game-1 round-1', 'Washington Wizards'),
            new Team(5, 'Atlanta_Hawks.svg', 'nbaEast', 'seed-5 game-1 round-1', 'Atlanta Hawks'),
            new Team(2, 'Cleveland_Cavaliers.svg', 'nbaEast', 'seed-2 game-1 round-1', 'Cleveland Calaliers'),
            new Team(7, 'Indiana_Pacers.svg', 'nbaEast', 'seed-7 game-1 round-1', 'Indiana Pacers'),
            new Team(3, 'Houston_Rockets.svg', 'nbaEast', 'seed-8 game-1 round-1', 'Houston Rockets'),
            new Team(6, 'Oklahoma_City_Thunder.gif', 'nbaEast', 'seed-8 game-1 round-1', 'Oklahoma City Thunder')
        ];
    
        westTeams: Team[] = [
            new Team(1, 'Golden_State_Warriors.svg', 'nbaWest', 'seed-1 game-1 round-1', 'Golden State Warriors'),
            new Team(8, 'Portland_Trail_Blazers.svg', 'nbaWest', 'seed-8 game-1 round-1', 'Portland Trail Blazers'),
            new Team(4, 'Clippers.svg', 'nbaWest', 'seed-4 game-1 round-1', 'Clippers'),
            new Team(5, 'Utah_Jazz.svg', 'nbaWest', 'seed-5 game-1 round-1', 'Utah Jazz'),
            new Team(2, 'San_Antonio_Spurs.svg', 'nbaWest', 'seed-2 game-1 round-1', 'San Antonio Spurs'),
            new Team(7, 'Memphis_Grizzlies.svg', 'nbaWest', 'seed-7 game-1 round-1', 'Memphis Grizzlies'),
            new Team(3, 'Houston_Rockets.svg', 'nbaWest', 'seed-8 game-1 round-1', 'Houston Rockets'),
            new Team(6, 'Oklahoma_City_Thunder.gif', 'nbaWest', 'seed-8 game-1 round-1', 'Oklahoma City Thunder')
        ];
    
        nbaEast = new Conference('east', 'eastGroup', this.eastTeams, 'basketball', 'NBA');
        nbaWest = new Conference('west', 'westGroup', this.westTeams, 'basketball', 'NBA');
        conferences: Conference[] = [ this.nbaEast, this.nbaWest];
        blank = new Team(null, 'Solid_white.svg', 'nbaEast');
        blankSpotImg = require("../../img/bracket/nba/" + this.blank.logo);
        totalRounds;
        allTeamsPicked: Boolean = false;
    
      constructor() { }

        public loadLogo(round: Number, logo: String) {
            if (round === 1) {
                return require("../../img/bracket/nba/" + logo);
            }
            return this.blankSpotImg;
        }
    
        public advanceToNextRound(conferenceName, roundNumber, teamPosition, currentPositionId) {
            const winningTeamPicture = this.getPictureFromTeamElementId(currentPositionId).getAttribute('src');
            const newId = this.findFutureGameId(currentPositionId);
            const winningPictureBox = this.getPictureFromTeamElementId(newId);
            winningPictureBox.setAttribute('src', winningTeamPicture);
    
            if (newId !== 'champion') {
                const competingTeamPosition = teamPosition % 2 === 0 ? ++teamPosition : --teamPosition;
                const competingTeamId = conferenceName + '-round-' + roundNumber + '-team-' + competingTeamPosition;
                this.clearLoserFromFutureGames(newId, competingTeamId);
            }
            this.checkToUpdateSubmitButon();
        }
    
        private findFutureGameId(currentPositionId) {
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
    
        private clearLoserFromFutureGames(futureWinnerId, losingTeamId) {
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
    
        private getPictureFromTeamElementId(id) {
            const team = document.getElementById(id);
            for(let index in team.children) {
                if (team.children[index].className === 'teamPicture') {
                    return team.children[index];
                }
            };
        }
    
    
      ngOnInit() {
          const  verifyInput = function (e) {
            e = e || window.event;
            const keyChar = String.fromCharCode(e.keyCode),
                input = e.target || e.srcElement;
    
            if (keyChar < '0' || keyChar > '4') {
                return false;
            } else {
                input.value = '';
            }
        };
        }
    
      public checkForUnpickedTeams(enableAlerts) {
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
    
        public timesToLoop(conferenceTeams: Team[], roundNumber: number) {
            if (roundNumber !== 1) {
                const numberOfTeams = conferenceTeams.length;
                const roundedNumber = Math.ceil(numberOfTeams / (Math.pow(2, roundNumber - 1)));
                return Array(roundedNumber).fill(0).map((x, i) => i);
            } else {
                return conferenceTeams;
            }
      }
    
        public numberOfRounds(numberOfTeams: number) {
            const roundEstimate = Math.log(numberOfTeams) / Math.log(2);
            let rounds;
            if (roundEstimate % 1 === 0) {
                rounds = Array(roundEstimate + 1).fill(0).map((x, i) => i + 1);
            } else {
                //TODO: handle case of byes
                console.log('There needs to be byes');
                rounds = Array(Math.ceil(roundEstimate) + 1).fill(0).map((x, i) => i + 1);
            }
            this.totalRounds = rounds.length;
            return rounds;
        }
    }
    