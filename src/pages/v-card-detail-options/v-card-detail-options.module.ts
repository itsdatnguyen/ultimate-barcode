import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VCardDetailOptionsPage } from './v-card-detail-options';

@NgModule({
    declarations: [
        VCardDetailOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(VCardDetailOptionsPage),
    ],
    entryComponents: [
        VCardDetailOptionsPage,
    ]
})
export class VCardDetailOptionsPageModule {}
