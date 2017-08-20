import { ColorPickerPage, ColorPickerParams, ColorPickerAction } from './../color-picker/color-picker';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing';

import { BarcodeDetailOptionsPage, BarcodeDetailOptions } from './../barcode-detail-options/barcode-detail-options';
import { BarcodeSaverService, BrowserService } from './../../shared';
import { BarcodeFormat } from "./barcode";

export class Barcode {

    constructor(
        public code: string,
        public elementType: string,
        public format: string,
        public color: string,
        public fontSize: number,
        public textPosition: 'top' | 'bottom',
        public backgroundColor: string,
    ) {

    }
}

@IonicPage()
@Component({
  selector: 'page-barcode-generator',
  templateUrl: 'barcode-generator.html',
})
export class BarcodeGeneratorPage {

    @ViewChild('barcodeElement') barcodeElement: any;    

    barcode = new Barcode('1234', 'img', 'CODE128', '#000000', 20, 'bottom', '#ffffff');
    barcodeTypes: string[] = this.initializeFormatTypes();

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private social: SocialSharing,
        private popoverController: PopoverController,
        private barcodeSaverService: BarcodeSaverService,
        private browser: BrowserService,
    ) {
        
    }

    shareClicked($event) {
        this.social.share(this.barcode.code, 'My Barcode', this.getBarcodeImageSrc());
    }

    moreClicked($event) {
        let morePopover = this.popoverController.create(BarcodeDetailOptionsPage);
        
        morePopover.onDidDismiss((option: BarcodeDetailOptions, role: string) => {
            if (option != null) {
                switch (option) {
                    case BarcodeDetailOptions.Download:
                        this.barcodeSaverService.saveBarcodeAsImage(this.getBarcodeImageSrc());
                        break;

                    case BarcodeDetailOptions.SearchGoogle:
                        this.browser.openGoogleSearch(this.barcode.code);
                        break;

                    case BarcodeDetailOptions.SearchUpcIndex:
                        this.browser.openInBrowser(`http://www.upcindex.com/${this.barcode.code}`);
                        break;

                    default:
                }
            }
        });

        morePopover.present({
            ev: $event
        });
    }

    onBarcodeColorPaletteClicked($event) {
        let params: ColorPickerParams = {
            barcode: this.barcode,
            action: ColorPickerAction.LineColor
        };

        let colorPopover = this.popoverController.create(ColorPickerPage, params);
        colorPopover.present();
    }

    onBarcodeBackgroundColorPaletteClicked($event) {
        let params: ColorPickerParams = {
            barcode: this.barcode,
            action: ColorPickerAction.BackgroundColor
        };

        let colorPopover = this.popoverController.create(ColorPickerPage, params);
        colorPopover.present();
    }

    initializeFormatTypes(): string[] {
        let types: string[] = [];

        for (let type in BarcodeFormat) {
            if (isNaN(Number(type))) {
                types.push(type);
            }
        }

        return types;
    }

    getBarcodeImageSrc(): string {
        let imgContainerElement = this.barcodeElement.bcElement.nativeElement;
        
        if (imgContainerElement.children.length > 0) {
            return imgContainerElement.children[0].src;
        }
        return undefined;
    }
}
