import { QrCodeGeneratorPageModule } from './../pages/qr-code-generator/qr-code-generator.module';
import { BarcodeReaderPageModule } from './../pages/barcode-reader/barcode-reader.module';
import { IntroductionPageModule } from './../pages/introduction/introduction.module';
import { SQLite } from '@ionic-native/sqlite';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";
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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
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
    UserSettingsService  
  ]
})
export class AppModule {}
