import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

import { BarcodeReaderPage } from './../pages/barcode-reader/barcode-reader';
import { QrCodeGeneratorPage } from './../pages/qr-code-generator/qr-code-generator';
import { HomePage } from '../pages/home/home';
import { IntroductionService, SQLStorageService } from "../shared/index";
import { IntroductionPage } from "../pages/introduction/introduction";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: Array<{title: string, component: any}>;

    constructor(
        public platform: Platform, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen,
        private introductionService: IntroductionService,
        private sqlStorageService: SQLStorageService,
        private adMobFree: AdMobFree
    ) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Barcode Reader', component: BarcodeReaderPage },
        { title: 'QR Generator', component: QrCodeGeneratorPage }
        ];
    }

    initializeApp() {
        this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();

        this.sqlStorageService.initializeDatabase().then((database) => {
                    this.seenIntroduction();
                }, (rejected) => {
                    this.seenIntroduction();
                });
        });


        
    }

    showAdBanner(): void {
        const bannerConfig: AdMobFreeBannerConfig = {
            isTesting: true,
            autoShow: true
        };

        this.adMobFree.banner.config(bannerConfig);

        this.adMobFree.banner.prepare().then((value) => {

        })
        .catch((rejected) => {
            console.error(`Error, could not show ad banner: ${rejected}`);
        });
    }

    seenIntroduction(): Promise<any> {
        return this.introductionService.hasSeenIntroduction().then((introduction) => {
            if (introduction) {
                this.rootPage = HomePage;
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
