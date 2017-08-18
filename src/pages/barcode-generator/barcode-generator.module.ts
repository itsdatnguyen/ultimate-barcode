import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxBarcodeModule } from 'ngx-barcode';

import { BarcodeGeneratorPage } from './barcode-generator';

@NgModule({
    declarations: [
        BarcodeGeneratorPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeGeneratorPage),
        NgxBarcodeModule
    ],
    entryComponents: [
        BarcodeGeneratorPage
    ]
})
export class BarcodeGeneratorPageModule {}
