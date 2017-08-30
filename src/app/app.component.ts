import { SavedVCardsPage } from './../pages/saved-v-cards/saved-v-cards';
import { BarcodeReaderService } from './../shared/barcode-reader.service';
import { VCardGeneratorPage } from './../pages/v-card-generator/v-card-generator';
import { FavouritesPage } from './../pages/favourites/favourites';
import { TestPage } from './../pages/test/test';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { AppRate } from '@ionic-native/app-rate';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IntroductionService, SQLStorageService, AppReadyService, AdService } from "../shared";

import { BarcodeGeneratorPage } from './../pages/barcode-generator/barcode-generator';
import { BarcodeReaderPage } from './../pages/barcode-reader/barcode-reader';
import { QrCodeGeneratorPage } from './../pages/qr-code-generator/qr-code-generator';
import { IntroductionPage } from "../pages/introduction/introduction";

import { ANDROID_STORE_URL } from "./constants/store-location";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = BarcodeReaderPage;

    pages: Array<{title: string, component: any}> = [
        { title: 'Favourites', component: FavouritesPage },
        { title: 'Barcode Generator', component: BarcodeGeneratorPage },
        { title: 'QR Generator', component: QrCodeGeneratorPage },
        // { title: 'vCard Generator', component: VCardGeneratorPage },
        // { title: 'Saved vCards', component: SavedVCardsPage },
        // { title: 'Test Page', component: TestPage },        
    ];

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen,
        private introductionService: IntroductionService,
        private sqlStorageService: SQLStorageService,
        private barcodeReaderService: BarcodeReaderService,
        private appReadyService: AppReadyService,
        private adService: AdService,
        private appRate: AppRate,
        private social: SocialSharing,
    ) {
        this.initializeApp();
    }

    initializeApp() {
        
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();      

            if (this.appRate.preferences != null) {
                this.appRate.preferences.storeAppURL.android = ANDROID_STORE_URL;
            }

            // prepare ads but show them later after introduction
            this.adService.prepareBannerAd();
            this.adService.prepareInterstitialAd();
                        
            this.sqlStorageService.initializeDatabase()
            .then((value) => {      
                let barcodePromise = this.barcodeReaderService.createBarcodeTable();
                let qrPromise = this.barcodeReaderService.createQRCodeTable();          
                this.seenIntroduction();

                return Promise.all([barcodePromise, qrPromise]);
            })
            .then((value) => {
                this.appReadyService.enableAppReady();
            })
            .catch((error) => {
                this.seenIntroduction();
            });
        });
    }

    seenIntroduction(): Promise<any> {
        return this.introductionService.hasSeenIntroduction().then((introduction) => {
            if (introduction != null) {
                this.adService.showBannerAd();                
                this.rootPage = BarcodeReaderPage;
            } else {
                this.introductionService.onExitIntroduction().subscribe((value) => {
                    this.adService.showBannerAd();
                });
                this.rootPage = IntroductionPage;
            }
        });
    }

    navShareClicked($event) {
        this.social.share(`Check out this cool free barcode/qr scanner and generator app I found! ${ANDROID_STORE_URL}`, 'This app is really useful');
    }

    openPage(page) {
        this.nav.push(page.component);
    }
}
