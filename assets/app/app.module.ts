import { BracketsService } from './brackets/brackets.service';
import { MatchUps } from './../data/matchups.data';
import { BracketsComponent } from './brackets/brackets.component';
import { MessageModule } from './messages/message.module';
import { ErrorService } from './errors/error.service';
import { ErrorComponent } from './errors/error.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { MemesComponent } from './memes/memes.component';
import { FormsModule } from '@angular/forms';
import { PicksComponent } from './picks/picks.component';
import { PicksService } from './picks/picks.service';
import { NbaTeams } from '../data/nbaTeams.data';
import { NflTeams } from '../data/nflTeams.data';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        BracketsComponent,
        MemesComponent,
        HeaderComponent,
        ErrorComponent,
        PicksComponent
    ],
    imports: [
    	BrowserModule,
        FormsModule,
		routing, 
        HttpModule,
        MessageModule
	],
    providers: [AuthService, ErrorService, PicksService, BracketsService, MatchUps, NbaTeams, NflTeams],
    bootstrap: [AppComponent]
})
export class AppModule {
}