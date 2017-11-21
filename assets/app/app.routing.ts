import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { BracketsComponent } from "./brackets/brackets.component";


const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/messages', pathMatch: 'full' },
	{ path: 'messages', component: MessagesComponent },
	{ path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
	{ path: 'brackets', component: BracketsComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
