import { SQLStorageService } from './sql-storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IntroductionService {

    public INTRODUCTION_STATUS_KEY = 'hasSeenIntroduction';

    constructor(private sqlStorageService: SQLStorageService) { }

    setIntroductionStatus(hasSeenIntroduction: boolean): void {
        this.sqlStorageService.set(this.INTRODUCTION_STATUS_KEY, hasSeenIntroduction.toString());
    }

    hasSeenIntroduction(): Promise<any> {
        return this.sqlStorageService.get(this.INTRODUCTION_STATUS_KEY);
    }
}
