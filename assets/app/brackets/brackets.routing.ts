import { CompareBracketsComponent } from './compare-brackets.component';
import { Routes, RouterModule } from "@angular/router";
import { MakeBracketsComponent } from "./make-brackets.component";


const BRACKETS_ROUTES: Routes= [
	{ path: '', redirectTo: 'compare', pathMatch: 'full'},
	{ path: 'compare', component: CompareBracketsComponent },
	{ path: 'make', component: MakeBracketsComponent },
	{ path: '**', component: MakeBracketsComponent }
];

export const bracketsRouting = RouterModule.forChild(BRACKETS_ROUTES);