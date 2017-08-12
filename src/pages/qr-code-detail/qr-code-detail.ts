import { ToastController } from 'ionic-angular';
import { CodeEntry } from './../barcode-reader/barcode-reader.service';
import { Clipboard } from '@ionic-native/clipboard';
import { BrowserTab } from '@ionic-native/browser-tab';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { Utility } from "../../shared/utility";

@IonicPage()
@Component({
  selector: 'page-qr-code-detail',
  templateUrl: 'qr-code-detail.html',
})
export class QrCodeDetailPage {

    qrCodeModel: CodeEntry = null;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController,
        private browser: BrowserTab,
        private alertController: AlertController,
        private clipboard: Clipboard,
        private toastController: ToastController) {
    }

    ionViewDidLoad() {
        this.qrCodeModel = this.navParams.data;
    }

    close() {
        this.viewController.dismiss();
    }

    goToUrlClicked($event) {
        this.browser.isAvailable().then((available: boolean) => {
            if (available) {
                this.browser.openUrl(this.qrCodeModel.code);
            } else {
                window.open(this.qrCodeModel.code, '_system');
            }
        })
    }

    isValidUrl(url: string) {
        return Utility.isValidUrl(url);
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
}
