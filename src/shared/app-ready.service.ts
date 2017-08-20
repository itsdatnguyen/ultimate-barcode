import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';

import 'rxjs/add/observable/of';

@Injectable()
export class AppReadyService {

    private _appReady = false;
    private _waitingForReady = new EventEmitter<any>();

    isAppReady(): Observable<any> {
        if (this._appReady === true) {
            return Observable.of({});
        } else {
            return this._waitingForReady.asObservable();
        }
    }

    enableAppReady(): void {
        this._appReady = true;
        this._waitingForReady.emit();
    }
}