import { BarcodeDetailOptionsPageModule } from './../pages/barcode-detail-options/barcode-detail-options.module';
import { BarcodeGeneratorPageModule } from './../pages/barcode-generator/barcode-generator.module';
import { QrCodeDetailOptionsPageModule } from './../pages/qr-code-detail-options/qr-code-detail-options.module';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { IonicNativePluginModule } from "./ionic-native-plugin.module";

import { BarcodeDetailPageModule } from './../pages/barcode-detail/barcode-detail.module';
import { QrCodeDetailPageModule } from './../pages/qr-code-detail/qr-code-detail.module';
import { QrCodeHistoryPageModule } from './../pages/qr-code-history/qr-code-history.module';
import { BarcodeHistoryPageModule } from './../pages/barcode-history/barcode-history.module';
import { QrCodeGeneratorPageModule } from './../pages/qr-code-generator/qr-code-generator.module';
import { BarcodeReaderPageModule } from './../pages/barcode-reader/barcode-reader.module';
import { IntroductionPageModule } from './../pages/introduction/introduction.module';

import { BarcodeReaderService } from './../pages/barcode-reader/barcode-reader.service';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroductionService, SQLStorageService, UserSettingsService, StatisticsService, BrowserService } from "../shared/index";
import { HomePageModule } from "../pages/home/home.module";


export const AppPages = [
    HomePageModule,
    IntroductionPageModule,
    BarcodeReaderPageModule,
    BarcodeHistoryPageModule,
    BarcodeDetailPageModule,
    BarcodeGeneratorPageModule,
    BarcodeDetailOptionsPageModule,
    QrCodeHistoryPageModule,
    QrCodeDetailPageModule,
    QrCodeDetailOptionsPageModule,
    QrCodeGeneratorPageModule,
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
        DatePipe,
    ]
})
export class AppModule {}
