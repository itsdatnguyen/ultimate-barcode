import { Injectable } from '@angular/core';

import { SQLStorageService } from './../../shared';
import { QRCode } from "./qr-code";

@Injectable()
export class QRCodeGeneratorService {

    QR_CODE_GENERATOR_INPUT_KEY = 'qrCodeGeneratorInput';

    constructor(
        private sqlStorageService: SQLStorageService,
    ) {

    }

    getRememberedQRCodeInput(): Promise<QRCode> {
        return this.sqlStorageService.get(this.QR_CODE_GENERATOR_INPUT_KEY);
    }

    rememberQRCodeInput(qrCode: QRCode): Promise<QRCode> {
        return this.sqlStorageService.set(this.QR_CODE_GENERATOR_INPUT_KEY, qrCode);
    }
}