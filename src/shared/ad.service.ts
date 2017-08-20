import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class AdService {

    constructor(private adMobFree: AdMobFree) {
        const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-6288801115616154/7110154053',
            autoShow: true
        };
        this.adMobFree.banner.config(bannerConfig);

        const interstitial: AdMobFreeInterstitialConfig = {
            id: 'ca-app-pub-6288801115616154/7769302054',
                'ca-app-pub-6288801115616154/7769302054'
            autoShow: true
        };
        this.adMobFree.interstitial.config(interstitial);
    }

    showAdBanner(): Promise<any> {   
        return this.adMobFree.banner.prepare()
        .catch((rejected) => {
            console.error(`Error, could not show ad banner: ${rejected}`);
        });
    }

    showInterstitialBanner(): Promise<any> {    
        return this.adMobFree.interstitial.prepare();
    }
}