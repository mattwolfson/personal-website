import { Routes, RouterModule } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { BracketsComponent } from "./brackets/brackets.component";
import { MemesComponent } from "./memes/memes.component";
import { PicksComponent } from "./picks/picks.component";


const APP_ROUTES: Routes = [
	{ path: '', redirectTo: '/picks/compare', pathMatch: 'full' },
	{ path: 'messages', component: MessagesComponent },
	{ path: 'auth', component: AuthenticationComponent, loadChildren: './auth/auth.module#AuthModule' },
	{ path: 'brackets', component: BracketsComponent, loadChildren: './brackets/brackets.module#BracketsModule' },
	{ path: 'memes', component: MemesComponent },
	{ path: 'picks', component: PicksComponent, loadChildren: './picks/picks.module#PicksModule'  },
	{ path: '**', redirectTo: '/picks/compare', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
