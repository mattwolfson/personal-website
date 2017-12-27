import { MatchUp } from './../app/models/matchup.model';
import { NflTeam } from "./../app/models/nflTeam.model";
import { Injectable } from '@angular/core';

@Injectable()
export class MatchUps {

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
        new MatchUp(this.vikings, this.lions, 12, 2017, 'Th 12:30pm', 2.5, this.vikings),
        new MatchUp(this.chargers, this.cowboys, 12, 2017, 'Th 4:30 pm', 1.5, this.chargers),
        new MatchUp(this.giants, this.redskins, 12, 2017,  'Th 8:30 pm', -7.5, this.redskins),
        new MatchUp(this.browns, this.bengals, 12, 2017, 'S 1 pm', -8.5, this.bengals),
        new MatchUp(this.bears, this.eagles, 12, 2017, 'S 1 pm', -13.5, this.eagles),
        new MatchUp(this.dolphins, this.patriots, 12, 2017, 'S 1 pm', -16.5, this.patriots),
        new MatchUp(this.bills, this.cheifs, 12, 2017, 'S 1 pm', -9.5, this.bills),
        new MatchUp(this.bucs, this.falcons, 12, 2017, 'S 1 pm', -8.5, this.falcons),
        new MatchUp(this.panthers, this.jets, 12, 2017, 'S 1 pm ', 4.5, this.panthers),
        new MatchUp(this.titans, this.colts, 12, 2017, 'S 1 pm', 3.5, this.titans),
        new MatchUp(this.seahawks, this.sanFran, 12, 2017, 'S 4:05 pm', -7.5, this.seahawks),
        new MatchUp(this.saints, this.rams, 12, 2017, 'S 4:25 pm', 2.5, this.rams),
        new MatchUp(this.jags, this.cardinals, 12, 2017, 'S 4:25 pm', 4.5, this.cardinals),
        new MatchUp(this.broncos, this.raiders, 12, 2017, 'S 4:25 pm', -4.5, this.raiders),
        new MatchUp(this.packers, this.steelers, 12, 2017, 'S 8:30 pm', -14.5, this.packers),
        new MatchUp(this.texans, this.ravens, 12, 2017, 'M 8:30 pm', -7.5, this.texans)
    ];

    matchUps13: MatchUp[] = [
        new MatchUp(this.redskins, this.cowboys, 13, 2017, 'Th 8:30', -1.5, this.cowboys),
        new MatchUp(this.vikings, this.falcons, 13, 2017, 'S 1:00', -2.5, this.vikings),
        new MatchUp(this.lions, this.ravens, 13, 2017, 'S 1:00', -3.5, this.ravens),
        new MatchUp(this.patriots, this.bills, 13, 2017, 'S 1:00', 8.5, this.patriots),
        new MatchUp(this.sanFran, this.bears, 13, 2017, 'S 1:00', -4.5, this.sanFran),
        new MatchUp(this.bucs, this.packers, 13, 2017, 'S 1:00', -.5, this.packers),
        new MatchUp(this.colts, this.jags, 13, 2017, 'S 1:00', -8.5, this.jags),
        new MatchUp(this.broncos, this.dolphins, 13, 2017, 'S 1:00', .5, this.dolphins),
        new MatchUp(this.panthers, this.saints, 13, 2017, 'S 4:25', -3.5, this.saints),
        new MatchUp(this.cheifs, this.jets, 13, 2017, 'S 1:00', 3.5, this.jets),
        new MatchUp(this.texans, this.titans, 13, 2017, 'S 1:00', -7.5, this.titans),
        new MatchUp(this.browns, this.chargers, 13, 2017, 'S 4:05', -13.5, this.browns),
        new MatchUp(this.rams, this.cardinals, 13, 2017, 'S 4:25', 6.5, this.rams),
        new MatchUp(this.giants, this.raiders, 13, 2017, 'S 4:25', -7.5, this.giants),
        new MatchUp(this.eagles, this.seahawks, 13, 2017, 'S 8:30', 4.5, this.seahawks),
        new MatchUp(this.steelers, this.bengals, 13, 2017, 'M 8:30', 6.5, this.bengals)
    ];
    
    matchUps14: MatchUp[] = [
        new MatchUp(this.saints, this.falcons, 14, 2017, 'Th 8:25', -1.5, this.falcons),
        new MatchUp(this.sanFran, this.texans, 14, 2017, 'S 1:00', -1.5, this.sanFran),
        new MatchUp(this.raiders, this.cheifs, 14, 2017, 'S 1:00', -4.5, this.cheifs),
        new MatchUp(this.colts, this.bills, 14, 2017, 'S 1:00', -6.5, this.colts),
        new MatchUp(this.vikings, this.panthers, 14, 2017, 'S 1:00', 1.5, this.panthers),
        new MatchUp(this.bears, this.bengals, 14, 2017, 'S 1:00', -6.5, this.bears),
        new MatchUp(this.packers, this.browns, 14, 2017, 'S 1:00', 3.5, this.packers),
        new MatchUp(this.lions, this.bucs, 14, 2017, 'S 1:00', .5, this.lions),
        new MatchUp(this.cowboys, this.giants, 14, 2017, 'S 1:00', 3.5, this.cowboys),
        new MatchUp(this.redskins, this.chargers, 14, 2017, 'S 4:05', -6.5, this.chargers),
        new MatchUp(this.titans, this.cardinals, 14, 2017, 'S 4:05', 3.5, this.cardinals),
        new MatchUp(this.jets, this.broncos, 14, 2017, 'S 1:00', -1.5, this.broncos),
        new MatchUp(this.seahawks, this.jags, 14, 2017, '4:25', 6.5, this.jags),
        new MatchUp(this.eagles, this.rams, 14, 2017, '4:25', 2.5, this.eagles),
        new MatchUp(this.ravens, this.steelers, 14, 2017, 'S 8:30', -7.5, this.ravens),
        new MatchUp(this.patriots, this.dolphins, 14, 2017, 'M 8:30', 11.5, this.dolphins)
    ];

    matchUps15: MatchUp[] = [
        new MatchUp(this.broncos, this.colts, 15, 2017, 'Th 8:25', 1.5, this.broncos),
        new MatchUp(this.bears, this.lions, 15, 2017, 'Sa 4:30', -6.5, this.lions),
        new MatchUp(this.chargers, this.cheifs, 15, 2017, 'Sa 8:25', .5, this.cheifs),
        new MatchUp(this.dolphins, this.bills, 15, 2017, 'S 1:00', -5.5, this.bills),
        new MatchUp(this.packers, this.panthers, 15, 2017, 'S 1:00', -2.5, this.panthers),
        new MatchUp(this.ravens, this.browns, 15, 2017, 'S 1:00', 7.5, this.ravens),
        new MatchUp(this.texans, this.jags, 15, 2017, 'S 1:00', -11.5, this.jags),
        new MatchUp(this.bengals, this.vikings, 15, 2017, 'S 1:00', -11.5, this.vikings),
        new MatchUp(this.jets, this.saints, 15, 2017, 'S 1:00', -14.5, this.jets),
        new MatchUp(this.eagles, this.giants, 15, 2017, 'S 1:00', 7.5, this.giants),
        new MatchUp(this.cardinals, this.redskins, 15, 2017, 'S 1:00', -4.5, this.redskins),
        new MatchUp(this.rams, this.seahawks, 15, 2017, 'S 4:05', -.5, this.rams),
        new MatchUp(this.patriots, this.steelers, 15, 2017, 'S 4:25', 2.5, this.patriots),
        new MatchUp(this.titans, this.sanFran, 15, 2017, 'S 4:25', -1.5, this.sanFran),
        new MatchUp(this.cowboys, this.raiders, 15, 2017, 'S 8:30', 2.5, this.cowboys),
        new MatchUp(this.falcons, this.bucs, 15, 2017, 'M 8:30', 5.5, this.bucs)
    ];

    matchUps16: MatchUp[] = [
        new MatchUp(this.colts, this.ravens, 16, 2017, 'Sa 4:30', -13.5, this.colts),
        new MatchUp(this.vikings, this.packers, 16, 2017, 'Sa 8:25', 8.5, this.vikings),
        new MatchUp(this.bucs, this.panthers, 16, 2017, 'S 1:00', -9.5, this.bucs),
        new MatchUp(this.browns, this.bears, 16, 2017, 'S 1:00', -6.5, this.bears),
        new MatchUp(this.lions, this.bengals, 16, 2017, 'S 1:00', 4.5, this.bengals),
        new MatchUp(this.dolphins, this.cheifs, 16, 2017, 'S 1:00', -9.5, this.cheifs),
        new MatchUp(this.bills, this.patriots, 16, 2017, 'S 1:00', -11.5, this.patriots),
        new MatchUp(this.falcons, this.saints, 16, 2017, 'S 1:00', -5.5, this.saints),
        new MatchUp(this.chargers, this.jets, 16, 2017, 'S 1:00', 7.5, this.jets),
        new MatchUp(this.rams, this.titans, 16, 2017, 'S 1:00', 6.5, this.rams),
        new MatchUp(this.broncos, this.redskins, 16, 2017, 'S 1:00', -3.5, this.redskins),
        new MatchUp(this.jags, this.sanFran, 16, 2017, 'S 4:05', 4.5, this.sanFran),
        new MatchUp(this.giants, this.cardinals, 16, 2017, 'S 4:25', -4.5, this.cardinals),
        new MatchUp(this.seahawks, this.cowboys, 16, 2017, 'S 4:25', -4.5, this.seahawks),
        new MatchUp(this.steelers, this.texans, 16, 2017, 'M 4:30', 10.5, this.steelers),
        new MatchUp(this.raiders, this.eagles, 16, 2017, 'M 8:30', -8.5, this.eagles)
    ];

    matchUps17: MatchUp[] = [
        new MatchUp(this.packers, this.lions, 17, 2017, 'S 1:00', -7.5),
        new MatchUp(this.texans, this.colts, 17, 2017, 'S 1:00', -4.5),
        new MatchUp(this.bears, this.vikings, 17, 2017, 'S 1:00', 11.5),
        new MatchUp(this.jets, this.patriots, 17, 2017, 'S 1:00', -15.5),
        new MatchUp(this.redskins, this.giants, 17, 2017, 'S 1:00', 3.5),
        new MatchUp(this.cowboys, this.eagles, 17, 2017, 'S 1:00', -2.5),
        new MatchUp(this.browns, this.steelers, 17, 2017, 'S 1:00', -14.5),
        new MatchUp(this.panthers, this.falcons, 17, 2017, 'S 4:25', -4.5),
        new MatchUp(this.cheifs, this.broncos, 17, 2017, 'S 4:25', -3.5),
        new MatchUp(this.jags, this.titans, 17, 2017, 'S 4:25', -6.5),
        new MatchUp(this.sanFran, this.rams, 17, 2017, 'S 4:25', -3.5),
        new MatchUp(this.raiders, this.chargers, 17, 2017, 'S 4:25', -7.5),
        new MatchUp(this.cardinals, this.seahawks, 17, 2017, 'S 4:25', -7.5),
        new MatchUp(this.saints, this.bucs, 17, 2017, 'S 4:25', 7.5),
        new MatchUp(this.bills, this.dolphins, 17, 2017, 'S 4:25', 2.5),
        new MatchUp(this.bengals, this.ravens, 17, 2017, 'S 4:25', -9.5)
    ]

    public getMatchUps() {
        return [
            {
                number: 12,
                matchups: this.matchUps12
            }, {
                number: 13,
                matchups: this.matchUps13 
            }, {
                number: 14,
                matchups: this.matchUps14
            }, {
                number: 15,
                matchups: this.matchUps15
            }, {
                number: 16,
                matchups: this.matchUps16
            }
        ];
    }

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
}