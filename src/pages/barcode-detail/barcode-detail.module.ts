import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { NgxBarcodeModule } from 'ngx-barcode';
import { BarcodeDetailPage } from './barcode-detail';

@NgModule({
    declarations: [
        BarcodeDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeDetailPage),
        NgxBarcodeModule,
    ],
    entryComponents: [
        BarcodeDetailPage,
    ],
})
export class BarcodeDetailPageModule {}
