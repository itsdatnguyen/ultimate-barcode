import { QRCodeGeneratorService } from './../qr-code-generator/qr-code-generator.service';
import { BrowserService } from './../../shared/browser.service';
import { QrCodeDetailOptionsPage, QrCodeDetailOptionsInfo, QrCodeDetailOption } from './../qr-code-detail-options/qr-code-detail-options';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ToastController, PopoverController } from 'ionic-angular';
import { CodeEntry } from './../barcode-reader/barcode-reader.service';
import { Clipboard } from '@ionic-native/clipboard';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Utility } from "../../shared/utility";

@IonicPage()
@Component({
  selector: 'page-qr-code-detail',
  templateUrl: 'qr-code-detail.html',
})
export class QrCodeDetailPage {

    @ViewChild('qrCodeElement') qrCodeElement;

    qrCodeModel: CodeEntry = null;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private qrCodeGeneratorService: QRCodeGeneratorService,
        private viewController: ViewController,
        private toastController: ToastController,
        private alertController: AlertController,
        private popoverController: PopoverController,
        private social: SocialSharing,
        private browser: BrowserService,
        private clipboard: Clipboard,
        ) {
    }

    ionViewDidLoad() {
        this.qrCodeModel = this.navParams.data;
    }

    close() {
        this.viewController.dismiss();
    }

    shareClicked($event) {
        this.social.share(this.qrCodeModel.code, 'My Qr Code!', this.getQrImage().src);
    }

    moreClicked($event) {
        let morePopover = this.popoverController.create(QrCodeDetailOptionsPage, {
            code: this.qrCodeModel.code
        });

        morePopover.onDidDismiss((data: QrCodeDetailOptionsInfo, role: string) => {
            if (data != null) {
                switch (data.option) {
                    case QrCodeDetailOption.Download:
                        this.saveQRCodeAsImage();
                        break;

                    case QrCodeDetailOption.OpenUrl:
                        this.browser.openInBrowser(this.qrCodeModel.code);
                        break;

                    case QrCodeDetailOption.Search:
                        this.browser.openGoogleSearch(this.qrCodeModel.code);
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
                        this.clipboard.copy(this.qrCodeModel.code).then((value) => {
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
        let imageElement = this.getQrImage();
        return this.qrCodeGeneratorService.saveQRCodeAsImage(imageElement.src);
    }

    getQrImage(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }
}
