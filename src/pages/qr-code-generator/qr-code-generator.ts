import { CodeGeneratorOptionsPage, CodeGeneratorInfo, CodeGeneratorOption } from './../code-generator-options/code-generator-options';
import { ToastController } from 'ionic-angular';
import { QRCodeGeneratorService } from './qr-code-generator.service';
import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
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
        private popoverController: PopoverController,
        private qrService: QRCodeGeneratorService,
        private base64ToGallery: Base64ToGallery,
        private social: SocialSharing) {
    }

    @HostListener('window:resize', ['$event'])
    onResize($event) {
        this.setQRCodeSize($event.target.innerWidth / 1.5) ;
    }

    ionViewDidLoad() {
        this.qrService.getRememberedQRCodeInput().then((result) => {
            this.qrCode.value = result;
        });
        this.setQRCodeSize(window.innerWidth / 1.5);   
    }

    ionViewWillLeave() {
        if (this.qrCode.value !== '') {
            this.qrService.rememberQRCodeInput(this.qrCode.value);
        }
    }

    shareClicked($event) {
        let imageElement = this.getImageElement();
        this.social.share('Hello there!', 'This is my Qr Code.', imageElement.src);
    }

    moreClicked($event: UIEvent) {
        let morePopover = this.popoverController.create(CodeGeneratorOptionsPage);
        morePopover.present({
            ev: $event
        });
        
        morePopover.onWillDismiss((data: CodeGeneratorInfo, role: string) => {
            if(data != null) {
                switch(data.option) {
                    case CodeGeneratorOption.Download:
                        this.saveQRCodeAsImage().then((fileName) => {
                        let fileCreatedToast = this.toastController.create({
                            message: `Saved image ${fileName}`,
                            duration: 3000,
                            showCloseButton: true
                            
                        });

                        fileCreatedToast.present();
                    });
                    break;
                }       
            }
        });
    }

    saveQRCodeAsImage(): Promise<any> {
        // get image element
        let imageElement = this.getImageElement();

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

    getImageElement(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }

}
