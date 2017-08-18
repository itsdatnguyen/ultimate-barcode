import { BrowserService } from './../../shared/browser.service';
import { AppRate } from '@ionic-native/app-rate';
import { StatisticsService } from './../../shared/statistics.service';
import { QrCodeHistoryPage } from './../qr-code-history/qr-code-history';
import { BarcodeHistoryPage } from './../barcode-history/barcode-history';
import { BarcodeReaderService } from './barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";

import { Utility } from "../../shared/utility";

@IonicPage()
@Component({
  selector: 'page-barcode-reader',
  templateUrl: 'barcode-reader.html',
})
export class BarcodeReaderPage {

    barcodeHistoryRoot = BarcodeHistoryPage;
    qrCodeHistoryRoot = QrCodeHistoryPage;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private barcodeScanner: BarcodeScanner,
        private alertController: AlertController,
        private browser: BrowserService,
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
        let confirmationAlert = this.alertController.create({
            title: 'UPC Found',
            message: `${result.text} was found. Would you like to search that result?`,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        
                    }
                },
                {
                    text: 'Search',
                    role: 'search',
                    handler: () => {
                        this.browser.openInBrowser(`http://www.upcindex.com/${result.text}`);
                    }
                }
            ]
        });    

        confirmationAlert.present();

        this.barcodeReaderService.storeBarcode({
            code: result.text,
            date: Date.now()
        });
    }

    handleQRCode(result: BarcodeScanResult): void {
        if (Utility.isValidUrl(result.text)) {
            let confirmationAlert = this.alertController.create({
                title: 'Url Link',
                message: `Would you like to open the link ${result.text}?`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            
                        }
                    },
                    {
                        text: 'Open Link',
                        role: 'open',
                        handler: () => {
                            this.browser.openInBrowser(result.text);                                           
                        },
                        
                    }
                ]
            });

            confirmationAlert.present();

        } else {
            let textAlert = this.alertController.create({
                title: 'Found Plain Text',
                message: result.text
            });

            textAlert.present();
        }     
        
        this.barcodeReaderService.storeQrCode({
            code: result.text,
            date: Date.now()
        });
    }

}
