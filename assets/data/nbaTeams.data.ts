import { Injectable } from '@angular/core';
import { Conference } from "../app/brackets/conference.model";
import { Team } from "../app/brackets/team.model";

@Injectable()
export class NbaTeams {

    eastTeams: Team[] = [
        new Team(1, 'Boston_Celtics.svg', 'nbaEast', 'Boston Celtics'),
        new Team(8, 'Chicago_Bulls.svg', 'nbaEast', 'Chicago Bulls'),
        new Team(4, 'Washington_Wizards.svg', 'nbaEast', 'Washington Wizards'),
        new Team(5, 'Atlanta_Hawks.svg', 'nbaEast','Atlanta Hawks'),
        new Team(2, 'Cleveland_Cavaliers.svg', 'nbaEast', 'Cleveland Calaliers'),
        new Team(7, 'Indiana_Pacers.svg', 'nbaEast', 'Indiana Pacers'),
        new Team(3, 'Houston_Rockets.svg', 'nbaEast', 'Houston Rockets'),
        new Team(6, 'Oklahoma_City_Thunder.gif', 'nbaEast', 'Oklahoma City Thunder')
    ];

    westTeams: Team[] = [
        new Team(1, 'Golden_State_Warriors.svg', 'nbaWest', 'Golden State Warriors'),
        new Team(8, 'Portland_Trail_Blazers.svg', 'nbaWest', 'Portland Trail Blazers'),
        new Team(4, 'Clippers.svg', 'nbaWest', 'Clippers'),
        new Team(5, 'Utah_Jazz.svg', 'nbaWest', 'Utah Jazz'),
        new Team(2, 'San_Antonio_Spurs.svg', 'nbaWest', 'San Antonio Spurs'),
        new Team(7, 'Memphis_Grizzlies.svg', 'nbaWest', 'Memphis Grizzlies'),
        new Team(3, 'Houston_Rockets.svg', 'nbaWest', 'Houston Rockets'),
        new Team(6, 'Oklahoma_City_Thunder.gif', 'nbaWest', 'Oklahoma City Thunder')
    ];

    nbaEast = new Conference('nbaEast', 'eastGroup', this.eastTeams, 'basketball', 'NBA');
    nbaWest = new Conference('nbaWest', 'westGroup', this.westTeams, 'basketball', 'NBA');
    conferences: Conference[] = [ this.nbaEast, this.nbaWest];

    public getPlayoffTeams() {
        return this.conferences;
    }
}