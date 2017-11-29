export class Picks {
    constructor(
		public sport: string,
		public year: number,
		public week: number,
		public picks: any,
		public league?: string,
		public firstName?: string,
		public lastName?: string) {
	}
}