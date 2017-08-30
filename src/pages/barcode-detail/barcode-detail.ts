import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, AlertController, ToastController, ViewController, PopoverController, NavController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { ImageSaverService, BrowserService, AdService, CodeEntry, CopyPasteService, BarcodeReaderService, FavouritesService } from './../../shared';
import { BarcodeDetailOptionsPage, BarcodeDetailOptions } from './../barcode-detail-options/barcode-detail-options';

@IonicPage()
@Component({
  selector: 'page-barcode-detail',
  templateUrl: 'barcode-detail.html',
})
export class BarcodeDetailPage {

    @ViewChild('barcodeElement') barcodeElement: any;

    barcode: CodeEntry = null;

    constructor(
        private imageSaver: ImageSaverService,
        private favourites: FavouritesService,
        private barcodeReader: BarcodeReaderService,
        private navController: NavController,
        private navParams: NavParams,
        private view: ViewController,
        private browser: BrowserService,
        private alert: AlertController,
        private toast: ToastController,
        private popover: PopoverController,
        private copyPaste: CopyPasteService,
        private social: SocialSharing,
        private adService: AdService,
    ) {
    }

    ionViewWillEnter() {
        this.barcode = this.navParams.data;
    }

    close() {
        this.view.dismiss();
    }

    onFavouriteClicked() {
        if (this.barcode.favourite === 1) {
            this.barcode.favourite = 0;
            
            this.favourites.setBarcodeFavourite(this.barcode.rowid, 0)
            .then((value) => {
                let removedFavouriteToast = this.toast.create({
                    message: 'Removed from favourites',
                    duration: 2000
                });
                return removedFavouriteToast.present();
            });
        } else {
            this.barcode.favourite = 1;

            this.favourites.setBarcodeFavourite(this.barcode.rowid, 1)
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
        return this.barcode.favourite === 1;
    }

    shareClicked($event) {
        this.social.share(this.barcode.code, 'My Barcode', this.getBarcodeImageSrc())
        .then((value) => {
            this.adService.showInterstitialAd();
        })
    } 

    moreClicked($event) {
        let morePopover = this.popover.create(BarcodeDetailOptionsPage);

        morePopover.onDidDismiss((option: BarcodeDetailOptions, role: string) => {
            if (option != null) {
                switch (option) {
                    case BarcodeDetailOptions.Download:
                        this.imageSaver.saveBase64ToGallery({
                            base64: this.getBarcodeImageSrc(),
                            filePrefix: 'Barcode_',
                            description: 'Barcode'
                        });
                        break;

                    case BarcodeDetailOptions.Open:
                        this.browser.openInBrowser(this.barcode.code);
                        break;

                    case BarcodeDetailOptions.OpenInBrowser:
                        this.browser.openInNativeBrowser(this.barcode.code);
                        break;

                    case BarcodeDetailOptions.SearchGoogle:
                        this.browser.openGoogleSearch(this.barcode.code);
                        break;

                    case BarcodeDetailOptions.SearchUpcIndex:
                        this.browser.openInBrowser(`http://www.upcindex.com/${this.barcode.code}`);
                        break;

                    case BarcodeDetailOptions.Delete: 
                        let deleteAlert = this.alert.create({
                            title: 'Delete',
                            message: 'Are you sure you want to delete this Barcode?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                }, 
                                {
                                    text: 'Delete',
                                    role: 'delete',
                                    handler: () => {
                                        this.barcodeReader.deleteBarcode(this.barcode.rowid)
                                        .then((value) => {
                                            if (this.barcode.favourite === 1) {
                                                this.favourites.favouriteBarcodeChangeEmit();
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
        this.copyPaste.copy(this.barcode.code, {
            askUser: true
        });
    }

    getBarcodeImageSrc(): string {
        let imgContainerElement = this.barcodeElement.bcElement.nativeElement;
        
        if (imgContainerElement.children.length > 0) {
            return imgContainerElement.children[0].src;
        }
        return undefined;
    }
}
