import { AdService } from './../../shared/ad.service';
import { BrowserService } from './../../shared/browser.service';
import { QrCodeDetailOptionsPage, QrCodeDetailOption } from './../qr-code-detail-options/qr-code-detail-options';
import { QRCodeGeneratorService } from './qr-code-generator.service';
import { Component, HostListener, ViewChild } from '@angular/core';
import { IonicPage, PopoverController } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';

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

    text = '';

    qrCode = new QRCode('', 150);

    constructor(
        private qrService: QRCodeGeneratorService,
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

    ionViewDidLoad() {
        this.qrService.getRememberedQRCodeInput().then((result) => {
            this.text = result;
            this.qrCode.value = result;
        });
        this.setQRCodeSize(window.innerWidth / 1.5);   
    }

    ionViewWillLeave() {
        if (this.qrCode.value !== '') {
            this.qrService.rememberQRCodeInput(this.qrCode.value);
        }
    }

    generateQrCodeClicked($event) {
        this.qrCode.value = this.text;
    }

    shareClicked($event) {
        let imageElement = this.getQrImage();
        this.social.share('Hello there!', 'This is my Qr Code.', imageElement.src)
        .then(() => {
            this.adService.showInterstitialBanner()
        });
    }

    moreClicked($event: UIEvent) {
        let morePopover = this.popoverController.create(QrCodeDetailOptionsPage);
        
        morePopover.onWillDismiss((option: QrCodeDetailOption, role: string) => {
            if(option != null) {
                switch(option) {
                    case QrCodeDetailOption.Download:
                        this.qrService.saveQRCodeAsImage(this.getQrImage().src);               
                        break;
                    
                    case QrCodeDetailOption.Open:
                        this.browser.openInBrowser(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialBanner();
                        });
                        break;
                    
                    case QrCodeDetailOption.OpenInBrowser: 
                        this.browser.openInNativeBrowser(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialBanner();
                        });
                        break;
                    
                    case QrCodeDetailOption.Search:
                        this.browser.openGoogleSearch(this.qrCode.value)
                        .then((value) => {
                            this.adService.showInterstitialBanner();
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
