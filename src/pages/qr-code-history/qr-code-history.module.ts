import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrCodeHistoryPage } from './qr-code-history';

@NgModule({
    declarations: [
        QrCodeHistoryPage,
    ],
    imports: [
        IonicPageModule.forChild(QrCodeHistoryPage),
    ],
    entryComponents: [
        QrCodeHistoryPage
    ]
})
export class QrCodeHistoryPageModule {}
