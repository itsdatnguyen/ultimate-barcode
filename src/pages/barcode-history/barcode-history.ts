import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform, NavParams } from 'ionic-angular';

import { AppReadyService, BarcodeReaderService, CodeEntry, FavouritesService, CodeListOptions } from './../../shared';
import { BarcodeDetailPage } from './../barcode-detail/barcode-detail';

@IonicPage()
@Component({
  selector: 'page-barcode-history',
  templateUrl: 'barcode-history.html',
})
export class BarcodeHistoryPage {

    barcodes: CodeEntry[] = [];
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
            this.barcodes = [
                { rowid: 0, code: 'This is pretty cool', format: 'CODE128', date: 49583049053, favourite: 0 },
                { rowid: 1, code: '45645645657', format: 'UPC', date: 49583044564456, favourite: 1 },
                { rowid: 2, code: 'https://itsdatnguyen.github.io/utility/welcome', format: 'CODE128', date: 49583049564053, favourite: 1 },
                { rowid: 3, code: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM', format: 'CODE128', date: 4958304845653, favourite: 0 },
            ];

        } else {
            this.appReadyService.isAppReady().subscribe(() => {
                this.initializeList();
                this.setupBarcodeChanges();
            });  
        }
    }

    ionViewWillLeave() {
        this.barcodes = [];
    }

    initializeList(): Promise<any> {
        if (this.config.onlyFavourites === true) {
            return this.favouritesService.getAllFavouriteBarcodes()
            .then((codes) => {
                this.gettingData = false;
                this.barcodes = codes;
            });
        } else {
            return this.barcodeReaderService.getAllBarcodes()
            .then((codes) => {
                this.gettingData = false;
                this.barcodes = codes;
            });
        }          
    }

    setupBarcodeChanges(): void {
        if (this.config.onlyFavourites === true) {
            this.favouritesService.onBarcodeChange.subscribe((codes) => {
                this.barcodes = codes;
            })
        } else {
            this.barcodeReaderService.onBarcodeChange.subscribe((codes) => {
                this.barcodes = codes;
            });
        }
    }

    onRowTapped(code: CodeEntry) {
        let detailModal = this.modalController.create(BarcodeDetailPage, code);
        detailModal.present();
    }
}
