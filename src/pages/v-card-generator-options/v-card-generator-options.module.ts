import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VCardGeneratorOptionsPage } from './v-card-generator-options';

@NgModule({
    declarations: [
        VCardGeneratorOptionsPage,
    ],
    imports: [
        IonicPageModule.forChild(VCardGeneratorOptionsPage),
    ],
    entryComponents: [
        VCardGeneratorOptionsPage,
    ]
})
export class VCardGeneratorOptionsPageModule {}
