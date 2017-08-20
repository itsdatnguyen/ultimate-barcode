import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ColorPickerModule } from "../../components/color-picker";

import { ColorPickerPage } from './color-picker';

@NgModule({
    declarations: [
        ColorPickerPage,
    ],
    imports: [
        IonicPageModule.forChild(ColorPickerPage),
        ColorPickerModule
    ],
    entryComponents: [
        ColorPickerPage
    ]
})
export class ColorPickerPageModule {}
