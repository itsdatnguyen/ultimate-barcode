import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntroductionPage } from './introduction';

@NgModule({
    declarations: [
        IntroductionPage,
    ],
    imports: [
        IonicPageModule.forChild(IntroductionPage),
    ],
    entryComponents: [
        IntroductionPage
    ]
})
export class IntroductionPageModule {}
