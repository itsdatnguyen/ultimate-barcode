import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { IntroductionService, SQLStorageService, AppReadyService, AdService } from "../shared";

import { BarcodeGeneratorPage } from './../pages/barcode-generator/barcode-generator';
import { BarcodeReaderPage } from './../pages/barcode-reader/barcode-reader';
import { QrCodeGeneratorPage } from './../pages/qr-code-generator/qr-code-generator';
import { IntroductionPage } from "../pages/introduction/introduction";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = BarcodeReaderPage;

    pages: Array<{title: string, component: any}>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen,
        private introductionService: IntroductionService,
        private sqlStorageService: SQLStorageService,
        private appReadyService: AppReadyService,
        private adService: AdService,
    ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Barcode Reader', component: BarcodeReaderPage },
            { title: 'QR Generator', component: QrCodeGeneratorPage },
            { title: 'Barcode Generator', component: BarcodeGeneratorPage },
        ];
    }

    initializeApp() {
        
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            
            this.adService.showAdBanner();
            
            this.sqlStorageService.initializeDatabase()
            .then((value) => {
                this.appReadyService.enableAppReady();
                this.seenIntroduction();
            });
        });
    }

    seenIntroduction(): Promise<any> {
        return this.introductionService.hasSeenIntroduction().then((introduction) => {
            if (introduction != null) {
                this.rootPage = BarcodeReaderPage;
            } else {
                this.rootPage = IntroductionPage;
            }
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.push(page.component);
    }
}
