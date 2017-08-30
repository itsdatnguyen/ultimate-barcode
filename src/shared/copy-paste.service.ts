import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

import { Clipboard } from '@ionic-native/clipboard';

export interface CopyConfig {
    askUser: boolean;
}

@Injectable()
export class CopyPasteService {
    constructor(
        private clipboard: Clipboard,
        private alert: AlertController,
        private toast: ToastController,
    ) {

    }

    copy(text: string, config: CopyConfig): Promise<any> {
        if (config.askUser === true) {
            let copyAlert = this.alert.create({
                title: 'Copy',
                message: 'Do you want to copy this text?',
                buttons: [
                    {
                        text: 'No'
                    },
                    {
                        text: 'Yes',
                        handler: () => {
                            this.copyText(text);
                        }
                    }
                ]
            });

            return copyAlert.present();
        } else {
            return this.copyText(text);
        }  
    }

    private copyText(text: string): Promise<any> {
        return this.clipboard.copy(text).then((value) => {
            let copySuccessToast = this.toast.create({
                message: 'Text Copied!',
                duration: 2000
            });

            return copySuccessToast.present();
        });
    }
}