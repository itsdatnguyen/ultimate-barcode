import { SQLStorageService } from './../../shared/sql-storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {

    constructor(
        private storage: SQLStorageService,
    ) {

    }

    printDatabaseClicked() {
        this.storage.getAll()
        .then((data) => {
            console.log(data);
        });
    }

    restartDatabaseClicked() {
        this.storage.restartDatabase()
        .then((value) => {
            console.log(value);
        });
    }
}
