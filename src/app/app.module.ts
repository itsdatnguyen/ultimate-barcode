import { VCardDetailOptionsPageModule } from './../pages/v-card-detail-options/v-card-detail-options.module';
import { VCardDetailPageModule } from './../pages/v-card-detail/v-card-detail.module';
import { SavedVCardsPageModule } from './../pages/saved-v-cards/saved-v-cards.module';
import { CopyPasteService } from './../shared/copy-paste.service';
import { QrViewerPageModule } from './../pages/qr-viewer/qr-viewer.module';
import { QrTextViewerPageModule } from './../pages/qr-text-viewer/qr-text-viewer.module';
import { VCardGeneratorOptionsPageModule } from './../pages/v-card-generator-options/v-card-generator-options.module';
import { ErrorHandler, NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicNativePluginModule } from "./ionic-native-plugin.module";

import { VCardAttributeListPageModule } from './../pages/v-card-attribute-list/v-card-attribute-list.module';
import { VCardGeneratorPageModule } from './../pages/v-card-generator/v-card-generator.module';
import { FavouritesPageModule } from './../pages/favourites/favourites.module';
import { BarcodeDetailOptionsPageModule } from './../pages/barcode-detail-options/barcode-detail-options.module';
import { BarcodeGeneratorPageModule } from './../pages/barcode-generator/barcode-generator.module';
import { QrCodeDetailOptionsPageModule } from './../pages/qr-code-detail-options/qr-code-detail-options.module';
import { ColorPickerPageModule } from './../pages/color-picker/color-picker.module';
import { BarcodeDetailPageModule } from './../pages/barcode-detail/barcode-detail.module';
import { QrCodeDetailPageModule } from './../pages/qr-code-detail/qr-code-detail.module';
import { QrCodeHistoryPageModule } from './../pages/qr-code-history/qr-code-history.module';
import { BarcodeHistoryPageModule } from './../pages/barcode-history/barcode-history.module';
import { QrCodeGeneratorPageModule } from './../pages/qr-code-generator/qr-code-generator.module';
import { BarcodeReaderPageModule } from './../pages/barcode-reader/barcode-reader.module';
import { IntroductionPageModule } from './../pages/introduction/introduction.module';

import { TestPageModule } from './../pages/test/test.module';

import { MyApp } from './app.component';
import { 
    AdService, 
    AppReadyService,
    BrowserService, 
    BarcodeParserService,
    BarcodeReaderService,
    FavouritesService,
    ImageSaverService, 
    IntroductionService, 
    SQLStorageService, 
    StatisticsService, 
    UserSettingsService,
    VCardGeneratorService, 
    VCardParserService,
    VCardStorageService
} from "../shared/index";


export const AppPages = [
    IntroductionPageModule,
    BarcodeReaderPageModule,
    BarcodeHistoryPageModule,
    BarcodeDetailPageModule,
    BarcodeGeneratorPageModule,
    BarcodeDetailOptionsPageModule,
    ColorPickerPageModule,
    QrCodeHistoryPageModule,
    QrCodeDetailPageModule,
    QrCodeDetailOptionsPageModule,
    QrCodeGeneratorPageModule,
    FavouritesPageModule,
    VCardGeneratorPageModule,
    VCardAttributeListPageModule,
    VCardGeneratorOptionsPageModule,
    VCardDetailPageModule,
    VCardDetailOptionsPageModule,
    SavedVCardsPageModule,
    QrTextViewerPageModule,
    QrViewerPageModule,

    // TestPageModule,
];

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppPages,
        IonicModule.forRoot(MyApp),
        IonicNativePluginModule,        
    ],
    bootstrap: [IonicApp],
    exports: [
        
    ],
    entryComponents: [
        MyApp,
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        IntroductionService,
        SQLStorageService,
        UserSettingsService,
        StatisticsService,
        BarcodeReaderService,
        BrowserService,
        BarcodeParserService,
        AppReadyService,
        AdService,
        ImageSaverService,
        FavouritesService,
        VCardGeneratorService,
        VCardParserService,
        VCardStorageService,
        CopyPasteService,
    ]
})
export class AppModule {}
