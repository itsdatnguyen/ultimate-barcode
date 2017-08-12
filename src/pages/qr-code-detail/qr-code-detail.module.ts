import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeDetailPage } from './qr-code-detail';

@NgModule({
    declarations: [
        QrCodeDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodeDetailPage),
    ],
    entryComponents: [
        QrCodeDetailPage,
    ],
})
export class QrCodeDetailPageModule {}
