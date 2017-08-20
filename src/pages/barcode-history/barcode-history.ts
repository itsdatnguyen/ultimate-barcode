import { AppReadyService } from './../../shared/app-ready.service';
import { BarcodeDetailPage } from './../barcode-detail/barcode-detail';
import { BarcodeReaderService, CodeEntry } from './../barcode-reader/barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-barcode-history',
  templateUrl: 'barcode-history.html',
})
export class BarcodeHistoryPage {

    barcodes: CodeEntry[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public modalController: ModalController,
        private barcodeReaderService: BarcodeReaderService,
        private appReadyService: AppReadyService
    ) {
    }

    ionViewDidLoad() {
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
