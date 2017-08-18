import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRCodeModule } from 'angular2-qrcode';

import { QrCodeDetailPage } from './qr-code-detail';

@NgModule({
    declarations: [
        QrCodeDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodeDetailPage),
        QRCodeModule
    ],
    entryComponents: [
        QrCodeDetailPage,
    ],
})
export class QrCodeDetailPageModule {}
