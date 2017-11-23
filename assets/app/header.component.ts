import { Component } from "@angular/core";

@Component({
	selector: 'app-header',
	template: `
		<h1 class="col-md-8 col-md-offset-2" style="color: #337ab7">MattWolfson.com</h1>
		<header class="row">
			<nav class="col-md-8 col-md-offset-2">	
				<ul class="nav nav-pills">	
					<li routerLinkActive="active"><a [routerLink]="['/auth']">Auth</a></li>
					<li routerLinkActive="active"><a  [routerLink]="['/messages']">Messaging</a></li>
					<li routerLinkActive="active"><a  [routerLink]="['/picks']">Picks</a></li>
					<li routerLinkActive="active"><a  [routerLink]="['/memes']">Memes</a></li>	
				</ul>
			</nav>
		</header>
	`
})

export class HeaderComponent {

}