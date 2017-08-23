import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

export interface SavedImage {
    base64: string;
    filePrefix: string;
    description: string;
}

@Injectable()
export class ImageSaverService {

    constructor(
        private base64ToGallery: Base64ToGallery,
        private toastController: ToastController,
        private androidPermissions: AndroidPermissions,
    ) {
        
    }

    saveBase64ToGallery(data: SavedImage): Promise<any> {
        return this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
        .then((permission) => {
            if (permission.hasPermission === true) {               
                return this.saveImage(data);

            } else {
                return this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
                .then((permission) => {
                    if (permission.hasPermission === true) {
                        return this.saveImage(data);

                    } else {
                        return this.displayErrorToast();
                    }
                });   
            }         
        })
        .catch((rejected) => {
            console.error(`Failed to gain permissions: ${rejected}`);
        })     
    }

    private saveImage(data: SavedImage): Promise<any> {
        return this.base64ToGallery.base64ToGallery(data.base64, {
            prefix: data.filePrefix,
            mediaScanner: true
        })  
        .then((value) => {
            let saveToast = this.toastController.create({
                message: `Saved ${data.description} at ${value}`,
                closeButtonText: 'Close',
                showCloseButton: true,
                duration: 4000
            });

            saveToast.present();
        })
        .catch((rejected) => {
            this.displayErrorToast();
            console.error(`Failed to save from base64 to gallery: ${rejected}`);
        })
    }

    private displayErrorToast(): Promise<any> {
        let errorToast = this.toastController.create({
            message: 'Failed to save. Try enabling app permissions.',
            closeButtonText: 'Close',
            showCloseButton: true,
            duration: 3000
        });

        return errorToast.present();
    }
}