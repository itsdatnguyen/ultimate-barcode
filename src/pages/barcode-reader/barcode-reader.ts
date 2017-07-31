import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScanResult } from "@ionic-native/barcode-scanner";

@IonicPage()
@Component({
  selector: 'page-barcode-reader',
  templateUrl: 'barcode-reader.html',
})
export class BarcodeReaderPage {

    constructor(public navCtrl: NavController, public navParams: NavParams,
        private barcodeScanner: BarcodeScanner,
        private alertController: AlertController) {
        
    }

    ionViewDidLoad() {
        this.beginScan();
    }

    beginScan(): void {
        this.barcodeScanner.scan({
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
        } else {
            this.navCtrl.pop();
        }
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
                            window.open(result.text, '_system');                        
                        },
                        
                    }
                ]
            });
            confirmationAlert.didLeave.subscribe((value) => {
                this.beginScan();
            })

            confirmationAlert.present();

        } else {
            let textAlert = this.alertController.create({
                title: 'Found Plain Text',
                message: result.text
            });

            textAlert.didLeave.subscribe((value) => {
                this.beginScan();
            })

            textAlert.present();
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
                        window.open(`http://www.upcindex.com/${result.text}`, '_system');
                    }
                }
            ]
        });    

        confirmationAlert.didLeave.subscribe((value) => {
            this.beginScan();
        });

        confirmationAlert.present();   
    }

    isValidUrl(url: string): boolean {
        return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(url);
    }

}
