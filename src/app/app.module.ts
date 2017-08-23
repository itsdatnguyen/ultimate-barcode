import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from "@angular/common";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicNativePluginModule } from "./ionic-native-plugin.module";

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

import { BarcodeParserService } from './../shared';
import { BarcodeReaderService } from './../pages/barcode-reader/barcode-reader.service';

import { MyApp } from './app.component';
import { 
    ImageSaverService, 
    AdService, 
    IntroductionService, 
    SQLStorageService, 
    UserSettingsService, 
    StatisticsService, 
    BrowserService, 
    AppReadyService 
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

    //TestPageModule,
];

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
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
        DatePipe,
    ]
})
export class AppModule {}
