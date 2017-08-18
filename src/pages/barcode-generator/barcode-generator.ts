import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

export class Barcode {

    constructor(
        public code: string,
        public elementType: string,
        public format: string) {

    }
}

@IonicPage()
@Component({
  selector: 'page-barcode-generator',
  templateUrl: 'barcode-generator.html',
})
export class BarcodeGeneratorPage {

    barcode = new Barcode('', 'img', 'UPC');

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        
    }

    ionViewDidLoad() {
        
    }

}
