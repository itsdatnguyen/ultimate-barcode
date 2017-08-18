import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeDetailOptionsPage } from './barcode-detail-options';

@NgModule({
    declarations: [
        BarcodeDetailOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeDetailOptionsPage),
    ],
    entryComponents: [
        BarcodeDetailOptionsPage
    ]
})
export class BarcodeDetailOptionsPageModule {}
