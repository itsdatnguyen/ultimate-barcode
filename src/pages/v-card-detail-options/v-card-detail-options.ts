import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

export enum VCardDetailOptions {
    ViewQrCode,
    ViewRawData,
}

export interface VCardDetailOptionsDetail {
    displayName: string,
    icon: string;
    option: VCardDetailOptions;
}

@IonicPage()
@Component({
  selector: 'page-v-card-detail-options',
  templateUrl: 'v-card-detail-options.html',
})
export class VCardDetailOptionsPage {

    options: VCardDetailOptionsDetail[] = [
        { displayName: 'View Qr Code', icon: 'qr-scanner', option: VCardDetailOptions.ViewQrCode },
        { displayName: 'View Raw Data', icon: 'code', option: VCardDetailOptions.ViewRawData },
    ]

    constructor(private viewController: ViewController) {
        
    }

    optionClicked(option: VCardDetailOptionsDetail) {
        this.viewController.dismiss(option.option);
    }
}
