import { Injectable } from '@angular/core';

import * as VCard from 'vcards-js';

@Injectable()
export class VCardGeneratorService {

    constructor() {

    }

    createVCard(): any {
        return VCard();
    }
}