import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';

import { VCardGeneratorOptions } from './options';

export interface VCardGeneratorOptionsDetail {
    displayName: string,
    icon: string;
    option: VCardGeneratorOptions;
}

@IonicPage()
@Component({
  selector: 'page-v-card-generator-options',
  templateUrl: 'v-card-generator-options.html',
})
export class VCardGeneratorOptionsPage {

    options: VCardGeneratorOptionsDetail[] = [
        { displayName: 'Save', icon: 'add', option: VCardGeneratorOptions.Save },
        { displayName: 'View Qr Code', icon: 'qr-scanner', option: VCardGeneratorOptions.ViewQrCode },
        { displayName: 'View Raw Data', icon: 'code', option: VCardGeneratorOptions.ViewRawData },
        { displayName: 'Reset vCard', icon: 'trash', option: VCardGeneratorOptions.ResetVCard },
    ]

    constructor(private viewController: ViewController) {
        
    }

    optionClicked(option: VCardGeneratorOptionsDetail) {
        this.viewController.dismiss(option.option);
    }
}
