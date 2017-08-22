import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

export enum BarcodeDetailOptions {
    Download,
    Open,
    OpenInBrowser,
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
        { displayName: 'Open', icon: 'open', option: BarcodeDetailOptions.Open },
        { displayName: 'Open In Browser', icon: 'browsers', option: BarcodeDetailOptions.OpenInBrowser },
        { displayName: 'Search Google', icon: 'search', option: BarcodeDetailOptions.SearchGoogle },
        { displayName: 'Search UPC Index', icon: 'search', option: BarcodeDetailOptions.SearchUpcIndex }
    ];

    constructor(private viewController: ViewController) {

    }

    optionClicked($event, option: BarcodeDetailOptionInfo) {
        this.viewController.dismiss(option.option);
    }
}
