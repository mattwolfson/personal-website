import { MatchUp } from './../models/matchup.model';
import { Team } from './../brackets/team.model';
import { MessageService } from './../messages/message.service';
import { Component, OnInit } from '@angular/core';
import { NflTeam } from '../models/nflTeam.model';
import { PicksService } from './picks.service';

@Component({
    selector: 'app-compare-picks',
    templateUrl: './compare-picks.component.html',
    styleUrls: ['./picks.component.css']
})

export class ComparePicksComponent implements OnInit {
    
    constructor(private messageService: MessageService, private picksService: PicksService) {}

    currentPicks: Array<any> = []
    week12Picks: Array<any> = []
    allPicks: Array<any> = []
    hasPickData: Boolean = true;
    
	ngOnInit() {
        //Get picks for week 12
		this.messageService.getPicks12()
			.subscribe(
				(picks) => {
                    console.log(picks);
                    if (picks) {
                        this.week12Picks = picks;
                        console.log('has week12 picks');
                    } else {
                        this.hasPickData = false;
                        console.log('no picks');
                    }
				}
            );
        this.picksService.getPicks()
            .subscribe(
                (picks) => {
                    console.log(picks);
                    if (picks) {
                        this.allPicks = picks;
                        console.log('has all picks');
                        this.updatePickData();
                    } else {
                        this.hasPickData = false;
                        console.log('no picks from Picks object');
                    }
                }
            );
    }

    public updatePickData() {
        const newWeek = this.weeks[this.selectedWeekIndex].number;
        if (newWeek === 12) {
            this.currentPicks = this.week12Picks;
        } else {
            this.currentPicks = this.allPicks;
        }
    }

    homeTeams: Team[] = [
        new Team(1, 'Detriot_Lions', 'Th 12:30 pm', 'Detroit Lions'),
        new Team(1, 'Dallas_Cowboys', 'Th 4:30 pm', 'Dallas Cowboys'),
        new Team(1, 'Washington_Redskins', 'Th 8:30 pm', 'Washington Redskins'),
        new Team(1, 'Cincinati_Bengals', 'S 1 pm', 'Cincinati Bengals'),
        new Team(1, 'Philadelphia_Eagles', 'S 1 pm', 'Philadelphia Eagles'),
        new Team(1, 'New_England_Patriots', 'S 1 pm', 'New England Patriots'),
        new Team(1, 'Kansas_City_Cheifs', 'S 1 pm', 'Kansas City Cheifs'),
        new Team(1, 'Atlanta_Falcons', 'S 1 pm', 'Atlanta Falcons'),
        new Team(1, 'New_York_Jets', 'S 1 pm ', 'New York Jets'),
        new Team(1, 'Indianapolis_Colts', 'S 1 pm', 'Indianapolis Colts'),
        new Team(1, 'San_Fransisco_49ers', 'S 4:05 pm', 'San Francisco 49ers'),
        new Team(1, 'Los_Angeles_Rams', 'S 4:25 pm', 'Los Angeles Rams'),
        new Team(1, 'Arizona_Cardinals', 'S 4:25 pm', 'Arizona Cardinals'),
        new Team(1, 'Oakland_Raiders', 'S 4:25 pm', 'Oakland Raiders'),
        new Team(1, 'Pittsburgh_Steelers', 'S 8:30 pm', 'Pittsburgh Steelers'),
        new Team(1, 'Baltimore_Ravens', 'M 8:30 pm', 'Baltimore Ravens')
    ];

