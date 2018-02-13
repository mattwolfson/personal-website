import { NflTeam } from "./../app/models/nflTeam.model";
import { Injectable } from '@angular/core';
import { Conference } from "../app/brackets/conference.model";

@Injectable()
export class NflTeams {

    lions = new NflTeam('NFC', 'North', 'Detriot Lions', 'Detroit_Lions.png', 6, 5);
    cowboys = new NflTeam('NFC', 'East', 'Dallas Cowboys', 'Dallas_Cowboys.png', 5, 6);
    redskins = new NflTeam('NFC', 'East', 'Washington Redskins', 'Washington_Redskins.png', 5, 6);
    eagles = new NflTeam('NFC', 'East', 'Philadelphia Eagles', 'Philadelphia_Eagles.png', 10, 1, 1);
    falcons = new NflTeam('NFC', 'South', 'Atlanta Falcons', 'Atlanta_Falcons.png', 7, 4, 6);
    sanFran = new NflTeam('NFC', 'West', 'San Fransisco 49ers', 'San_Francisco_49ers.png', 1, 10);
    rams = new NflTeam('NFC', 'West', 'Los Angeles Rams', 'Los_Angeles_Rams.png', 8, 3, 3);
    cardinals = new NflTeam('NFC', 'West', 'Arizona Cardinals', 'Arizona_Cardinals.gif', 5, 6);
    packers = new NflTeam('NFC', 'North', 'Green Bay Packers', 'Green_Bay_Packers.png', 5, 6);
    seahawks = new NflTeam('NFC', 'West', 'Seattle Seahawks', 'Seattle_Seahawks.png', 7, 4);
    saints = new NflTeam('NFC', 'South', 'New Orleans Saints', 'New_Orleans_Saints.png', 8, 3, 4);
    vikings = new NflTeam('NFC', 'North', 'Minnesota Vikings', 'Minnesota_Vikings.png', 9, 2, 2);
    bucs = new NflTeam('NFC', 'South', 'Tampa Bay Buccaneers', 'Tampa_Bay_Buccaneers.png', 4, 7);
    panthers = new NflTeam('NFC', 'South', 'Carolina Panthers', 'Carolina_Panthers.png', 8, 3, 5);
    giants = new NflTeam('NFC', 'East', 'New York Giants', 'New_York_Giants.gif', 2, 9);
    bears = new NflTeam('NFC', 'North', 'Chicago Bears', 'Chicago_Bears.gif', 3, 8);

    chargers = new NflTeam('AFC', 'West', 'Los Angeles Chargers', 'Los_Angeles_Chargers.png', 5, 6);
    dolphins = new NflTeam('AFC', 'East', 'Miami Dolphins', 'Miami_Dolphins.png', 4, 7);
    bills = new NflTeam('AFC', 'East', 'Buffalo Bills', 'Buffalo_Bills.png', 6, 5, 6);
    titans = new NflTeam('AFC', 'South', 'Tennessee Titans', 'Tennessee_Titans.png', 7, 4, 5);
    jags = new NflTeam('AFC', 'South', 'Jacksonville Jaguars', 'Jacksonville_Jaguars.png', 7, 4, 3);
    broncos = new NflTeam('AFC', 'West', 'Denver Broncos', 'Denver_Broncos.png', 3, 8);
    texans = new NflTeam('AFC', 'South', 'Houston Texans', 'Houston_Texans.gif', 4, 6);
    patriots = new NflTeam('AFC', 'East', 'New England Patriots', 'New_England_Patriots.gif', 9, 2, 1);
    cheifs = new NflTeam('AFC', 'West', 'Kansas City Cheifs', 'Kansas_City_Cheifs.png', 6, 5, 4);
    bengals = new NflTeam('AFC', 'North', 'Cincinnati Bengals', 'Cincinnati_Bengals.png', 5, 6);
    steelers = new NflTeam('AFC', 'North', 'Pittsburgh Steelers', 'Pittsburgh_Steelers.png', 9, 2, 2);
    jets = new NflTeam('AFC', 'East', 'New York Jets', 'New_York_Jets.png', 4, 7);
    colts = new NflTeam('AFC', 'East', 'Indianapolis Colts', 'Indianapolis_Colts.png', 3, 8);
    raiders = new NflTeam('AFC', 'West', 'Oakland Raiders', 'Oakland_Raiders.png', 5, 6);
    ravens = new NflTeam('AFC', 'North', 'Baltimore Ravens', 'Baltimore_Ravens.png', 5, 5);
    browns = new NflTeam('AFC', 'North', 'Cleveland Browns', 'Cleveland_Browns.png', 0, 11);

    afc = new Conference(
        'AFC', 'eastGroup',[
        this.chargers, this.dolphins, this.bills, this.titans,
        this.jags, this.broncos, this.texans, this.patriots,
        this.cheifs, this.bengals, this.steelers, this.jets,
        this.colts, this.raiders,this.ravens, this.browns], 
        'football', 'NFL');

    nfc = new Conference(
        'NFC', 'westGroup', [
        this.lions, this.cowboys, this.redskins, this.eagles,
        this.falcons, this.sanFran, this.rams, this.cardinals,
        this.packers, this.seahawks, this.saints, this.vikings,
        this.bucs, this.panthers, this.giants, this.bears],
        'football', 'NFL');

    conferences: Conference[] = [ this.afc, this.nfc];

    afcPlayoffTeams = new Conference(
        'AFC', 'eastGroup',[
        this.bills,  this.jags, this.patriots,
        this.cheifs, this.steelers, this.titans], 
        'football', 'NFL');

    nfcPlayoffTeams = new Conference(
        'NFC', 'westGroup', [
        this.eagles, this.falcons, this.rams,
        this.saints, this.vikings, this.panthers],
        'football', 'NFL');

    public getPlayoffWinners() {
        return {
            '2': ['Jacksonville Jaguars', 'Tennessee Titans', 'Atlanta Falcons', 'New Orleans Saints'],
            '3': ['Jacksonville Jaguars', 'New England Patriots', 'Philadelphia Eagles', 'Minnesota Vikings'],
            '4': ['New England Patriots', 'Philadelphia Eagles'],
            'championship': ['Philadelphia Eagles'],
        }
    }
    public getPlayoffScores() {
        return {
            'winners': {
                'AFC-2-1': "22",
                'AFC-2-2': "10",
                'AFC-3-0': "35",
                'AFC-3-1': "45",
                'AFC-4-0': "24",
                'NFC-2-1': "26",
                'NFC-2-2': "31",
                'NFC-3-0': "15",
                'NFC-3-1': "29",
                'NFC-4-0': "38",
                'championship': "41"
            },
            'losers': {
                'AFC-2-1': "21",
                'AFC-2-2': "3",
                'AFC-3-0': "14",
                'AFC-3-1': "42",
                'AFC-4-0': "20",
                'NFC-2-1': "13",
                'NFC-2-2': "26",
                'NFC-3-0': "10",
                'NFC-3-1': "24",
                'NFC-4-0': "7",
                'championship': "33"
            }
        }
    }

    conferencePlayoffTeams: Conference[] = [ this.afcPlayoffTeams, 
        this.nfcPlayoffTeams];
    
    public getPlayoffTeams() {
        return this.conferencePlayoffTeams;
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