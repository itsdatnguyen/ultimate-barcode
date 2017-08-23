import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController, ToastController, ViewController, PopoverController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { Clipboard } from '@ionic-native/clipboard';

import { ImageSaverService, BrowserService, AdService } from './../../shared';
import { BarcodeDetailOptionsPage, BarcodeDetailOptions } from './../barcode-detail-options/barcode-detail-options';
import { CodeEntry } from './../barcode-reader/barcode-reader.service';

@IonicPage()
@Component({
  selector: 'page-barcode-detail',
  templateUrl: 'barcode-detail.html',
})
export class BarcodeDetailPage {

    @ViewChild('barcodeElement') barcodeElement: any;

    barcode: CodeEntry = null;

    constructor(
        private imageSaverService: ImageSaverService,
        public navParams: NavParams,
        private viewController: ViewController,
        private browser: BrowserService,
        private alertController: AlertController,
        private toastController: ToastController,
        private popoverController: PopoverController,
        private clipboard: Clipboard,
        private social: SocialSharing,
        private adService: AdService,
    ) {
    }

    ionViewWillEnter() {
        this.barcode = this.navParams.data;
    }

    close() {
        this.viewController.dismiss();
    }

    shareClicked($event) {
        this.social.share(this.barcode.code, 'My Barcode', this.getBarcodeImageSrc())
        .then((value) => {
            this.adService.showInterstitialAd();
        })
    } 

    moreClicked($event) {
        let morePopover = this.popoverController.create(BarcodeDetailOptionsPage);

        morePopover.onDidDismiss((option: BarcodeDetailOptions, role: string) => {
            if (option != null) {
                switch (option) {
                    case BarcodeDetailOptions.Download:
                        this.imageSaverService.saveBase64ToGallery({
                            base64: this.getBarcodeImageSrc(),
                            filePrefix: 'Barcode_',
                            description: 'Barcode'
                        });
                        break;

                    case BarcodeDetailOptions.Open:
                        this.browser.openInBrowser(this.barcode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    case BarcodeDetailOptions.OpenInBrowser:
                        this.browser.openInNativeBrowser(this.barcode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    case BarcodeDetailOptions.SearchGoogle:
                        this.browser.openGoogleSearch(this.barcode.code)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    case BarcodeDetailOptions.SearchUpcIndex:
                        this.browser.openInBrowser(`http://www.upcindex.com/${this.barcode.code}`)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;

                    default:
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
                        this.clipboard.copy(this.barcode.code).then((value) => {
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

    getBarcodeImageSrc(): string {
        let imgContainerElement = this.barcodeElement.bcElement.nativeElement;
        
        if (imgContainerElement.children.length > 0) {
            return imgContainerElement.children[0].src;
        }
        return undefined;
    }
}
