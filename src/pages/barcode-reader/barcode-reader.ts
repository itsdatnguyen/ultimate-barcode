import { QrCodeHistoryPage } from './../qr-code-history/qr-code-history';
import { BarcodeHistoryPage } from './../barcode-history/barcode-history';
import { BarcodeReaderService, CodeEntry } from './barcode-reader.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";
import { BrowserTab } from "@ionic-native/browser-tab";

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
        private browserTab: BrowserTab,
        private barcodeReaderService: BarcodeReaderService) {
        
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
                        this.openUrl(`http://www.upcindex.com/${result.text}`);
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
        if (this.isValidUrl(result.text)) {
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
                            this.openUrl(result.text);                                            
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

    /**
     * Try to open the url using the native browser tab. If unsuccessful, then open using the default browser
     * @param url The url string to go to
     */
    openUrl(url: string): Promise<any> {
        return this.browserTab.isAvailable().then((isAvailable: boolean) => {
            if (isAvailable) {
                this.browserTab.openUrl(url);
            } else {
                window.open(url, '_system');
            }
        })
        .catch((rejected) => {
            console.error(`Error could not use native browser tab: ${rejected}`);
        })
    }

    isValidUrl(url: string): boolean {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    }
}
