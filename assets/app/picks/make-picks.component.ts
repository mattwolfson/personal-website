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
    picksAreValid: Boolean = false;

	constructor(private picksService: PicksService) {}

	onSubmit() {
        const picks = new Picks('NFL', 2017, this.weeks[this.selectedWeekIndex].number, 
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

    lions = new NflTeam('NFC', 'North', 'Detriot Lions', '', 6, 5);
    cowboys = new NflTeam('NFC', 'East', 'Dallas Cowboys', '', 5, 6);
    redskins = new NflTeam('NFC', 'East', 'Washington Redskins', '', 5, 6);
    bengals = new NflTeam('AFC', 'North', 'Cincinati Bengals', '', 5, 6);
    eagles = new NflTeam('NFC', 'East', 'Philadelphia Eagles', '', 10, 1);
    patriots = new NflTeam('AFC', 'East', 'New England Patriots', '', 9, 2);
    cheifs = new NflTeam('AFC', 'West', 'Kansas City Cheifs', '', 6, 5);
    falcons = new NflTeam('NFC', 'South', 'Atlanta Falcons', '', 7, 4);
    jets = new NflTeam('AFC', 'East', 'New York Jets', '', 4, 7);
    colts = new NflTeam('AFC', 'East', 'Indianapolis Colts', '', 3, 8);
    sanFran = new NflTeam('NFC', 'West', 'San Fransisco 49ers', '', 1, 10);
    rams = new NflTeam('NFC', 'West', 'Los Angeles Rams', '', 8, 3);
    cardinals = new NflTeam('NFC', 'West', 'Arizona Cardinals', '', 5, 6);
    raiders = new NflTeam('AFC', 'West', 'Oakland Raiders', '', 5, 6);
    steelers = new NflTeam('NFC', 'North', 'Pittsburgh Steelers', '', 9, 2);
    ravens = new NflTeam('AFC', 'North', 'Baltimore Ravens', '', 5, 5);
    vikings = new NflTeam('NFC', 'North', 'Minnesota Vikings', '', 9, 2);
    chargers = new NflTeam('AFC', 'West', 'Los Angeles Chargers', '', 5, 6);
    giants = new NflTeam('NFC', 'East', 'New York Giants', '', 2, 9);
    browns = new NflTeam('NFC', 'North', 'Cleveland Browns', '', 0, 11);
    bears = new NflTeam('NFC', 'North', 'Chicago Bears', '', 3, 8);
    dolphins = new NflTeam('AFC', 'East', 'Miami Dolphins', '', 4, 7);
    bills = new NflTeam('AFC', 'East', 'Buffalo Bills', '', 6, 5);
    bucs = new NflTeam('NFC', 'South', 'Tampa Bay Buccaneers', '', 4, 7);
    panthers = new NflTeam('NFC', 'South', 'Carolina Panthers', '', 8, 3);
    titans = new NflTeam('AFC', 'South', 'Tenessee Titans', '', 7, 4);
    seahawks = new NflTeam('NFC', 'West', 'Seattle Seahawks', '', 7, 4);
    saints = new NflTeam('NFC', 'South', 'New Orleans Saints', '', 8, 3);
    jags = new NflTeam('AFC', 'South', 'Jacksonville Jaguars', '', 7, 4);
    broncos = new NflTeam('AFC', 'West', 'Denver Broncos', '', 3, 8);
    packers = new NflTeam('NFC', 'North', 'Green Bay Packers', '', 5, 6);
    texans = new NflTeam('AFC', 'South', 'Houston Texans', '', 4, 6);
    
    matchUps12: MatchUp[] = [
        new MatchUp(this.vikings, this.lions, 12, 2017, 'Th 12:30pm', 2.5),
        new MatchUp(this.chargers, this.cowboys, 12, 2017, 'Th 4:30 pm', 1.5),
        new MatchUp(this.giants, this.redskins, 12, 2017,  'Th 8:30 pm', -7.5),
        new MatchUp(this.browns, this.bengals, 12, 2017, 'S 1 pm', -8.5),
        new MatchUp(this.bears, this.eagles, 12, 2017, 'S 1 pm', -13.5),
        new MatchUp(this.dolphins, this.patriots, 12, 2017, 'S 1 pm', -16.5),
        new MatchUp(this.bills, this.cheifs, 12, 2017, 'S 1 pm', -9.5),
        new MatchUp(this.bucs, this.falcons, 12, 2017, 'S 1 pm', -8.5),
        new MatchUp(this.panthers, this.jets, 12, 2017, 'S 1 pm ', 4.5),
        new MatchUp(this.titans, this.colts, 12, 2017, 'S 1 pm', 3.5),
        new MatchUp(this.seahawks, this.sanFran, 12, 2017, 'S 4:05 pm', -7.5),
        new MatchUp(this.saints, this.rams, 12, 2017, 'S 4:25 pm', 2.5),
        new MatchUp(this.jags, this.cardinals, 12, 2017, 'S 4:25 pm', 4.5),
        new MatchUp(this.broncos, this.raiders, 12, 2017, 'S 4:25 pm', -4.5),
        new MatchUp(this.packers, this.steelers, 12, 2017, 'S 8:30 pm', -14.5),
        new MatchUp(this.texans, this.ravens, 12, 2017, 'M 8:30 pm', -7.5)
    ];

    matchUps13: MatchUp[] = [
        new MatchUp(this.redskins, this.cowboys, 13, 2017, 'Th 8:30', -1.5),
        new MatchUp(this.vikings, this.falcons, 13, 2017, 'S 1:00', -2.5),
        new MatchUp(this.lions, this.ravens, 13, 2017, 'S 1:00', -3.5),
        new MatchUp(this.patriots, this.bills, 13, 2017, 'S 1:00', 8.5),
        new MatchUp(this.sanFran, this.bears, 13, 2017, 'S 1:00', -4.5),
        new MatchUp(this.bucs, this.packers, 13, 2017, 'S 1:00', -.5),
        new MatchUp(this.colts, this.jags, 13, 2017, 'S 1:00', -8.5),
        new MatchUp(this.broncos, this.dolphins, 13, 2017, 'S 1:00', .5),
        new MatchUp(this.panthers, this.saints, 13, 2017, 'S 1:00', -3.5),
        new MatchUp(this.cheifs, this.jets, 13, 2017, 'S 1:00', 3.5),
        new MatchUp(this.texans, this.titans, 13, 2017, 'S 1:00', -7.5),
        new MatchUp(this.browns, this.chargers, 13, 2017, 'S 4:05', -13.5),
        new MatchUp(this.rams, this.cardinals, 13, 2017, 'S 4:25', 6.5),
        new MatchUp(this.giants, this.raiders, 13, 2017, 'S 4:25', -7.5),
        new MatchUp(this.eagles, this.seahawks, 13, 2017, 'S 8:30', 4.5),
        new MatchUp(this.steelers, this.bengals, 13, 2017, 'M 8:30', 6.5)
    ];

    weeks = [
    {
        number: 12,
        matchups: this.matchUps12
    }, {
        number: 13,
        matchups: this.matchUps13 
    }];

    selectedWeekIndex = this.weeks.length - 1;

    nflTeams: NflTeam[] = [
        this.lions, this.cowboys,
        this.redskins, this.bengals,
        this.eagles, this.patriots,
        this.cheifs, this.falcons,
        this.jets, this.colts,
        this.sanFran, this.rams,
        this.cardinals, this.raiders,
        this.steelers, this.ravens,
        this.vikings, this.chargers,
        this.giants, this.browns,
        this.bears, this.dolphins,
        this.bills, this.bucs,
        this.panthers, this.titans,
        this.seahawks, this.saints,
        this.jags, this.broncos,
        this.packers, this.texans
    ];

    totalGames: number = this.matchUps13.length;
    finalPicks: Array<any> = new Array(this.totalGames + 2);
}