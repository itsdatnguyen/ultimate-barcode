import { SQLStorageService } from './../../shared/sql-storage.service';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';


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

    printTableSchema(tableSchema: string) {
        this.storage.SQLiteObject.executeSql(`PRAGMA table_info(${tableSchema})`, [])
        .then((value) => {
            let data = value.rows.item(0); 
            console.log(data);
        });
    }
}
