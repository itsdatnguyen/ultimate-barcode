import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeDetailPage } from './barcode-detail';

@NgModule({
    declarations: [
        BarcodeDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeDetailPage),
    ],
    entryComponents: [
        BarcodeDetailPage,
    ],
})
export class BarcodeDetailPageModule {}
