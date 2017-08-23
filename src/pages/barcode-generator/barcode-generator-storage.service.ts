import { Injectable } from '@angular/core';

import { SQLStorageService } from './../../shared/sql-storage.service';
import { Barcode } from './barcode';


@Injectable()
export class BarcodeGeneratorStorageService {

    BARCODE_GENERATOR_STORAGE_KEY = 'barcodeGeneratorStorage';

    constructor(private sqlStorageService: SQLStorageService) {

    }

    storeBarcode(barcode: Barcode): Promise<any> {
        return this.sqlStorageService.set(this.BARCODE_GENERATOR_STORAGE_KEY, barcode);
    }

    getBarcodes(): Promise<Barcode> {
        return this.sqlStorageService.get(this.BARCODE_GENERATOR_STORAGE_KEY);
    }
}