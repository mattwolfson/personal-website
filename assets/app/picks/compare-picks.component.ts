import { MatchUp } from './../models/matchup.model';
import { Team } from './../brackets/team.model';
import { MessageService } from './../messages/message.service';
import { Component, OnInit } from '@angular/core';
import { NflTeam } from '../models/nflTeam.model';
import { PicksService } from './picks.service';
import { Picks } from './picks.model';
import { MakePicksComponent } from './make-picks.component';
import { MatchUps } from './matchups.data';

@Component({
    selector: 'app-compare-picks',
    templateUrl: './compare-picks.component.html',
    styleUrls: ['./picks.component.css']
})

export class ComparePicksComponent implements OnInit {
    
    constructor(private picksService: PicksService, private matchUps: MatchUps) {}

    currentPicks: Array<any> = []
    week12Picks: Array<any> = []
    allPicks: Array<any> = []
    hasPickData: Boolean = true;
    allMatchUps: Array<any> = this.matchUps.getMatchUps();
    selectedWeekIndex = this.allMatchUps.length - 2;
    
	ngOnInit() {
        //Get picks for week 12
		this.picksService.getPicks12()
			.subscribe(
				(picks) => {
                    console.log(picks);
                    if (picks) {
                        this.week12Picks = picks;
                    } else {
                        this.hasPickData = false;
                    }
				}
            );
        //Get all other picks
        this.picksService.getPicks()
            .subscribe(
                (picks) => {
                    console.log(picks);
                    if (picks) {
                        this.allPicks = picks;
                        this.updatePickData();
                    } else {
                        this.hasPickData = false;
                        console.log('no picks from Picks object');
                    }
                }
            );
    }

    public updatePickData() {
        const selectedWeek = this.allMatchUps[this.selectedWeekIndex].number;
        console.log('selected week',selectedWeek);
        if (selectedWeek === 12) {
            this.currentPicks = this.week12Picks;
        } else {
            let currentPicksArray: Picks[] = [];
            for(let pick of this.allPicks) {
                if (selectedWeek === Number(pick.currentPick.week)){
                    currentPicksArray.push(pick.currentPick);
                }
            }
            this.currentPicks = currentPicksArray;
            console.log('currentpicks', this.currentPicks);
        }
    }

    userPickTally: number = 0;
    public tallyPicks(pick: string, index: number, twoPoint: boolean, threePoint: boolean, lastIndex: number, currentMatchUp: MatchUp, id: string) {
        const WINNING_CLASS = ' winningPick';
        const LOSING_CLASS = ' losingPick';
        let pointsToWin: number = 1;

        if (twoPoint) {
            pointsToWin = 2;
        } else if (threePoint) {
            pointsToWin = 3;
        }

        let resultClass: string;
        if (currentMatchUp.awayTeam === currentMatchUp.winner) {
            resultClass = pick === "away" ? WINNING_CLASS : LOSING_CLASS;
            document.getElementById(id).parentElement.className += resultClass;
        } else if (currentMatchUp.homeTeam === currentMatchUp.winner) {
            resultClass = pick === "home" ? WINNING_CLASS : LOSING_CLASS;
            document.getElementById(id).parentElement.className += resultClass;
        }

        if (resultClass === WINNING_CLASS) {
            this.userPickTally = this.userPickTally + pointsToWin;
            return 'X';
        }
    }

    public printFinalScore() {
        const usersTotalScore = this.userPickTally;
        this.userPickTally = 0;
        return usersTotalScore;
    }
}

