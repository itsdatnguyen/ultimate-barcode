import { SQLStorageService } from './sql-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StatisticsService {

    NUMBER_OF_SCANS_KEY = 'numberOfScans';
    HAS_RATED_APP_KEY = 'hasRatedApp';

    constructor(private sqlStorage: SQLStorageService) { }

    get numberOfScans(): Promise<number> {
        return this.sqlStorage.get(this.NUMBER_OF_SCANS_KEY);
    }

    incrementNumberOfScans(): Promise<number> {
        return this.sqlStorage.get(this.NUMBER_OF_SCANS_KEY).then((scans) => {
            if (scans != null) {
                return this.sqlStorage.set(this.NUMBER_OF_SCANS_KEY, scans + 1);
            } else {
                return this.sqlStorage.set(this.NUMBER_OF_SCANS_KEY, 1);
            }
        });
    }

    get hasRatedApp(): Promise<boolean> {
        return this.sqlStorage.get(this.HAS_RATED_APP_KEY).then((ratedApp) => {
            if (ratedApp != null) {
                return true;
            }
        })
    }
    
    userSuccessfullyRatedApp(): void {
        this.sqlStorage.set(this.HAS_RATED_APP_KEY, true);
    }
}