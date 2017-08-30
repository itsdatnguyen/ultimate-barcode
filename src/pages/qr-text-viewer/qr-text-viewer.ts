import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController } from 'ionic-angular';

import { CopyPasteService } from './../../shared';

@IonicPage()
@Component({
  selector: 'page-qr-text-viewer',
  templateUrl: 'qr-text-viewer.html',
})
export class QrTextViewerPage {

    text: string = '';

    constructor(
        private copyPaste: CopyPasteService,
        private viewController: ViewController,
        public navParams: NavParams,
    ) {
    }

    ionViewWillLoad() {
        this.text = this.navParams.data.text;
    }

    close() {
        this.viewController.dismiss();
    }

    textPressed($event) {
        this.copyPaste.copy(this.text, {
            askUser: true
        });
    }
}
