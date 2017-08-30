import { CodeListOptions } from './../../shared/list';
import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';

import { AppRate } from '@ionic-native/app-rate';
import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";

import { StatisticsService, BarcodeParserService, BarcodeReaderService, CodeEntry } from './../../shared';
import { QrCodeDetailPage } from './../qr-code-detail/qr-code-detail';
import { BarcodeDetailPage } from './../barcode-detail/barcode-detail';
import { QrCodeHistoryPage } from './../qr-code-history/qr-code-history';
import { BarcodeHistoryPage } from './../barcode-history/barcode-history';


@IonicPage()
@Component({
  selector: 'page-barcode-reader',
  templateUrl: 'barcode-reader.html',
})
export class BarcodeReaderPage {

    listConfig: CodeListOptions = {
        onlyFavourites: false,
    }

    barcodeHistoryRoot = BarcodeHistoryPage;
    qrCodeHistoryRoot = QrCodeHistoryPage;

    constructor(
        private barcodeParserService: BarcodeParserService,
        private barcodeScanner: BarcodeScanner,
        private modalController: ModalController,
        private barcodeReaderService: BarcodeReaderService,
        private statisticsService: StatisticsService,
        private appRate: AppRate) {
        
    }

    ionViewWillLeave() {
        this.statisticsService.hasRatedApp.then((rated) => {
            if (rated == null) {
                this.statisticsService.numberOfScans.then((scans) => {
                    if (scans > 2) {
                        this.appRate.promptForRating(true);
                        this.appRate.preferences.callbacks.onButtonClicked = () => {
                            this.statisticsService.userSuccessfullyRatedApp();
                        }
                    }
                });
            }
        });
    }

    onBeginScan($event) {
        this.beginScan();
    }

    beginScan(): Promise<any> {
        return this.barcodeScanner.scan({
            showTorchButton: true,
            showFlipCameraButton: true,
            resultDisplayDuration: 0
            
        }).then((data: BarcodeScanResult) => {
            this.handleScan(data);
            this.statisticsService.incrementNumberOfScans();

        })
        .catch((rejected) => {
            console.error(`Error loading barcode scanner: ${rejected}`);
        });
    }

    handleScan(result: BarcodeScanResult): void {
        if (!result.cancelled) {
            switch (result.format) {
                case 'QR_CODE':
                    this.handleQRCode(result);
                    break;

                default:
                    this.handleUPCCode(result);
            }
        }   
    }

    handleUPCCode(result: BarcodeScanResult): void {
        let entry: CodeEntry = {
            rowid: -1,
            code: result.text,
            format: result.format,
            date: Date.now(),
        };

        entry = this.barcodeParserService.sanitizeCodeEntry(entry);

        this.barcodeReaderService.storeBarcode(entry)
        .then((insertMetadata) => {
            return this.barcodeReaderService.getBarcode(insertMetadata.insertId);           
        })
        .then((code) => {
            let barcodeModal = this.modalController.create(BarcodeDetailPage, code);
            return barcodeModal.present();
        });     
    }

    handleQRCode(result: BarcodeScanResult): void {    
        let entry: CodeEntry = {
            rowid: -1,
            code: result.text,
            format: result.format,
            date: Date.now(),
        };

        entry = this.barcodeParserService.sanitizeCodeEntry(entry);

        this.barcodeReaderService.storeQrCode(entry)
        .then((insertMetadata) => {
            return this.barcodeReaderService.getQrCode(insertMetadata.insertId);           
        })
        .then((code) => {
            let qrModal = this.modalController.create(QrCodeDetailPage, code);
            return qrModal.present();
        });
    }

}
