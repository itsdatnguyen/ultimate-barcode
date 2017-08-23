import { Injectable } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

@Injectable()
export class AdService {

    constructor(private adMobFree: AdMobFree) { }

    prepareBannerAd(): Promise<any> {
        const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-6288801115616154/7110154053',
            autoShow: false,
        };
        this.adMobFree.banner.config(bannerConfig); 

        return this.adMobFree.banner.prepare()
        .catch((rejected) => {
            console.error(`Error, could not prepare banner ad: ${rejected}`);
        });    
    }

    showBannerAd(): Promise<any> {  
        return this.adMobFree.banner.show()
        .catch((rejected) => {
            console.error(`Error, could not show banner ad: ${rejected}`);
        });    
    }

    prepareInterstitialAd(): Promise<any> {
        const interstitial: AdMobFreeInterstitialConfig = {
            id: 'ca-app-pub-6288801115616154/7769302054',
            autoShow: false,
        };
        this.adMobFree.interstitial.config(interstitial);
        
        return this.adMobFree.interstitial.prepare()
        .catch((rejected) => {
            console.error(`Error, could not prepare interstitial ad: ${rejected}`);
        });   
    }

    /**
     * Show the already prepared interstitial ad then prepare a new one.
     */
    showInterstitialAd(): Promise<any> {
        return this.adMobFree.interstitial.show()
        .then((value) => {
            return this.adMobFree.interstitial.prepare();
        })
        .catch((rejected) => {
            console.error(`Error, could not show interstitial ad: ${rejected}`);
        });           
    }
}