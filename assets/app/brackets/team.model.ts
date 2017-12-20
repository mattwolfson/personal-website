export class Team {
	conferenceRank: number;
	logo: string;
	name: string;
	conference: string;

	constructor(conferenceRank: number, logo: string, conference: string, name?: string) {
		this.conferenceRank = conferenceRank;
		this.logo = logo;
		this.conference = conference;
		this.name = name;
	}
}