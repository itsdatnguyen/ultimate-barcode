import { QRCodeGeneratorService } from './qr-code-generator.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRCodeModule } from 'angular2-qrcode';


import { QrCodeGeneratorPage } from './qr-code-generator';


@NgModule({
    declarations: [
        QrCodeGeneratorPage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodeGeneratorPage),
        QRCodeModule
    ],
    exports: [
        QrCodeGeneratorPage
    ],
    providers: [
        QRCodeGeneratorService
    ]
})
export class QrCodeGeneratorPageModule {}
