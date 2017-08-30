import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

export enum QrCodeDetailOption {
    Download,
    Open,
    OpenInBrowser,
    Search,
    Delete
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
        { displayName: 'Open', icon: 'open', option: QrCodeDetailOption.Open },
        { displayName: 'Open In Browser', icon: 'browsers', option: QrCodeDetailOption.OpenInBrowser },
        { displayName: 'Search', icon: 'search', option: QrCodeDetailOption.Search },
        { displayName: 'Delete', icon: 'trash', option: QrCodeDetailOption.Delete },
    ];

    constructor(
        public navParams: NavParams,
        private viewController: ViewController) {
    }

    ionViewWillEnter() {
        this.code = this.navParams.data.code;
    }

    optionClicked($event, option: QrCodeDetailOptionsInfo) {
        this.viewController.dismiss(option.option);
    }
}
