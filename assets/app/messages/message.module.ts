import { MessageService } from './message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageInputComponent } from './message-input.component';
import { MessageComponent } from './message.component';
import { MessageListerComponent } from './message-lister.component';
import { MessagesComponent } from './messages.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        MessagesComponent,
        MessageListerComponent,
        MessageComponent,
        MessageInputComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    providers: [MessageService]
})
export class MessageModule {
}