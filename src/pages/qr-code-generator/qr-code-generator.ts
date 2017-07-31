import { ToastController } from 'ionic-angular';
import { QRCodeGeneratorService } from './qr-code-generator.service';
import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

import { Utility } from "../../shared/utility";

export class QRCode {
    constructor(public value: string,
        public size: number) { }
}

@IonicPage()
@Component({
  selector: 'page-qr-code-generator',
  templateUrl: 'qr-code-generator.html',
})
export class QrCodeGeneratorPage {

    @ViewChild('qrCodeElement') qrCodeElement: any;

    qrCode = new QRCode('', 150);

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private toastController: ToastController,
        private qrService: QRCodeGeneratorService,
        private base64ToGallery: Base64ToGallery) {
    }

    @HostListener('window:resize', ['$event'])
    onResize($event) {
        this.setQRCodeSize($event.target.innerWidth / 1.5) ;
    }

    ionViewDidLoad() {
        this.qrService.getRememberedQRCodeInput().then((result: string) => {
            this.qrCode.value = result;
        });
        this.setQRCodeSize(window.innerWidth / 1.5);   
    }

    ionViewWillLeave() {
        if (this.qrCode.value !== '') {
            this.qrService.rememberQRCodeInput(this.qrCode.value);
        }
    }

    downloadImageClicked($event) {
        this.saveQRCodeAsImage().then((fileName) => {
            let fileCreatedToast = this.toastController.create({
                message: `Saved image ${fileName}`,
                duration: 3000,
                showCloseButton: true
            });

            fileCreatedToast.present();
        });
    }

    saveQRCodeAsImage(): Promise<any> {
        // get image element
        let imageElement = this.qrCodeElement.elementRef.nativeElement.children[0];

        return this.base64ToGallery.base64ToGallery(imageElement.src, {
            prefix: 'QRCode_'
        })
        .catch((rejected) => {
            console.error(`Error converting QR code to an image: ${rejected}`);
        });
    }

    setQRCodeSize(size: number): void {
        this.qrCode.size = Utility.clamp(size, 0, 500);
    }

}
