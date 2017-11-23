import { Team } from './../brackets/team.model';
import { MessageService } from './../messages/message.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-compare-picks',
    templateUrl: './compare-picks.component.html',
    styleUrls: ['./compare-picks.component.css']
})

export class ComparePicksComponent implements OnInit {
    
    constructor(private messageService: MessageService) {}

    allPicks: Array<any> = []
    hasPickData: Boolean = true;
    
	ngOnInit() {
		this.messageService.getPicks()
			.subscribe(
				(picks) => {
                    console.log(picks);
                    if (picks) {
                        this.allPicks = picks;
                    } else {
                        this.hasPickData = false;
                    }
				}
			);
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
        new Team(1, 'Minnesota_Vikings', 'DET -3', 'Minnesota Vikings'),
        new Team(1, 'Los_Angeles_Chargers', 'LAC -1', 'Los Angeles Chargers'),
        new Team(1, 'New_York_Giants', 'WAS -7', 'New York Giants'),
        new Team(1, 'Cleveland_Browns', 'CIN -8', 'Cleveland Browns'),
        new Team(1, 'Chicago_Bears', 'PHI -13.5', 'Chicago Bears'),
        new Team(1, 'Miami_Dolphins', 'NE -16.5', 'Miami Dolphins'),
        new Team(1, 'Buffalo_Bills', 'KC -10', 'Buffalo Bills'),
        new Team(1, 'Tampa_Bay_Buccaneers', 'ATL -10', 'Tampa Bay Buccaneers'),
        new Team(1, 'Carolina_Panthers', 'CAR -5', 'Carolina Panthers'),
        new Team(1, 'Tenessee_Titans', 'TEN -3', 'Tenessee Titans'),
        new Team(1, 'Seattle_Seahawks', 'SEA -6.5', 'Seattle Seahawks'),
        new Team(1, 'New_Orleans_Saints', 'LAR -2.5', 'New Orleans Saints'),
        new Team(1, 'Jacksonville_Jaguars', 'JAX -5', 'Jacksonville Jaguars'),
        new Team(1, 'Denver_Broncos', 'OAK -4.5', 'Denver Broncos'),
        new Team(1, 'Green_Bay_Packers', 'PIT -14', 'Green Bay Packers'),
        new Team(1, 'Houston_Texans', 'BAL -7', 'Houston Texans')
    ];

    totalGames: number = this.awayTeams.length;
    finalPicks: Array<any> = new Array(this.totalGames + 2);
}

