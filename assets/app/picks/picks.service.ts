import { ErrorService } from './../errors/error.service';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Picks } from './picks.model';
import {Router} from '@angular/router';
var config = require('./../../../config.json')[process.env.NODE_ENV || 'production'];

@Injectable()
export class PicksService {

	constructor(private http: Http, private errorService: ErrorService, private router: Router) {}

	addPicks(picks: Picks) {
		const body = JSON.stringify(picks);
		console.log(picks, body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' + localStorage.getItem('token') 
				: '';
		return this.http.post('http://' + config.url + '/picks' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const picks = new Picks(
					result.obj.sport,
					result.obj.year,
					result.obj.week,
					result.obj.picks, 
					result.obj.league
				);
				return result;
			})
			.catch((error: Response) => {
				console.log('error', error);
                if (error.status === 502) {
					console.log('identified 502');
				} else {
					this.errorService.handleError(error.json());
					return Observable.throw(error.json());
				}
			});
			
	}

	getPicks(week?: number) {
		return this.http.get('http://' + config.url + '/picks')
			.map((response: Response) => {
				const picks = response.json().obj;
				let transformedPicks: Picks[] = [];
				for (let pick of picks) {
					transformedPicks.push(new Picks(
						pick.sport,
						pick.year,
						pick.week,
						JSON.parse(pick.picks),
						pick.league,
						pick.user.firstName,
						pick.user.lastName
					));
				}
				return transformedPicks;
			})
			.catch((error: Response) => {
				console.log(error);
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
}