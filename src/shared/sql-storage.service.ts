import { Storage } from "@ionic/storage";
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SQLStorageService {
    private _SQLiteObject: SQLiteObject = null;

    get SQLiteObject(): SQLiteObject {
        return this._SQLiteObject;
    }

    constructor(
        private storage: Storage,
        private SQLiteService: SQLite) { }

    getAll(): Promise<any> {
        if (this.SQLiteObject) {
            return this.SQLiteObject.executeSql('SELECT key, value FROM kv', []).then(data => {
                const results = [];
                for (let i = 0; i < data.rows.length; i++) {
                    results.push(JSON.parse(data.rows.item(i).value));
                }

                return results;
            });
        } else {
            return new Promise((resolve) => {
                const results = [];
                this.storage.forEach((data) => {
                    results.push(JSON.parse(data));
                });

                resolve(results);
            });
        }
    }

    get(key: string) {
        if (this.SQLiteObject) {
            return this.SQLiteObject.executeSql('select key, value from kv where key = ? limit 1', [key]).then(data => {
                if (data.rows.length > 0) {                    
                    return JSON.parse(data.rows.item(0).value);
                }
            });

        } else {
            return new Promise((resolve) => {
                resolve(this.storage.get(key));
            });
        }
    }

    remove(key: string) {
        if (this.SQLiteObject) {
            return this.SQLiteObject.executeSql('delete from kv where key = ?', [key]);
        
        } else {
            return new Promise((resolve) => {
                resolve(this.storage.remove(key));
            });
        }
    }

    set(key: string, value: any) {
        if (this.SQLiteObject) {
            return this.SQLiteObject.executeSql('insert or replace into kv(key, value) values (?, ?)', [key, value]).then(data => {
                if (data.rows.length > 0) {                
                    return JSON.parse(data.rows.item(0).value);
                }
            });

        } else {
            return new Promise((resolve) => {
                resolve(this.storage.set(key, value));
            });
        }
    }

    /**
     * Should be called after deviceready event is fired
     */
    initializeDatabase(): Promise<any> {
        this.SQLiteService = new SQLite();
        
        return this.SQLiteService.create({
             name: 'data.db',
             location: 'default'
        }).then((db: SQLiteObject) => {
            this._SQLiteObject = db;
            return this.SQLiteObject.executeSql('CREATE TABLE IF NOT EXISTS kv (key text primary key, value text)', []);
        
        }).catch((error) => {
            console.error(`Error creating database: ${error}`);
        });
    }

    restartDatabase(): Promise<any> {
        if (this.SQLiteObject) {
            return this.SQLiteService.deleteDatabase({
                name: 'data.db',
                location: 'default'
            }).then(this.initializeDatabase);

        } else {
            return this.storage.clear();
        }    
    }
}
