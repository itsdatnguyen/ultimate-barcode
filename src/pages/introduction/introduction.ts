import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { BarcodeReaderPage } from './../barcode-reader/barcode-reader';
import { IntroductionService } from "../../shared/index";

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

    supportedScans: string[] = [
        'CODE 128',
        'CODE 39',
        'UPC',
        'EAN8',
        'ITF14',
    ];

    supportedGenerators: string[] = [
        'CODE128',
        'UPC',
        'EAN',
        'QR',
        'ITF14',
    ];

    constructor(
        public navCtrl: NavController, 
        private introductionService: IntroductionService) {

    }

    exitIntroduction() {
        this.introductionService.setIntroductionStatus(true);
        this.introductionService.exitedIntroduction();
        this.navCtrl.setRoot(BarcodeReaderPage);
        this.navCtrl.popToRoot();
    }
}
