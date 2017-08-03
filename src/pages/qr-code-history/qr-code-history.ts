import { BarcodeReaderService } from './../barcode-reader/barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'page-qr-code-history',
    templateUrl: 'qr-code-history.html',
})
export class QrCodeHistoryPage {

    qrCodes = [];

    constructor(
            public navCtrl: NavController, 
            public navParams: NavParams,
            private barcodeReaderService: BarcodeReaderService) {
    }

    ionViewDidLoad() {
        this.barcodeReaderService.createQRCodeTable().then((value) => {
            this.barcodeReaderService.getAllQRCodes().then((results) => {   
                this.updateQrCodes(results);
            });        
        });

        this.barcodeReaderService.onQrCodeChange.subscribe((results) => {
            this.updateQrCodes(results);
        });
    }

    updateQrCodes(results: any): void {                 
        let codes = [];
        let length = results.rows.length;
        for(let i = 0; i < length; i++) {
            let object = results.rows.item(i);
            console.log(object);
            codes.push(object);
        }

        this.qrCodes = codes;
    }
}
