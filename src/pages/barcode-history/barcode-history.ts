import { AppReadyService } from './../../shared/app-ready.service';
import { BarcodeDetailPage } from './../barcode-detail/barcode-detail';
import { BarcodeReaderService, CodeEntry } from './../barcode-reader/barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-barcode-history',
  templateUrl: 'barcode-history.html',
})
export class BarcodeHistoryPage {

    barcodes: CodeEntry[] = [];

    constructor(
        public modalController: ModalController,
        private platform: Platform,
        private barcodeReaderService: BarcodeReaderService,
        private appReadyService: AppReadyService
    ) {
    }

    ionViewWillEnter() {
        if (this.platform.is('core')) {
            this.barcodes = [
                { code: 'This is pretty cool', format: 'CODE128', date: 49583049053 },
                { code: '45645645657', format: 'UPC', date: 49583044564456 },
                { code: 'https://itsdatnguyen.github.io/utility/welcome', format: 'CODE128', date: 49583049564053 },
                { code: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM', format: 'CODE128', date: 4958304845653 },
            ];

        } else {
            this.appReadyService.isAppReady().subscribe((value) => {
                this.barcodeReaderService.createBarcodeTable().then((value) => {
                    this.barcodeReaderService.getAllBarcodes().then((results) => {
                        this.updateBarcodes(results);
                    });
                });
                this.barcodeReaderService.onBarcodeChange.subscribe((results) => {
                    this.updateBarcodes(results);
                });
            });  
        }
    }

    updateBarcodes(results: any): void {
        let codes = [];
        
        for (let i = results.rows.length - 1; i >= 0; i--) {
            let object = results.rows.item(i);
            codes.push(object);
        }

        this.barcodes = codes;
    }

    onRowTapped(code: CodeEntry) {
        let detailModal = this.modalController.create(BarcodeDetailPage, code);
        detailModal.present();
    }
}
