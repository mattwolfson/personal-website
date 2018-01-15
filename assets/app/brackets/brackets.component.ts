import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
	selector: 'app-brackets',
	template: `
		<header class="row spacing">
			<nav class="col-md-8 col-md-offset-2">
				<ul class="nav nav-tabs">
					<li routerLinkActive="active"><a [routerLink]="['make']">Make Bracket</a></li>
					<li routerLinkActive="active"><a [routerLink]="['compare']">Compare Brackets</a></li>
				</ul>
			</nav>
		</header>
		<div class="row spacing">
			<router-outlet></router-outlet>
		</div>
	`
})


export class BracketsComponent implements OnInit {
	
	score: Object = {};
	ngOnInit() {
		this.score['winners'] = {};
		this.score['losers'] = {};
	}
}