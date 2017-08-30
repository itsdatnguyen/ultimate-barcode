import { VCardGeneratorService } from './../../shared/v-card-generator.service';
import { QrTextViewerPage } from './../qr-text-viewer/qr-text-viewer';
import { QrViewerPage } from './../qr-viewer/qr-viewer';
import { VCardEntry } from './../../shared/v-card-storage.service';
import { VCardDetailOptionsPage, VCardDetailOptions } from './../v-card-detail-options/v-card-detail-options';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-v-card-detail',
  templateUrl: 'v-card-detail.html',
})
export class VCardDetailPage {

    vCard: VCardEntry;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private vCardGenerator: VCardGeneratorService,
        private popover: PopoverController,
        private modal: ModalController,
        
        ) {
    }

    ionViewWillLoad() {
        this.vCard = this.navParams.data;
        console.log(this.vCard);
    }

    moreClicked($event) {
        let morePopover = this.popover.create(VCardDetailOptionsPage);

        morePopover.onWillDismiss((data: VCardDetailOptions) => {
            switch (data) {
                case VCardDetailOptions.ViewQrCode:
                

                let qrCodeModal = this.modal.create(QrViewerPage, 
                {
                    //qrCode: {
                    //    value: this.vCard.getFormattedString()
                    //}
                });
                qrCodeModal.present();
                break;

            case VCardDetailOptions.ViewRawData:
                let qrCodeTextModal = this.modal.create(QrTextViewerPage, 
                {
                    //text: this.vCard.getFormattedString()
                });
                qrCodeTextModal.present();
                break;

                default:
            }
        });
    }
}
