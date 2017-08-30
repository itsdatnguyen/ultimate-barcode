import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";

import * as _ from 'lodash';

import { VCardStorageService, VCardGeneratorService } from './../../shared/index';
import { VCardGeneratorMemoryService } from './v-card-generator-memory.service';

import { QrTextViewerPage } from './../qr-text-viewer/qr-text-viewer';
import { QrViewerPage } from './../qr-viewer/qr-viewer';
import { VCardGeneratorOptionsPage } from './../v-card-generator-options/v-card-generator-options';
import { VCardAttributeListPage } from './../v-card-attribute-list/v-card-attribute-list';
import { VCardSelection, CardList } from "../v-card-attribute-list/attribute-list";
import { VCardGeneratorOptions } from "../v-card-generator-options/options";

@IonicPage()
@Component({
  selector: 'page-v-card-generator',
  templateUrl: 'v-card-generator.html',
})
export class VCardGeneratorPage {

    vCard: any;
    vCardForm: FormGroup;
    gettingData: boolean = true;

    constructor(
        private fb: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams,
        private alert: AlertController,
        private modal: ModalController,
        private popover: PopoverController,
        private toast: ToastController,
        private vCardService: VCardGeneratorService,
        private vCardMemory: VCardGeneratorMemoryService,
        private vCardStorage: VCardStorageService,
    ) {
        this.createForm();
        
    }

    createForm(): void {
        this.vCardForm = this.fb.group({});     
    }

    ionViewWillEnter() {
        if (Object.keys(this.navParams.data).length > 0) {
            this.gettingData = false;

        } else {
            this.vCardMemory.getVCard()
            .then((vCard: any) => {
                if (vCard != null) {
                    this.vCard = this.vCardService.createVCard();
                    this.repopulateCardForm(vCard);
                } else {
                    this.vCard = this.vCardService.createVCard();
                }

                this.gettingData = false;
            })
            .catch((error) => {
                this.gettingData = false;
            });
        }      
    }

    ionViewWillLeave() {
        this.vCardMemory.setVCard(this.vCard);
    }

    moreClicked($event) {
        let morePopover = this.popover.create(VCardGeneratorOptionsPage);

        morePopover.onWillDismiss((data: VCardGeneratorOptions) => {
            switch (data) {

                case VCardGeneratorOptions.Save:
                    if (this.isValidVCard()) {
                        this.vCardStorage.addVCard(JSON.stringify(this.vCard), Date.now())
                        .then(() => {                         
                            let saveToast = this.toast.create({
                                message: 'vCard saved!',
                                duration: 2000,
                            });
                            saveToast.present();
                        });
                    } else {
                        let saveToast = this.toast.create({
                            message: 'Save failed. VCard is invalid',
                            duration: 2000,
                        });
                        saveToast.present();
                    }           
                    break;

                case VCardGeneratorOptions.ViewQrCode:
                    let qrCodeModal = this.modal.create(QrViewerPage, 
                    {
                        qrCode: {
                            value: this.vCard.getFormattedString()
                        }
                    });
                    qrCodeModal.present();
                    break;

                case VCardGeneratorOptions.ViewRawData:
                    let qrCodeTextModal = this.modal.create(QrTextViewerPage, 
                    {
                        text: this.vCard.getFormattedString()
                    });
                    qrCodeTextModal.present();
                    break;

                case VCardGeneratorOptions.ResetVCard:
                    let resetAlert = this.alert.create({
                        title: 'Reset',
                        message: 'Are you sure you want to reset your vCard?',
                        buttons: [
                            {
                                text: 'Cancel',
                                role: 'cancel',
                            },
                            {
                                text: 'Reset',
                                role: 'yes',
                                handler: () => {
                                    this.vCard = this.vCardService.createVCard();
                                    this.vCardForm = this.fb.group({});
                                }
                            }
                        ]
                    });

                    resetAlert.present();
                    break;

                default:
            }
        });

        morePopover.present({
            ev: $event
        });
    }

    onAddAttributeClicked($event) {
        let listModal = this.modal.create(VCardAttributeListPage, Object.keys(this.vCardForm.controls));

        listModal.onWillDismiss((data: VCardSelection) => {
            if (data != null) {
                this.vCardForm.addControl(data.selector, new FormControl(data));
            }
        });

        listModal.present();
    }

    onDeleteFormControlClicked(data: VCardSelection) {
        this.vCardForm.removeControl(data.selector);
        this.vCard[data.selector] = '';
    }

    repopulateCardForm(vCard: any) {
        Object.assign(this.vCard, vCard);

        for (let attribute of CardList) {
            if (this.vCard[attribute.selector] !== '') {
                this.vCardForm.addControl(attribute.selector, new FormControl(attribute));
            }
        }
    }

    getFormControls(): any {
        let controls = _.toArray(this.vCardForm.controls);
        return controls;
    }

    isValidVCard(): boolean {
        return true;
    }
}
