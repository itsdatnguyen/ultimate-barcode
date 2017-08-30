import { SocialSharing } from '@ionic-native/social-sharing';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { ImageSaverService } from './../../shared';

export interface QrViewerObject {
    qrCode: {
        value: string,
        size: number,
    }
}

@IonicPage()
@Component({
  selector: 'page-qr-viewer',
  templateUrl: 'qr-viewer.html',
})
export class QrViewerPage {

    @ViewChild('qrCodeElement') qrCodeElement: any;
    qrViewer: QrViewerObject;

    constructor(
        public navParams: NavParams,
        private viewController: ViewController,
        private imageSaver: ImageSaverService,
        private social: SocialSharing,
    ) {

    }

    ionViewWillEnter() {
        this.qrViewer = this.navParams.data;
        this.qrViewer.qrCode.size = 300;
    }

    close() {
        this.viewController.dismiss();
    }

    onShareClicked() {
        this.social.share('My Qr Code', '', this.getQrImage().src);
    }
    
    downloadClicked() {
        this.imageSaver.saveBase64ToGallery({
            base64: this.getQrImage().src,
            filePrefix: 'QrCode_',
            description: 'Qr Code'
        });
    }

    getQrImage(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }
}
