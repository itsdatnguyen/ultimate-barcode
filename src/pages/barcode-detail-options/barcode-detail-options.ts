import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

export enum BarcodeDetailOptions {
    Download,
    SearchUpcIndex,
    SearchGoogle,
}

export interface BarcodeDetailOptionInfo {
    displayName: string;
    icon: string;
    option: BarcodeDetailOptions;
}

@IonicPage()
@Component({
  selector: 'page-barcode-detail-options',
  templateUrl: 'barcode-detail-options.html',
})
export class BarcodeDetailOptionsPage {

    options: BarcodeDetailOptionInfo[] = [
        { displayName: 'Download', icon: 'download', option: BarcodeDetailOptions.Download },
        { displayName: 'Search Google', icon: 'search', option: BarcodeDetailOptions.SearchGoogle },
        { displayName: 'Search UPC Index', icon: 'search', option: BarcodeDetailOptions.SearchUpcIndex }
    ];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController,
    ) {

    }

    optionClicked($event, option: BarcodeDetailOptionInfo) {
        this.viewController.dismiss(option.option);
    }
}