    awayTeams: Team[] = [
        new Team(1, 'Minnesota_Vikings', 'DET +2.5', 'Minnesota Vikings'),
        new Team(1, 'Los_Angeles_Chargers', 'LAC -1.5', 'Los Angeles Chargers'),
        new Team(1, 'New_York_Giants', 'WAS -7.5', 'New York Giants'),
        new Team(1, 'Cleveland_Browns', 'CIN -8.5', 'Cleveland Browns'),
        new Team(1, 'Chicago_Bears', 'PHI -13.5', 'Chicago Bears'),
        new Team(1, 'Miami_Dolphins', 'NE -16.5', 'Miami Dolphins'),
        new Team(1, 'Buffalo_Bills', 'KC -9.5', 'Buffalo Bills'),
        new Team(1, 'Tampa_Bay_Buccaneers', 'ATL -8.5', 'Tampa Bay Buccaneers'),
        new Team(1, 'Carolina_Panthers', 'CAR -4.5', 'Carolina Panthers'),
        new Team(1, 'Tenessee_Titans', 'TEN -3.5', 'Tenessee Titans'),
        new Team(1, 'Seattle_Seahawks', 'SEA -7.5', 'Seattle Seahawks'),
        new Team(1, 'New_Orleans_Saints', 'LAR -2.5', 'New Orleans Saints'),
        new Team(1, 'Jacksonville_Jaguars', 'JAX -4.5', 'Jacksonville Jaguars'),
        new Team(1, 'Denver_Broncos', 'OAK -4.5', 'Denver Broncos'),
        new Team(1, 'Green_Bay_Packers', 'PIT -14.5', 'Green Bay Packers'),
        new Team(1, 'Houston_Texans', 'BAL -7.5', 'Houston Texans')
    ];

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
        new MatchUp(this.lions, this.vikings, 12, 2017, 'Th 12:30pm', -2.5, this.lions),
        new MatchUp(this.chargers, this.cowboys, 12, 2017, 'Th 4:30 pm', 1.5, this.chargers),
        new MatchUp(this.giants, this.redskins, 12, 2017,  'Th 8:30 pm', -7.5, this.redskins),
        new MatchUp(this.browns, this.bengals, 12, 2017, 'S 1 pm', -8.5, this.bengals),
        new MatchUp(this.bears, this.eagles, 12, 2017, 'S 1 pm', -13.5, this.eagles),
        new MatchUp(this.dolphins, this.patriots, 12, 2017, 'S 1 pm', -16.5, this.patriots),
        new MatchUp(this.bills, this.cheifs, 12, 2017, 'S 1 pm', -9.5, this.bills),
        new MatchUp(this.bucs, this.falcons, 12, 2017, 'S 1 pm', -8.5, this.falcons),
        new MatchUp(this.panthers, this.jets, 12, 2017, 'S 1 pm ', 4.5, this.panthers),
        new MatchUp(this.titans, this.colts, 12, 2017, 'S 1 pm', 3.5, this.titans),
        new MatchUp(this.seahawks, this.sanFran, 12, 2017, 'S 4:05 pm', -7.5, this.sanFran),
        new MatchUp(this.saints, this.rams, 12, 2017, 'S 4:25 pm', 2.5, this.rams),
        new MatchUp(this.jags, this.cardinals, 12, 2017, 'S 4:25 pm', 4.5, this.cardinals),
        new MatchUp(this.broncos, this.raiders, 12, 2017, 'S 4:25 pm', -4.5, this.raiders),
        new MatchUp(this.packers, this.steelers, 12, 2017, 'S 8:30 pm', -14.5, this.packers),
        new MatchUp(this.texans, this.ravens, 12, 2017, 'M 8:30 pm', -7.5, this.texans)
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

    totalGames: number = this.awayTeams.length;
    finalPicks: Array<any> = new Array(this.totalGames + 2);

    userPickTally: number = 0;
    public tallyPicks(pick: string, index: number, twoPoint: boolean, threePoint: boolean, lastIndex: number, currentMatchUp: MatchUp) {
        let pointsToWin: number = 1;
        if (twoPoint) {
            pointsToWin = 2;
        } else if (threePoint) {
            pointsToWin = 3;
        }

        if (currentMatchUp.awayTeam === currentMatchUp.winner && pick === "away") {
            this.userPickTally = this.userPickTally + pointsToWin;
            return 'X';
        } else if (currentMatchUp.homeTeam === currentMatchUp.winner && pick === "home") {
            this.userPickTally = this.userPickTally + pointsToWin;
            return 'X';
        }
    }

    public printFinalScore() {
        const usersTotalScore = this.userPickTally;
        this.userPickTally = 0;
        console.log(usersTotalScore);
        return usersTotalScore;
    }
}

