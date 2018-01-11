import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RefreshService {
    private refreshSource = new Subject<boolean>();

    refreshRequested = this.refreshSource.asObservable();

    refresh(value: boolean) {
        this.refreshSource.next(value);
    }
}