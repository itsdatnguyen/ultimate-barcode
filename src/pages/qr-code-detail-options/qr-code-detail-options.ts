import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

export enum QrCodeDetailOption {
    Download,
    OpenUrl,
    Search
}

export interface QrCodeDetailOptionsInfo {
    displayName: string;
    icon: string;
    option: QrCodeDetailOption;
}

@IonicPage()
@Component({
  selector: 'page-qr-code-detail-options',
  templateUrl: 'qr-code-detail-options.html',
})
export class QrCodeDetailOptionsPage {

    code: string = '';

    options: QrCodeDetailOptionsInfo[] = [
        { displayName: 'Download', icon: 'download', option: QrCodeDetailOption.Download },
        { displayName: 'Open Url', icon: 'browsers', option: QrCodeDetailOption.OpenUrl },
        { displayName: 'Search', icon: 'search', option: QrCodeDetailOption.Search }
    ];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController) {
    }

    ionViewDidLoad() {
        this.code = this.navParams.data.code;
    }

    optionClicked($event, option: QrCodeDetailOptionsInfo) {
        this.viewController.dismiss(option.option);
    }
}
