import { Routes, RouterModule } from "@angular/router";
import { ComparePicksComponent } from "./compare-picks.component";
import { MakePicksComponent } from "./make-picks.component";


const PICKS_ROUTES: Routes= [
	{ path: '', redirectTo: 'compare', pathMatch: 'full'},
	{ path: 'compare', component: ComparePicksComponent },
	{ path: 'make', component: MakePicksComponent }
];

export const picksRouting = RouterModule.forChild(PICKS_ROUTES);