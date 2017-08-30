import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { QRCodeModule } from 'angular2-qrcode';

import { QrViewerPage } from './qr-viewer';

@NgModule({
    declarations: [
        QrViewerPage,
    ],
    imports: [
        IonicPageModule.forChild(QrViewerPage),
        QRCodeModule,
    ],
    providers: [
        QrViewerPage,
    ]
})
export class QrViewerPageModule {}
