import { AlertController } from 'ionic-angular';
import { SQLStorageService } from './../../shared/sql-storage.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

export interface CodeEntry {
    id?: number;
    code?: string;
    date?: number;
}

@Injectable()
export class BarcodeReaderService {

    public BARCODE_TABLE_NAME = 'barcode';
    public QR_CODE_TABLE_NAME = 'qrcode';

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
        return this.sqlStorageService.SQLiteObject.executeSql(`INSERT INTO ${this.BARCODE_TABLE_NAME} (code, date) VALUES ("${codeEntry.code}", ${codeEntry.date})`, {})
        .then((data) => {
            this.getAllBarcodes().then((barcodes) => {
                this._barcodeChanged.emit(barcodes); 
            });
        })
        .catch((rejected) => {
            this.error(`Error could not store barcode data ${JSON.stringify(rejected)}`);
        })
    }

    storeQrCode(codeEntry: CodeEntry): Promise<any> {
        let sqlCommand = `INSERT INTO ${this.QR_CODE_TABLE_NAME} (code, date) VALUES ("${codeEntry.code}", ${codeEntry.date})`;
        return this.sqlStorageService.SQLiteObject.executeSql(sqlCommand, {})
        .then((data) => {
            this.getAllQRCodes().then((qrCodes) => {
                this._qrCodeChanged.emit(qrCodes); 
            });
        })
        .catch((rejected) => {
            this.error(`[${sqlCommand}] Error could not store QR code data ${JSON.stringify(rejected)}`);
        })
    }

    deleteBarcode(id: number): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`DELETE FROM ${this.BARCODE_TABLE_NAME} WHERE rowid=${id}`, {})
        .then((data) => {
            this.getAllBarcodes().then((barcodes) => {
                this._barcodeChanged.emit(barcodes); 
            });
        })
        .catch((rejected) => {
            this.error(`Error could not delete barcode data ${JSON.stringify(rejected)}`);
        })
    }

    deleteQrCode(id: number): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`DELETE FROM ${this.QR_CODE_TABLE_NAME} WHERE rowid=${id}`, {})
        .then((data) => {
            this.getAllQRCodes().then((qrCodes) => {
                this._qrCodeChanged.emit(qrCodes); 
            });
        })
        .catch((rejected) => {
            this.error(`Error could not delete barcode data ${JSON.stringify(rejected)}`);
        })
    }

    getAllBarcodes(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`SELECT rowid, * FROM ${this.BARCODE_TABLE_NAME}`, {})
        .catch((rejected) => {
            this.error(`Error could not get all barcode data ${JSON.stringify(rejected)}`);
        });
    }

    getAllQRCodes(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`SELECT rowid, * FROM ${this.QR_CODE_TABLE_NAME}`, {})
        .catch((rejected) => {
            this.error(`Error could not get all qr code data ${JSON.stringify(rejected)}`);
        });
    }

    createBarcodeTable(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`CREATE TABLE IF NOT EXISTS ${this.BARCODE_TABLE_NAME} (code TEXT, date INT)`, [])
        .catch((rejected) => {
            this.error(`Error failed to create UPC barcode table: ${JSON.stringify(rejected)}`)
        });
    }

    createQRCodeTable(): Promise<any> {
        return this.sqlStorageService.SQLiteObject.executeSql(`CREATE TABLE IF NOT EXISTS ${this.QR_CODE_TABLE_NAME} (code TEXT, date INT)`, [])
        .catch((rejected) => {
            this.error(`Error failed to create QR code table: ${JSON.stringify(rejected)}`)
        });
    }

    error(message: string): void {
        const errorMessage = this.alertController.create({
            title: 'Error',
            message: message
        });

        errorMessage.present();
    }
}