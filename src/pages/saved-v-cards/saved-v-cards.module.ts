import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SavedVCardsPage } from './saved-v-cards';

@NgModule({
    declarations: [
        SavedVCardsPage,
    ],
    imports: [
        IonicPageModule.forChild(SavedVCardsPage),
    ],
    entryComponents: [
        SavedVCardsPage,
    ]
})
export class SavedVCardsPageModule {}
