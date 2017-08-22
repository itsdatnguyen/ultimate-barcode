import { BrowserTab } from '@ionic-native/browser-tab';
import { Injectable } from '@angular/core';

@Injectable()
export class BrowserService {

    constructor(private browserTab: BrowserTab) {

    }

    openInBrowser(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.open(url, '_system');
            resolve();
        });
    }
    
    openInNativeBrowser(url: string): Promise<any>  {
        return this.browserTab.isAvailable().then((available: boolean) => {
            if (available) {
                return this.browserTab.openUrl(url);
                
            } else {
                return new Promise((resolve, reject) => {
                    window.open(url, '_system');
                    resolve();
                });
            }
        });
    }

    openGoogleSearch(text: string): Promise<any> {
        let sanitizedText = text.replace(' ', '+');
        let query = `https://www.google.ca/search?q=${sanitizedText}`;
        return this.openInBrowser(query);
    }
}