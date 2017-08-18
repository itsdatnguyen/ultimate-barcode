import { BrowserService } from './../../shared/browser.service';
import { Clipboard } from '@ionic-native/clipboard';
import { CodeEntry } from './../barcode-reader/barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Utility } from "../../shared/utility";

@IonicPage()
@Component({
  selector: 'page-barcode-detail',
  templateUrl: 'barcode-detail.html',
})
export class BarcodeDetailPage {

    barcodeModel: CodeEntry = null;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController,
        private browser: BrowserService,
        private alertController: AlertController,
        private clipboard: Clipboard,
        private toastController: ToastController) {
    }

    ionViewDidLoad() {
        this.barcodeModel = this.navParams.data;
    }

    close() {
        this.viewController.dismiss();
    }

    lookUpBarcodeClicked($event) {
        this.browser.openInBrowser(`http://www.upcindex.com/${this.barcodeModel.code}`);
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
                        this.clipboard.copy(this.barcodeModel.code).then((value) => {
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
