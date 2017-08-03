import { BarcodeReaderService } from './../barcode-reader/barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-barcode-history',
  templateUrl: 'barcode-history.html',
})
export class BarcodeHistoryPage {

    barcodes = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private barcodeReaderService: BarcodeReaderService) {
    }

    ionViewDidLoad() {
        this.barcodeReaderService.createBarcodeTable().then((value) => {
            this.barcodeReaderService.getAllBarcodes().then((results) => {
                this.updateBarcodes(results);
            });
        });
        this.barcodeReaderService.onBarcodeChange.subscribe((results) => {
            this.updateBarcodes(results);
        });
    }

    updateBarcodes(results: any): void {
        let codes = [];
        let length = results.rows.length;

        for(let i = 0; i < length; i++) {
            let object = results.rows.item(i);
            codes.push(object);
        }

        this.barcodes = codes;
    }
}
