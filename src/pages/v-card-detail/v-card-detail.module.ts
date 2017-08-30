import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VCardDetailPage } from './v-card-detail';

@NgModule({
    declarations: [
        VCardDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(VCardDetailPage),
    ],
    exports: [
        VCardDetailPage,
    ]
})
export class VCardDetailPageModule {}
