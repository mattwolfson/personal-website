import { NflTeam } from './nflTeam.model';

export class MatchUp {
    constructor(
        public awayTeam: NflTeam,
        public homeTeam: NflTeam, 
        public week: number,
        public season: number, 
        public time: string,
        public oddsForHome: number,
        public winner?: NflTeam,
        public homeScore?: number,
        public awayScore?: number,
        public timeRemaining?: string) {
	}
}