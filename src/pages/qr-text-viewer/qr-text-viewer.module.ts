import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrTextViewerPage } from './qr-text-viewer';

@NgModule({
    declarations: [
        QrTextViewerPage,
    ],
    imports: [
        IonicPageModule.forChild(QrTextViewerPage),
    ],
    providers: [
        QrTextViewerPage,
    ]
})
export class QrTextViewerPageModule {}
