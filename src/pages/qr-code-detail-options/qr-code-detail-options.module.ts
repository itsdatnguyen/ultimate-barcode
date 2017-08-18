import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeDetailOptionsPage } from './qr-code-detail-options';

@NgModule({
    declarations: [
        QrCodeDetailOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodeDetailOptionsPage),
    ],
    exports: [
        QrCodeDetailOptionsPage
    ]
})
export class QrCodeDetailOptionsPageModule {}
