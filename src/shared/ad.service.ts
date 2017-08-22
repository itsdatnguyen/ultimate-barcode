import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class AdService {

    constructor(private adMobFree: AdMobFree) {
        
    }

    showAdBanner(): Promise<any> {  
        const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-6288801115616154/7110154053',
            autoShow: true,
        };
        this.adMobFree.banner.config(bannerConfig); 

        return new Promise((resolve) => {
            resolve();
        });
        /*
        return this.adMobFree.banner.prepare()
        .catch((rejected) => {
            console.error(`Error, could not show ad banner: ${rejected}`);
        });
        */
    }

    showInterstitialBanner(): Promise<any> {
        const interstitial: AdMobFreeInterstitialConfig = {
            id: 'ca-app-pub-6288801115616154/7769302054',
            autoShow: true,
        };
        this.adMobFree.interstitial.config(interstitial);

        return this.adMobFree.interstitial.prepare()
        .catch((rejected) => {
            console.error(`Error, could not show interstitial ad: ${rejected}`);
        });
    }
}