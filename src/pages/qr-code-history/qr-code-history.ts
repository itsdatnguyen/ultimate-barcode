import { Component } from '@angular/core';
import { IonicPage, ModalController, Platform } from 'ionic-angular';

import { QrCodeDetailPage } from './../qr-code-detail/qr-code-detail';
import { BarcodeReaderService, CodeEntry } from './../barcode-reader/barcode-reader.service';
import { AppReadyService } from "../../shared/index";

@IonicPage()
@Component({
    selector: 'page-qr-code-history',
    templateUrl: 'qr-code-history.html',
})
export class QrCodeHistoryPage {

    qrCodes: CodeEntry[] = [];

    constructor(
        public modalController: ModalController,
        private platform: Platform,
        private barcodeReaderService: BarcodeReaderService,
        private appReadyService: AppReadyService
    ) {
    }

    ionViewWillEnter() {
        if (this.platform.is('core')) {
            this.qrCodes = [
                { code: 'https://itsdatnguyen.github.io/utility/qr-code', format: 'QR_CODE', date: 3453456454534},
                { code: 'This is pretty cool', format: 'QR_CODE', date: 45645645645},
                { code: 'https://www.youtube.com/watch?v=hY7m5jjJ9mM', format: 'QR_CODE', date: 235234564235},
                { code: 'https://www.instagram.com/angievarona/?hl=en', format: 'QR_CODE', date: 6456456456564},
            ];
        } else {         
            this.appReadyService.isAppReady().subscribe((value) => {
                this.barcodeReaderService.createQRCodeTable().then((value) => {
                    this.barcodeReaderService.getAllQRCodes().then((results) => {   
                        this.updateQrCodes(results);
                    });        
                });
                
                this.barcodeReaderService.onQrCodeChange.subscribe((results) => {
                    this.updateQrCodes(results);
                });
            });
        }
    }

    onRowClicked(code: CodeEntry) {
        let detailModal = this.modalController.create(QrCodeDetailPage, code);
        detailModal.present();
    }

    updateQrCodes(results: any): void {                 
        let codes = [];
        for (let i = results.rows.length - 1; i >= 0; i--) {
            let object = results.rows.item(i);
            codes.push(object);
        }

        this.qrCodes = codes;
    }
}
