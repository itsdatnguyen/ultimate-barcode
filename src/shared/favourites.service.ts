import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SQLStorageService } from './sql-storage.service';
import { BARCODE_TABLE_NAME, QR_CODE_TABLE_NAME, CodeEntry } from "./barcode-reader.service";
import { BarcodeReaderService } from "./barcode-reader.service";

@Injectable()
export class FavouritesService {

    private _barcodeChanged = new EventEmitter<any>();
    public get onBarcodeChange(): Observable<any> {
        return this._barcodeChanged.asObservable();
    }

    private _qrCodeChanged = new EventEmitter<any>();
    public get onQrCodeChange(): Observable<any> {
        return this._qrCodeChanged.asObservable();
    }
    
    constructor(private sql: SQLStorageService,
        private barcodeReaderService: BarcodeReaderService) { }

    getAllFavouriteBarcodes(): Promise<CodeEntry[]> {
        let query = `SELECT rowid, * from ${BARCODE_TABLE_NAME} WHERE favourite = 1`;
        return this.sql.SQLiteObject.executeSql(query, [])
        .then((results) => {
            let codes: CodeEntry[] = [];
            
            // start from end of list in order to get most recent favourites first
            for (let i = results.rows.length - 1; i >= 0; i--) {
                let object = results.rows.item(i);
                codes.push(object);
            }
    
            return codes;
        });
    }

    getAllFavouriteQrCodes(): Promise<CodeEntry[]> {
        let query = `SELECT rowid, * from ${QR_CODE_TABLE_NAME} WHERE favourite = 1`;
        return this.sql.SQLiteObject.executeSql(query, [])
        .then((results) => {
            let codes: CodeEntry[] = [];
            
            // start from end of list in order to get most recent favourites first
            for (let i = results.rows.length - 1; i >= 0; i--) {
                let object = results.rows.item(i);
                codes.push(object);
            }
    
            return codes;
        });
    }
    
    /**
     * Sets the favourite of a barcode
     * @param rowId row id to change
     * @param favourite The new favourite value, 1 is true, 0 is false
     */
    setBarcodeFavourite(rowId: number, favourite: number): Promise<any> {
        let query = `UPDATE ${BARCODE_TABLE_NAME} SET favourite = ? WHERE rowid = ?`;
        return this.sql.SQLiteObject.executeSql(query, [favourite, rowId])
        .then((value) => {
            // emit change event so listeners can change their list values
            this.favouriteBarcodeChangeEmit();
            this.barcodeReaderService.barcodeChangeEmit();
            return value;
        })
        .catch((error) => {
            console.error(`Could not set barcode row ${rowId} favourite to ${favourite}: ${error}`);
        });
    }

    /**
     * Sets the favourite of a code entry
     * @param rowId row id to change
     * @param favourite The new favourite value, 1 is true, 0 is false
     */
    setQrCodeFavourite(rowId: number, favourite: number): Promise<any> {
        let query = `UPDATE ${QR_CODE_TABLE_NAME} SET favourite = ? WHERE rowid = ?`;
        return this.sql.SQLiteObject.executeSql(query, [favourite, rowId])
        .then((value) => {
            // emit change event so listeners can change their list values
            this.favouriteQrCodeChangeEmit();
            this.barcodeReaderService.qrCodeChangeEmit();
            return value;
        })
        .catch((error) => {
            console.error(`Could not set qr code row ${rowId} favourite to ${favourite}: ${error}`);
        });
    }

    favouriteBarcodeChangeEmit(): void {
        this.getAllFavouriteBarcodes()
        .then((allBarcodes) => {
            this._barcodeChanged.emit(allBarcodes);
        });
    }

    favouriteQrCodeChangeEmit(): void {
        this.getAllFavouriteQrCodes()
        .then((allQrCodes) => {
            this._qrCodeChanged.emit(allQrCodes);
        });
    }
}