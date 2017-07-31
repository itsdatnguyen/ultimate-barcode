import { Injectable } from '@angular/core';
import { SQLStorageService } from "./sql-storage.service";

@Injectable()
export class UserSettingsService {

    constructor(private sqlStorage: SQLStorageService) {

    }
}
