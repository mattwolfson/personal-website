import { ErrorService } from './../errors/error.service';
import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Message } from "./message.model";
var config = require('./../../../config.json')[process.env.NODE_ENV || 'production'];

@Injectable()
export class MessageService {
	private messages: Message[] = [];
	messageIsEdit = new EventEmitter;
	constructor(private http: Http, private errorService: ErrorService) {}

	addMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
				? '?token=' + localStorage.getItem('token') 
				: '';
		console.log('pre add message');
		return this.http.post('http://' + config.url + '/message' + token, body, {headers: headers})
			.map((response: Response) => {
				const result = response.json();
				const message = new Message(
					result.obj.content, 
					result.obj.user.firstName, 
					result.obj._id, 
					result.obj.user._id
				);
				console.log(message, result);
				this.messages.push(message);
				return message;
			})
			.catch((error: Response) => {
				console.log('error', error);
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
			
	}

	getMessages() {
		return this.http.get('http://' + config.url + '/message')
			.map((response: Response) => {
				const messages = response.json().obj;
				let transformedMessages: Message[] = [];
				for (let message of messages) {
					//TODO: Remove this specific message logic since it removes week12 message picks in the try
					try {
						JSON.parse(message.content);
					} catch(err) {
						transformedMessages.push(new Message(
							message.content, 
							message.user ? message.user.firstName : null, 
							message._id, 
							message.user ? message.user._id : null
						));
					}
				}
				this.messages = transformedMessages;
				return transformedMessages;
			})
			.catch((error: Response) => {
				console.log(error);
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	editMessage(message: Message) {
		this.messageIsEdit.emit(message);
	}

	updateMessage(message: Message) {
		const body = JSON.stringify(message);
		const headers = new Headers({'Content-Type': 'application/json'});
		const token = localStorage.getItem('token') 
			? '?token=' + localStorage.getItem('token') 
			: '';
		return this.http.patch('http://' + config.url + '/message/' + message.messageId + token, body, {headers: headers})
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}

	deleteMessage(message: Message) {
		this.messages.splice(this.messages.indexOf(message), 1);
		const token = localStorage.getItem('token') 
			? '?token=' + localStorage.getItem('token') 
			: '';
		return this.http.delete('http://' + config.url + '/message/' + message.messageId + token)
			.map((response: Response) => response.json())
			.catch((error: Response) => {
				this.errorService.handleError(error.json());
				return Observable.throw(error.json());
			});
	}
}