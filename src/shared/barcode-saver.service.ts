import { ToastController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { Injectable } from '@angular/core';

@Injectable()
export class BarcodeSaverService {

    constructor(
        private base64ToGallery: Base64ToGallery,
        private toastController: ToastController,
    ) {

    }

    saveBarcodeAsImage(base64Image: string): Promise<any> {
        // get image element
        return this.base64ToGallery.base64ToGallery(base64Image, {
            prefix: 'Barcode_'
        })
        .catch((rejected) => {
            console.error(`Error converting barcode to an image: ${rejected}`);
        })
        .then((value) => {
            let saveToast = this.toastController.create({
                message: `Saved Barcode at ${value}`,
                closeButtonText: 'Close',
                showCloseButton: true,
                duration: 4000
            });

            saveToast.present();
        })
    }
}