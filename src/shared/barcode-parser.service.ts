import { CodeEntry } from './../pages/barcode-reader/barcode-reader.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BarcodeParserService {

    sanitizeCodeEntry(data: CodeEntry): CodeEntry {
        let newCode = data;
        newCode.format = newCode.format.replace('_', '');

        // if has substring upc, set to only UPC. Barcode generator can only do formats 'UPC' and not 'UPC_A'
        if (newCode.format.indexOf('UPC') !== -1) {
            newCode.format = 'UPC';
        }

        return newCode;
    }
}