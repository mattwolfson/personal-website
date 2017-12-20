export class NflTeam {
    constructor(
        public conference: string, 
        public division: string, 
        public name: string,
        public logo?: string, 
        public wins?: number,
        public loses?: number,
        public conferenceRank?: number) {
	}
}