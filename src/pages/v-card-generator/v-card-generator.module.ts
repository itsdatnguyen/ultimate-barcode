import { VCardGeneratorMemoryService } from './v-card-generator-memory.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VCardGeneratorPage } from './v-card-generator';

@NgModule({
    declarations: [
        VCardGeneratorPage,
    ],
    imports: [
        IonicPageModule.forChild(VCardGeneratorPage),
    ],
    entryComponents: [
        VCardGeneratorPage,
    ],
    providers: [
        VCardGeneratorMemoryService,
    ]
})
export class VCardGeneratorPageModule {}
