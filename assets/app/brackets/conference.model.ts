import { Team } from './team.model';

export class Conference {
	name: string;
	className: string;
	sport: string;
	league: string;
	teams: Team[];

	constructor(name: string, className: string, teams?: Team[], sport?: string, league?: string) {
		this.name = name;
		this.className = className;
		this.sport = sport;
		this.league = league;
		this.teams = teams;
	}
}