import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarcodeHistoryPage } from './barcode-history';

@NgModule({
    declarations: [
        BarcodeHistoryPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeHistoryPage),
    ],
    entryComponents: [
        BarcodeHistoryPage
    ]
})
export class BarcodeHistoryPageModule {}
