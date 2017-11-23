export class Team {
	rank: number;
	logo: string;
	name: string;
	conference: string;

	constructor(rank: number, logo: string, conference: string, name?: string) {
		this.rank = rank;
		this.logo = logo;
		this.name = name;
		this.conference = conference;
	}
}