import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export enum BarcodeDetailOptions {
    SearchUpcIndex,
    SearchGoogle
}

@IonicPage()
@Component({
  selector: 'page-barcode-detail-options',
  templateUrl: 'barcode-detail-options.html',
})
export class BarcodeDetailOptionsPage {

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BarcodeDetailOptionsPage');
    }
}
