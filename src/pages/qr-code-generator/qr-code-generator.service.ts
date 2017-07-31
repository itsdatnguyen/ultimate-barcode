import { SQLStorageService } from './../../shared/sql-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class QRCodeGeneratorService {

    QR_CODE_GENERATOR_INPUT_KEY = 'qrCodeGeneratorInput';

    constructor(private sqlStorageService: SQLStorageService) {

    }

    getRememberedQRCodeInput(): Promise<string> {
        return this.sqlStorageService.get(this.QR_CODE_GENERATOR_INPUT_KEY);
    }

    rememberQRCodeInput(codeInput: string): Promise<any> {
        return this.sqlStorageService.set(this.QR_CODE_GENERATOR_INPUT_KEY, codeInput);
    }
}