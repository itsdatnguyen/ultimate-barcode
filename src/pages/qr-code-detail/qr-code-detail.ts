import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController, ViewController, ToastController, PopoverController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';

import { BrowserService, AdService, ImageSaverService } from './../../shared';
import { QrCodeDetailOptionsPage, QrCodeDetailOption } from './../qr-code-detail-options/qr-code-detail-options';
import { CodeEntry } from './../barcode-reader/barcode-reader.service';

@IonicPage()
@Component({
  selector: 'page-qr-code-detail',
  templateUrl: 'qr-code-detail.html',
})
export class QrCodeDetailPage {

    @ViewChild('qrCodeElement') qrCodeElement;

    qrCode: CodeEntry = null;

    constructor(
        public navParams: NavParams,
        private imageSaverService: ImageSaverService,
        private viewController: ViewController,
        private toastController: ToastController,
        private alertController: AlertController,
        private popoverController: PopoverController,
        private social: SocialSharing,
        private browser: BrowserService,
        private clipboard: Clipboard,
        private adService: AdService,
        ) {
    }

    ionViewWillEnter() {
        this.qrCode = this.navParams.data;
    }

    close() {
        this.viewController.dismiss();
    }

    shareClicked($event) {
        this.social.share(this.qrCode.code, 'My Qr Code!', this.getQrImage().src)
        .then(() => {
            this.adService.showInterstitialAd()
        });
    }

    moreClicked($event) {
        let morePopover = this.popoverController.create(QrCodeDetailOptionsPage, {
            code: this.qrCode.code
        });

        morePopover.onDidDismiss((option: QrCodeDetailOption, role: string) => {
            if (option != null) {
                switch (option) {
                    case QrCodeDetailOption.Download:
                        this.saveQRCodeAsImage();
                        break;

                    case QrCodeDetailOption.Open:
                        this.browser.openInBrowser(this.qrCode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    case QrCodeDetailOption.OpenInBrowser: 
                        this.browser.openInNativeBrowser(this.qrCode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    case QrCodeDetailOption.Search:
                        this.browser.openGoogleSearch(this.qrCode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;
                }
            }
        });

        morePopover.present({
            ev: $event
        });
    }

    codePressed($event) {
        let copyAlert = this.alertController.create({
            title: 'Copy',
            message: 'Do you want to copy this text?',
            buttons: [
                {
                    text: 'No'
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.clipboard.copy(this.qrCode.code).then((value) => {
                            let copySuccessToast = this.toastController.create({
                                message: 'Text Copied!',
                                duration: 2000
                            });

                            copySuccessToast.present();
                        });
                    }
                }
            ]
        });

        copyAlert.present();
    }

    saveQRCodeAsImage(): Promise<any> {
        return this.imageSaverService.saveBase64ToGallery({
            base64: this.getQrImage().src,
            filePrefix: 'QrCode_',
            description: 'Qr Code'
        });
    }

    getQrImage(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }
}
