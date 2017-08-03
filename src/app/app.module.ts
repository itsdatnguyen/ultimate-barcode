import { QrCodeHistoryPageModule } from './../pages/qr-code-history/qr-code-history.module';
import { BarcodeHistoryPageModule } from './../pages/barcode-history/barcode-history.module';
import { BarcodeReaderService } from './../pages/barcode-reader/barcode-reader.service';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { DatePipe } from "@angular/common";
import { IonicApp, IonicErrorHandler, IonicModule, Tabs } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from "@ionic/storage";
import { AdMobFree } from "@ionic-native/admob-free";
import { BrowserTab } from '@ionic-native/browser-tab';

import { QrCodeGeneratorPageModule } from './../pages/qr-code-generator/qr-code-generator.module';
import { BarcodeReaderPageModule } from './../pages/barcode-reader/barcode-reader.module';
import { IntroductionPageModule } from './../pages/introduction/introduction.module';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IntroductionService, SQLStorageService, UserSettingsService } from "../shared/index";
import { HomePageModule } from "../pages/home/home.module";

@NgModule({
    declarations: [
        MyApp,
    ],
    imports: [
        BrowserModule,
        HomePageModule,
        IntroductionPageModule,
        BarcodeReaderPageModule,
        QrCodeGeneratorPageModule,
        BarcodeHistoryPageModule,
        QrCodeHistoryPageModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
    ],
    bootstrap: [IonicApp],
    exports: [
        BrowserModule,
    ],
    entryComponents: [
        MyApp,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SQLite,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        IntroductionService,
        SQLStorageService,
        UserSettingsService,
        AdMobFree,
        BrowserTab,
        DatePipe,
        BarcodeReaderService,
    ]
})
export class AppModule {}
