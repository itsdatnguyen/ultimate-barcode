import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NgxBarcodeModule } from 'ngx-barcode';

import { BarcodeGeneratorPage } from './barcode-generator';
import { BarcodeGeneratorStorageService } from "./barcode-generator-storage.service";

@NgModule({
    declarations: [
        BarcodeGeneratorPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeGeneratorPage),
        NgxBarcodeModule,
    ],
    entryComponents: [
        BarcodeGeneratorPage,
    ],
    providers: [
        BarcodeGeneratorStorageService,
    ]
})
export class BarcodeGeneratorPageModule {}
