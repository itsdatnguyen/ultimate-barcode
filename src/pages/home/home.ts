import { BarcodeDetailPage } from './../barcode-detail/barcode-detail';
import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    constructor(public navCtrl: NavController,
        private modalController: ModalController) {

    }

    ionViewDidLoad() {

    }
}
