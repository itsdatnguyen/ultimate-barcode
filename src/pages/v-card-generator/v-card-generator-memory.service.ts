import { SQLStorageService } from './../../shared/sql-storage.service';
import { Injectable } from '@angular/core';

export const V_CARD_GENERATOR_MEMORY_KEY = 'vCardGeneratorMemoryKey';

@Injectable()
export class VCardGeneratorMemoryService {

    constructor(private sql: SQLStorageService) {

    }

    setVCard(vCard: any): Promise<any> {
        return this.sql.set(V_CARD_GENERATOR_MEMORY_KEY, vCard);
    }

    getVCard(): Promise<any> {
        return this.sql.get(V_CARD_GENERATOR_MEMORY_KEY);
    }
}