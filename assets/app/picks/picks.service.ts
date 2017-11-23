import { ErrorService } from './../errors/error.service';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';

//TODO: Make functional (Currently using Message)
@Injectable()
export class PicksService {
	// private messages: Message[] = [];
	// messageIsEdit = new EventEmitter;
	constructor(private http: Http, private errorService: ErrorService) {}

	addPicks(picks: Array<any>) {
		const body = JSON.stringify(picks);
		console.log(picks, body);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' + localStorage.getItem('token') 
				: '';
		console.log('pre add picks');
		return this.http.post('http://localhost:27017/message' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				// const message = new Message(
				// 	result.obj.content, 
				// 	result.obj.user.firstName, 
				// 	result.obj._id, 
				// 	result.obj.user._id
				// );
				console.log(result);
				// this.messages.push(message);
				return result;
			})
			.catch((error: Response) => {
				console.log('error', error);
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
			
	}
}