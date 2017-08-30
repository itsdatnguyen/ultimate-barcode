import { FavouritesService } from './../../shared/favourites.service';
import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform, NavParams } from 'ionic-angular';

import { QrCodeDetailPage } from './../qr-code-detail/qr-code-detail';
import { AppReadyService, BarcodeReaderService, CodeEntry, CodeListOptions } from "../../shared/index";

@IonicPage()
@Component({
    selector: 'page-qr-code-history',
    templateUrl: 'qr-code-history.html',
})
export class QrCodeHistoryPage {

    qrCodes: CodeEntry[] = [];
    config: CodeListOptions;    
    gettingData: boolean = true;

    constructor(
        public modalController: ModalController,
        private navParams: NavParams,
        private platform: Platform,
        private barcodeReaderService: BarcodeReaderService,
        private appReadyService: AppReadyService,
        private favouritesService: FavouritesService,
    ) {
    }

    ionViewWillEnter() {
        this.config = this.navParams.data;
        this.gettingData = true;

        if (this.platform.is('core') || this.platform.is('mobileweb')) {
            this.qrCodes = [
                { rowid: 0, code: 'https://itsdatnguyen.github.io/utility/qr-code', format: 'QR_CODE', date: 3453456454534, favourite: 1 },
                { rowid: 1, code: 'This is pretty cool', format: 'QR_CODE', date: 45645645645, favourite: 0 },
                { rowid: 2, code: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM', format: 'QR_CODE', date: 235234564235, favourite: 0 },
                { rowid: 3, code: 'https://www.instagram.com/angievarona/?hl=en', format: 'QR_CODE', date: 6456456456564, favourite: 1 },
            ];
        } else {         
            this.appReadyService.isAppReady()
            .subscribe((value) => {
                this.initializeList();
                this.setupQrChanges();
            });
        }
    }

    ionViewWillLeave() {
        this.qrCodes = [];
    }

    initializeList(): Promise<any> {
        if (this.config.onlyFavourites === true) {
            return this.favouritesService.getAllFavouriteQrCodes()
            .then((codes) => {
                this.gettingData = false;
                this.qrCodes = codes;
            })
        } else {
            return this.barcodeReaderService.getAllQRCodes()
            .then((codes) => {
                this.gettingData = false;
                this.qrCodes = codes;
            });
        }          
    }

    setupQrChanges(): void {
        if (this.config.onlyFavourites === true) {
            this.favouritesService.onQrCodeChange.subscribe((codes) => {                
                this.qrCodes = codes;
            })
        } else {
            this.barcodeReaderService.onQrCodeChange.subscribe((codes) => {
                this.qrCodes = codes;
            });
        }
    }

    onRowClicked(code: CodeEntry) {
        let detailModal = this.modalController.create(QrCodeDetailPage, code);
        detailModal.present();
    }
}
