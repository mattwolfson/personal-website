import { MatchUps } from './matchups.data';
import { PicksService } from './picks.service';
import { MatchUp } from './../models/matchup.model';
import { Message } from './../messages/message.model';
import { MessageService } from './../messages/message.service';
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Team } from "../brackets/team.model";
import { NflTeam } from '../models/nflTeam.model';
import { Picks } from './picks.model';

@Component({
    selector: 'app-make-picks',
    templateUrl: './make-picks.component.html',
    styleUrls: ['./picks.component.css']
})

export class MakePicksComponent {

    constructor(private picksService: PicksService, private matchups: MatchUps) {}

    picksAreValid: Boolean = false;
    currentPicks: Array<any> = []
    week12Picks: Array<any> = []
    allPicks: Array<any> = []
    userName: string = '';
    allMatchUps: Array<any> = this.matchups.getMatchUps();
    selectedWeekIndex = this.allMatchUps.length - 1;
    totalGames: number = this.allMatchUps.length;
    finalPicks: Array<any> = new Array(this.totalGames + 2);

    ngOnInit() {
        //Get picks for week 12
		this.picksService.getPicks12()
			.subscribe(
				(picks) => {
                    if (picks) {
                        this.week12Picks = picks;
                    }
				}
            );
        //Get all other picks
        this.picksService.getPicks()
            .subscribe(
                (picks) => {
                    if (picks) {
                        this.getUsersPreviousPicks(picks)
                    } else {
                        console.log('no picks from Picks object');
                    }
                }
            );
    }

    getUsersPreviousPicks(allPicks: Array<any>) {
        for(let userPickData of allPicks) {
            if(userPickData.isCurrentUser) {
                let firstName = userPickData.currentPick.firstName;
                if (firstName) {
                    this.userName += 'You are signed in as ' + firstName;
                    let lastName = userPickData.currentPick.lastName;
                    if (lastName) { this.userName += ' ' + lastName };
                }
            }
        }
    }

	onSubmit() {
        const picks = new Picks('NFL', 2017, this.allMatchUps[this.selectedWeekIndex].number, 
            JSON.stringify(this.finalPicks), 'Family');
        this.picksService.addPicks(picks)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
    }

    onSelectionChange(value: String, radioButtonName: String, id?: any) {
        let index;
        const HOME_SELECTED = 'homeSelected';
        const AWAY_SELECTED = 'awaySelected';
        const AWAY_BUTTON_VALUE = 'away';
        const HOME_BUTTON_VALUE = 'home';

        if (radioButtonName === 'three-point-group') {
            index = this.totalGames + 1;
        } else if (radioButtonName === 'two-point-group') {
            index = this.totalGames;
        } else {
            index = Number(radioButtonName);
            const gameRow: HTMLElement = document.getElementById(id).parentElement.parentElement;
            if (value === HOME_BUTTON_VALUE) {
                gameRow.classList.add(HOME_SELECTED);
                gameRow.classList.remove(AWAY_SELECTED);
            } else {
                gameRow.classList.add(AWAY_SELECTED);
                gameRow.classList.remove(HOME_SELECTED);
            }
        }

        this.finalPicks[index] = value;

        this.picksAreValid = !this.finalPicks.includes(undefined) &&
            this.finalPicks[this.totalGames] !== this.finalPicks[this.totalGames + 1];
    }
}