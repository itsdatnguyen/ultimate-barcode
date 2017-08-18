import { ToastController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { SQLStorageService } from './../../shared/sql-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class QRCodeGeneratorService {

    QR_CODE_GENERATOR_INPUT_KEY = 'qrCodeGeneratorInput';

    constructor(
        private sqlStorageService: SQLStorageService,
        private base64ToGallery: Base64ToGallery,
        private toastController: ToastController) {

    }

    getRememberedQRCodeInput(): Promise<any> {
        return this.sqlStorageService.get(this.QR_CODE_GENERATOR_INPUT_KEY);
    }

    rememberQRCodeInput(codeInput: string): Promise<any> {
        return this.sqlStorageService.set(this.QR_CODE_GENERATOR_INPUT_KEY, codeInput);
    }

    saveQRCodeAsImage(base64Image: string): Promise<any> {
        // get image element
        return this.base64ToGallery.base64ToGallery(base64Image, {
            prefix: 'QRCode_'
        })
        .catch((rejected) => {
            console.error(`Error converting QR code to an image: ${rejected}`);
        })
        .then((value) => {
            let saveToast = this.toastController.create({
                message: `Saved Qr code at ${value}`,
                closeButtonText: 'Close',
                showCloseButton: true,
                duration: 2500
            });

            saveToast.present();
        })
    }
}