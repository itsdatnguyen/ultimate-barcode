import { SQLStorageService } from './sql-storage.service';
import { Injectable } from '@angular/core';

export const V_CARD_TABLE_NAME = 'vCard';

export interface VCardEntry {
    rowid: number;
    vCard: any;
    date: number;
}

@Injectable()
export class VCardStorageService {

    constructor(private sql: SQLStorageService) {

    }

    createVCardTable(): Promise<any> {
        let command = `CREATE TABLE IF NOT EXISTS ${V_CARD_TABLE_NAME} (vCard TEXT, date INT)`;
        return this.sql.SQLiteObject.executeSql(command, []);
    }

    addVCard(vCard: string, date: number): Promise<any> {
        let command = `INSERT INTO ${V_CARD_TABLE_NAME} (vCard, date) VALUES (?, ?)`;
        return this.sql.SQLiteObject.executeSql(command, [vCard, date]);
    }

    removeVCard(rowid: number): Promise<any> {
        let command = `DELETE FROM ${V_CARD_TABLE_NAME} WHERE rowid = ${rowid}`;
        return this.sql.SQLiteObject.executeSql(command, []);
    }

    getVCard(rowid: number): Promise<VCardEntry> {
        let command = `SELECT rowid, * FROM ${V_CARD_TABLE_NAME} WHERE rowid = ${rowid}`;
        return this.sql.SQLiteObject.executeSql(command, [])
        .then((value) => {
            let item = value.rows.item(0);
            item.vCard = JSON.parse(item.vCard);
            return item;
        });
    }

    getAllVCards(): Promise<VCardEntry[]> {
        let command = `SELECT rowid, * from ${V_CARD_TABLE_NAME}`;
        return this.sql.SQLiteObject.executeSql(command, [])
        .then((results) => {
            let entries: VCardEntry[] = [];

            for (let i = results.rows.length - 1; i >= 0; i--) {
                let item = results.rows.item(i);
                item.vCard = JSON.parse(item.vCard);
                entries.push(item);
            }

            return entries;
        });
    }
}