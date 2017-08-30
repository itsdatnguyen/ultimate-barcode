import { Injectable } from '@angular/core';
import * as vCardParser from 'vcardparser';


@Injectable()
export class VCardParserService {

    constructor() {

    }

    parseString(data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            vCardParser.parseString(data, (error, json) => {
                resolve(json);
                
                if (error) {
                    reject(error);
                }
            });
        });    
    }
}