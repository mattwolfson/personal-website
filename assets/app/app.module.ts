import { MatchUps } from './picks/matchups.data';
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
    providers: [AuthService, ErrorService, PicksService, MatchUps],
    bootstrap: [AppComponent]
})
export class AppModule {
}