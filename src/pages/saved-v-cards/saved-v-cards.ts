import { VCardDetailPage } from './../v-card-detail/v-card-detail';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { VCardEntry, VCardStorageService } from './../../shared/index';

@IonicPage()
@Component({
  selector: 'page-saved-v-cards',
  templateUrl: 'saved-v-cards.html',
})
export class SavedVCardsPage {

    vCards: VCardEntry[] = [];
    gettingData = true;

    constructor(
        private modal: ModalController,
        private vCardStorage: VCardStorageService,
    ) {
        
    }

    ionViewWillEnter() {
        this.vCardStorage.getAllVCards()
        .then((cards) => {
            this.gettingData = false;
            this.vCards = cards;
        })
        .catch((error) => {
            this.gettingData = false;
            console.error(error);
        })
    }

    onRowClicked(vCard: VCardEntry) {
        let detailModal = this.modal.create(VCardDetailPage, vCard);
        detailModal.present();
    }
}
