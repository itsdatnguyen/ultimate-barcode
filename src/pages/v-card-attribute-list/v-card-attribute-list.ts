import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { VCardSelection, CardList } from "./attribute-list";

@IonicPage()
@Component({
  selector: 'page-v-card-attribute-list',
  templateUrl: 'v-card-attribute-list.html',
})
export class VCardAttributeListPage {

    vCardAttributes: string[] = [];

    list: VCardSelection[] = [];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController,
    ) {

    }

    ionViewWillEnter() {
        this.vCardAttributes = this.navParams.data;     
        this.list = CardList.filter((listItem) => this.vCardAttributes.indexOf(listItem.selector) === -1)
    }

    onRowTapped(attribute) {
        this.viewController.dismiss(attribute);
    }

    close() {
        this.viewController.dismiss();
    }
}
