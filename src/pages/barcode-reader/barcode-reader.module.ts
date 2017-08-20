import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

import { BarcodeReaderPage } from './barcode-reader';

@NgModule({
    declarations: [
        BarcodeReaderPage,
    ],
    imports: [
        IonicPageModule.forChild(BarcodeReaderPage),
    ],
    entryComponents: [
        BarcodeReaderPage
    ],
    providers: [
        BarcodeScanner,
        Base64ToGallery
    ]
})
export class BarcodeReaderPageModule {}
