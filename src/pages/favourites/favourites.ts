import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CodeListOptions } from './../../shared';
import { QrCodeHistoryPage } from './../qr-code-history/qr-code-history';
import { BarcodeHistoryPage } from './../barcode-history/barcode-history';

@IonicPage()
@Component({
  selector: 'page-favourites',
  templateUrl: 'favourites.html',
})
export class FavouritesPage {

    listConfig: CodeListOptions = {
        onlyFavourites: true,
    }

    barcodeFavouritesRoot = BarcodeHistoryPage;
    qrCodeFavouritesRoot = QrCodeHistoryPage;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

    }
}
