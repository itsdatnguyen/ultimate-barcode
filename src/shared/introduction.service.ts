import { Observable } from 'rxjs/Observable';
import { SQLStorageService } from './sql-storage.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class IntroductionService {

    public INTRODUCTION_STATUS_KEY = 'hasSeenIntroduction';
    private _eventExitedIntroduction = new EventEmitter<any>();

    constructor(private sqlStorageService: SQLStorageService) { }

    setIntroductionStatus(hasSeenIntroduction: boolean): void {
        this.sqlStorageService.set(this.INTRODUCTION_STATUS_KEY, hasSeenIntroduction.toString());
    }

    hasSeenIntroduction(): Promise<any> {
        return this.sqlStorageService.get(this.INTRODUCTION_STATUS_KEY);
    }

    exitedIntroduction(): void {
        this._eventExitedIntroduction.emit(true);
    }

    onExitIntroduction(): Observable<any> {
        return this._eventExitedIntroduction.asObservable();
    }
}
