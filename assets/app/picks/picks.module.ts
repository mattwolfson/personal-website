import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MakePicksComponent } from './make-picks.component';
import { ComparePicksComponent } from './compare-picks.component';
import { NgModule } from '@angular/core';
import { picksRouting } from './picks.routing';

@NgModule({
    declarations: [
        MakePicksComponent,
        ComparePicksComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        picksRouting
    ]
})
export class PicksModule {
    
}