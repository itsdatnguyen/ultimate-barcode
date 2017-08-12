import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { QrCodeDetailPage } from './../qr-code-detail/qr-code-detail';
import { BarcodeReaderService, CodeEntry } from './../barcode-reader/barcode-reader.service';

@IonicPage()
@Component({
    selector: 'page-qr-code-history',
    templateUrl: 'qr-code-history.html',
})
export class QrCodeHistoryPage {

    qrCodes: CodeEntry[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        public modalController: ModalController,
        private barcodeReaderService: BarcodeReaderService,) {
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

    onRowClicked(code: CodeEntry) {
        let detailModal = this.modalController.create(QrCodeDetailPage, code);
        detailModal.present();
    }

    updateQrCodes(results: any): void {                 
        let codes = [];
        let length = results.rows.length;
        for(let i = 0; i < length; i++) {
            let object = results.rows.item(i);
            codes.push(object);
        }

        this.qrCodes = codes;
    }
}
