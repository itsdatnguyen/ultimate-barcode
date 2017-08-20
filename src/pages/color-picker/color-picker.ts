import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Barcode } from './../barcode-generator/barcode-generator';

export enum ColorPickerAction {
    LineColor,
    BackgroundColor,
}

export interface ColorPickerParams {
    barcode: Barcode;
    action: ColorPickerAction;
}

@IonicPage()
@Component({
  selector: 'page-color-picker',
  templateUrl: 'color-picker.html',
})
export class ColorPickerPage {

    barcode: Barcode = null;
    action: ColorPickerAction = null;

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private viewController: ViewController,
    ) {
        this.barcode = (<ColorPickerParams>this.navParams.data).barcode;
        this.action = (<ColorPickerParams>this.navParams.data).action;
    }

    colorPickerChanged($event: string) {
        switch (this.action) {
            case ColorPickerAction.BackgroundColor:
                this.barcode.backgroundColor = $event;
                break;

            case ColorPickerAction.LineColor:
                this.barcode.color = $event;
                break;

            default:
        }      
    }

    exitClicked($event) {
        this.viewController.dismiss({});
    }
}
