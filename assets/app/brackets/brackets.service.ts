import { ErrorService } from './../errors/error.service';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { BracketPicks } from './bracketPicks.model';
import {Router} from '@angular/router';
var config = require('./../../../config.json')[process.env.NODE_ENV || 'production'];

@Injectable()
export class BracketsService {

	constructor(private http: Http, private errorService: ErrorService, private router: Router) {}

	addBracketPicks(picks: BracketPicks) {
		const body = JSON.stringify(picks);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' + localStorage.getItem('token') 
                : '';
        console.log(body);
		return this.http.post('http://' + config.url + '/picks/bracket' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const picks = new BracketPicks(
					result.obj.sport,
					result.obj.year,
					result.obj.picks, 
					result.obj.scores, 
					result.obj.league
				);
				return result;
			})
			.catch((error: Response) => {
				console.log('error', error);
                if (error.status === 502) {
					console.log('identified and suppressed 502');
				} else {
					this.errorService.handleError(error.json());
					return Observable.throw(error.json());
				}
			});
			
	}

	getBracketPicks() {
		const token = localStorage.getItem('token') 
				? '?token=' + localStorage.getItem('token') 
				: '';
		return this.http.get('http://' + config.url + '/picks/bracket' + token)
			.map((response: Response) => {
				const bracketPicks = response.json().obj;
				let transformedPicks: Array<Object> = [];
				for (let pick of bracketPicks) {
					const currentPick = new BracketPicks(
						pick.sport,
						pick.year,
						JSON.parse(pick.picks),
                        JSON.parse(pick.scores), 
						pick.league,
						pick.user.firstName,
						pick.user.lastName
					);
					const isCurrentUser = pick.user._id === localStorage.getItem('userId');
					transformedPicks.push({currentPick, isCurrentUser});
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