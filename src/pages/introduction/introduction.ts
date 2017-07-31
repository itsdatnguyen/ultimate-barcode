import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IntroductionService } from "../../shared/index";

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams,
        private introductionService: IntroductionService) {

    }

    exitIntroduction() {
        this.introductionService.setIntroductionStatus(true);
        this.navCtrl.setRoot(HomePage);
        this.navCtrl.popToRoot();
    }
}
