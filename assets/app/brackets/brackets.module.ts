import { CompareBracketsComponent } from './compare-brackets.component';
import { CommonModule } from '@angular/common';
import { MakeBracketsComponent } from './make-brackets.component';
import { NgModule } from '@angular/core';
import { bracketsRouting } from './brackets.routing';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        MakeBracketsComponent,
        CompareBracketsComponent
    ],
    imports: [
        CommonModule,
        bracketsRouting,
        FormsModule
    ]
})
export class BracketsModule {
    
}