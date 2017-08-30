import { AlertController } from 'ionic-angular';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { SQLStorageService } from './../shared';

export interface CodeEntry {
    rowid: number;
    code: string;
    date: number;
    format: string;
    favourite?: number;
}

export const BARCODE_TABLE_NAME = 'barcode';
export const QR_CODE_TABLE_NAME = 'qrcode';

@Injectable()
export class BarcodeReaderService {

    private _barcodeChanged = new EventEmitter<any>();
    public get onBarcodeChange(): Observable<any> {
        return this._barcodeChanged.asObservable();
    }

    private _qrCodeChanged = new EventEmitter<any>();
    public get onQrCodeChange(): Observable<any> {
        return this._qrCodeChanged.asObservable();
    }

    constructor(private sqlStorageService: SQLStorageService,
        private alertController: AlertController) {  
    }

    storeBarcode(codeEntry: CodeEntry): Promise<any> {
        let sqlCommand = `INSERT INTO ${BARCODE_TABLE_NAME} (code, format, date) VALUES (?, ?, ?)`;
        return this.sqlStorageService.SQLiteObject.executeSql(sqlCommand, [codeEntry.code, codeEntry.format, codeEntry.date])
        .then((data) => {
            this.barcodeChangeEmit();
            return data;
        })
        .catch((rejected) => {
            this.error(`Error could not store barcode data ${JSON.stringify(rejected)}`);
        });
    }

    storeQrCode(codeEntry: CodeEntry): Promise<any> {
        let sqlCommand = `INSERT INTO ${QR_CODE_TABLE_NAME} (code, format, date) VALUES (?, ?, ?)`;
        return this.sqlStorageService.SQLiteObject.executeSql(sqlCommand, [codeEntry.code, codeEntry.format, codeEntry.date])
        .then((data) => {
            this.qrCodeChangeEmit();
            return data;
        })
        .catch((rejected) => {
            this.error(`[${sqlCommand}] Error could not store QR code data ${JSON.stringify(rejected)}`);
        });
    }

    getBarcode(rowid: number): Promise<CodeEntry> {
        let command = `SELECT rowid, * from ${BARCODE_TABLE_NAME} WHERE rowid = ${rowid}`;
        return this.sqlStorageService.SQLiteObject.executeSql(command, [])
        .then((row) => {
            let actualData = row.rows.item(0);  
            return actualData;
        });
    }

    getQrCode(rowid: number): Promise<CodeEntry> {
        let command = `SELECT rowid, * from ${QR_CODE_TABLE_NAME} WHERE rowid = ${rowid}`;
        return this.sqlStorageService.SQLiteObject.executeSql(command, [])
        .then((row) => {
            let actualData = row.rows.item(0);  
            return actualData;
        });
    }

    deleteBarcode(rowid: number): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`DELETE FROM ${BARCODE_TABLE_NAME} WHERE rowid = ${rowid}`, [])
        .then((data) => {
            this.barcodeChangeEmit();
            return data;
        })
        .catch((rejected) => {
            this.error(`Error could not delete barcode data ${JSON.stringify(rejected)}`);
        })
    }

    deleteQrCode(rowid: number): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`DELETE FROM ${QR_CODE_TABLE_NAME} WHERE rowid = ${rowid}`, [])
        .then((data) => {
            this.qrCodeChangeEmit();
            return data;
        })
        .catch((rejected) => {
            this.error(`Error could not delete barcode data ${JSON.stringify(rejected)}`);
        })
    }

    getAllBarcodes(): Promise<CodeEntry[]> {
        return this.sqlStorageService.SQLiteObject.executeSql(`SELECT rowid, * FROM ${BARCODE_TABLE_NAME}`, [])
        .catch((rejected) => {
            this.error(`Error could not get all barcode data ${JSON.stringify(rejected)}`);
        })
        .then((results) => {
            let codes: CodeEntry[] = [];
            
            for (let i = results.rows.length - 1; i >= 0; i--) {
                let object = results.rows.item(i);
                codes.push(object);
            }
    
            return codes;
        });
    }

    getAllQRCodes(): Promise<CodeEntry[]> {
        return this.sqlStorageService.SQLiteObject.executeSql(`SELECT rowid, * FROM ${QR_CODE_TABLE_NAME}`, [])       
        .catch((rejected) => {
            this.error(`Error could not get all qr code data ${JSON.stringify(rejected)}`);
        })
        .then((results) => {
            let codes: CodeEntry[] = [];
            
            for (let i = results.rows.length - 1; i >= 0; i--) {
                let object = results.rows.item(i);
                codes.push(object);
            }
    
            return codes;
        });
    }

    barcodeChangeEmit(): void {
        this.getAllBarcodes().then((barcodes) => {
            this._barcodeChanged.emit(barcodes); 
        });
    }

    qrCodeChangeEmit(): void {
        this.getAllQRCodes().then((qrCodes) => {
            this._qrCodeChanged.emit(qrCodes); 
        });
    }

    createBarcodeTable(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`CREATE TABLE IF NOT EXISTS ${BARCODE_TABLE_NAME} (code TEXT, format TEXT, date INT)`, [])
        .catch((rejected) => {
            this.error(`Error failed to create UPC barcode table: ${JSON.stringify(rejected)}`)
        })
        .then((value) => {
            return this.upgradeTable(BARCODE_TABLE_NAME);
        })
    }

    createQRCodeTable(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`CREATE TABLE IF NOT EXISTS ${QR_CODE_TABLE_NAME} (code TEXT, format TEXT, date INT)`, [])
        .catch((rejected) => {
            this.error(`Error failed to create QR code table: ${JSON.stringify(rejected)}`)
        })
        .then((value) => {
            return this.upgradeTable(QR_CODE_TABLE_NAME);
        })
    }

    upgradeTable(tableName: string): Promise<any> {
        let favouriteUpgradeCommand = `ALTER TABLE ${tableName} ADD favourite INTEGER DEFAULT 0`;
        return this.sqlStorageService.SQLiteObject.executeSql(favouriteUpgradeCommand, [])
        .catch((value) => {
            console.log('Table already has favourite');
        });
    }

    error(message: string): void {
        const errorMessage = this.alertController.create({
            title: 'Error',
            message: message
        });
        console.error(message);
        errorMessage.present();
    }
}