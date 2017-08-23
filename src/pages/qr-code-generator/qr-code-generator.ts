import { ImageSaverService } from './../../shared/image-saver.service';
import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

import { AdService, BrowserService } from './../../shared';
import { QrCodeDetailOptionsPage, QrCodeDetailOption } from './../qr-code-detail-options/qr-code-detail-options';
import { QRCodeGeneratorService } from './qr-code-generator.service';
import { QRCode } from "./qr-code";
import { Utility } from "../../shared/utility";


@IonicPage()
@Component({
  selector: 'page-qr-code-generator',
  templateUrl: 'qr-code-generator.html',
})
export class QrCodeGeneratorPage {

    @ViewChild('qrCodeElement') qrCodeElement: any;

    userInput = '';

    qrCode = new QRCode('', 150);

    constructor(
        private qrService: QRCodeGeneratorService,
        private imageSaverService: ImageSaverService,
        private browser: BrowserService,
        private popoverController: PopoverController,
        private social: SocialSharing,
        private adService: AdService,
    ) {
    }

    @HostListener('window:resize', ['$event'])
    onResize($event) {
        this.setQRCodeSize($event.target.innerWidth / 1.5) ;
    }

    ionViewWillEnter() {
        this.qrService.getRememberedQRCodeInput().then((code: QRCode) => {
            if (code != null) {
                this.userInput = code.value;
                this.qrCode = code;
            }
        });
        this.setQRCodeSize(window.innerWidth / 1.5);   
    }

    ionViewWillLeave() {
        if (this.userInput !== '') {
            this.qrCode.value = this.userInput;
            this.qrService.rememberQRCodeInput(this.qrCode);
        }
    }

    generateQrCodeClicked($event) {
        this.qrCode.value = this.userInput;
    }

    shareClicked($event) {
        let imageElement = this.getQrImage();
        this.social.share('Hello there!', 'This is my Qr Code.', imageElement.src)
        .then(() => {
            this.adService.showInterstitialAd();
        });
    }

    moreClicked($event: UIEvent) {
        let morePopover = this.popoverController.create(QrCodeDetailOptionsPage);
        
        morePopover.onWillDismiss((option: QrCodeDetailOption, role: string) => {
            if(option != null) {
                switch(option) {
                    case QrCodeDetailOption.Download:
                        this.imageSaverService.saveBase64ToGallery({
                            base64: this.getQrImage().src,
                            filePrefix: 'QrCode_',
                            description: 'Qr Code'
                        });
                        break;
                    
                    case QrCodeDetailOption.Open:
                        this.browser.openInBrowser(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;
                    
                    case QrCodeDetailOption.OpenInBrowser: 
                        this.browser.openInNativeBrowser(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;
                    
                    case QrCodeDetailOption.Search:
                        this.browser.openGoogleSearch(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialAd();
                        });
                        break;
                }       
            }
        });

        morePopover.present({
            ev: $event
        });       
    }

    setQRCodeSize(size: number): void {
        this.qrCode.size = Utility.clamp(size, 0, 500);
    }

    getQrImage(): any {
        return this.qrCodeElement.elementRef.nativeElement.children[0];
    }

}
