import { NgModule } from '@angular/core';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from "@ionic/storage";
import { AdMobFree } from "@ionic-native/admob-free";
import { BrowserTab } from '@ionic-native/browser-tab';
import { Clipboard } from '@ionic-native/clipboard';
import { AppRate } from '@ionic-native/app-rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FileOpener } from '@ionic-native/file-opener';
import { AndroidPermissions } from '@ionic-native/android-permissions';


@NgModule({
    declarations: [
        
    ],
    imports: [
        IonicStorageModule.forRoot(),
    ],
    exports: [
        
    ],
    providers: [
        AndroidPermissions,
        StatusBar,
        SplashScreen,
        SQLite,
        AdMobFree,
        BrowserTab,
        Clipboard,
        AppRate,
        SocialSharing,
        FileOpener,
    ],
})
export class IonicNativePluginModule {}