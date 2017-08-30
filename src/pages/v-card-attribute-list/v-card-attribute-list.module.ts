import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VCardAttributeListPage } from './v-card-attribute-list';

@NgModule({
    declarations: [
        VCardAttributeListPage,
    ],
    imports: [
        IonicPageModule.forChild(VCardAttributeListPage),
    ],
    entryComponents: [
        VCardAttributeListPage,
    ]
})
export class VCardAttributeListPageModule {}
