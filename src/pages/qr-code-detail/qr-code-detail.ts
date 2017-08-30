import { BarcodeReaderService } from './../../shared/barcode-reader.service';
import { FavouritesService } from './../../shared/favourites.service';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, ViewController, ToastController, PopoverController, NavController, AlertController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { BrowserService, AdService, ImageSaverService, CodeEntry, CopyPasteService } from './../../shared';
import { QrCodeDetailOptionsPage, QrCodeDetailOption } from './../qr-code-detail-options/qr-code-detail-options';

@IonicPage()
@Component({
  selector: 'page-qr-code-detail',
  templateUrl: 'qr-code-detail.html',
})
export class QrCodeDetailPage {

    @ViewChild('qrCodeElement') qrCodeElement;

    qrCode: CodeEntry = null;

    constructor(
        private navParams: NavParams,
        private navController: NavController,
        private imageSaver: ImageSaverService,
        private favourites: FavouritesService,
        private barcodeReader: BarcodeReaderService,
        private view: ViewController,
        private toast: ToastController,
        private popover: PopoverController,
        private alert: AlertController,
        private social: SocialSharing,
        private browser: BrowserService,
        private copyPaste: CopyPasteService,
        private adService: AdService,
        ) {
    }

    ionViewWillEnter() {
        this.qrCode = this.navParams.data;
    }

    close() {
        this.view.dismiss();
    }

    onFavouriteClicked() {
        if (this.qrCode.favourite === 1) {
            this.qrCode.favourite = 0;
            
            this.favourites.setQrCodeFavourite(this.qrCode.rowid, 0)
            .then((value) => {
                let removedFavouriteToast = this.toast.create({
                    message: 'Removed from favourites',
                    duration: 2000
                });
                return removedFavouriteToast.present();
            });
        } else {
            this.qrCode.favourite = 1;

            this.favourites.setQrCodeFavourite(this.qrCode.rowid, 1)
            .then((value) => {
                let addedFavouriteToast = this.toast.create({
                    message: 'Added to favourites',
                    duration: 2000
                });
                return addedFavouriteToast.present();
            });
        }
    }

    getButtonColor(): string {
        if (this.isFavourite() === true) {
            return 'primary';
        } else {
            return 'light';
        }
    }

    isFavourite(): boolean {     
        return this.qrCode.favourite === 1;
    }

    shareClicked($event) {
        this.social.share(this.qrCode.code, 'My Qr Code!', this.getQrImage().src)
        .then(() => {
            this.adService.showInterstitialAd()
        });
    }

    moreClicked($event) {
        let morePopover = this.popover.create(QrCodeDetailOptionsPage, {
            code: this.qrCode.code
        });

        morePopover.onDidDismiss((option: QrCodeDetailOption, role: string) => {
            if (option != null) {
                switch (option) {
                    case QrCodeDetailOption.Download:
                        this.saveQRCodeAsImage();
                        break;

                    case QrCodeDetailOption.Open:
                        this.browser.openInBrowser(this.qrCode.code);
                        break;

                    case QrCodeDetailOption.OpenInBrowser: 
                        this.browser.openInNativeBrowser(this.qrCode.code);
                        break;

                    case QrCodeDetailOption.Search:
                        this.browser.openGoogleSearch(this.qrCode.code);
                        break;

                    case QrCodeDetailOption.Delete:
                        let deleteAlert = this.alert.create({
                            title: 'Delete',
                            message: 'Are you sure you want to delete this Qr Code?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, 
                                {
                                    text: 'Delete',
                                    role: 'delete',
                                    handler: () => {
                                        this.barcodeReader.deleteQrCode(this.qrCode.rowid)
                                        .then((value) => {
                                            if (this.qrCode.favourite === 1) {
                                                this.favourites.favouriteQrCodeChangeEmit();
                                            }
                                        });

                                        this.navController.pop();
                                    }
                                }
                            ]
                        });
                        
                        deleteAlert.present();
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
        this.copyPaste.copy(this.qrCode.code, {
            askUser: true
        });
    }

    saveQRCodeAsImage(): Promise<any> {
        return this.imageSaver.saveBase64ToGallery({
            base64: this.getQrImage().src,
            filePrefix: 'QrCode_',
            description: 'Qr Code'
        });
    }

    getQrImage(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }
}
