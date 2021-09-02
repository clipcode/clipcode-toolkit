import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable } from 'rxjs';
import { mapTo, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityStatusService {

  constructor() { }

  createObservable(): Observable<boolean> {
    return merge (
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false)))
        .pipe(startWith(this.currentStatus()));
  }

  currentStatus() : boolean {
    return navigator.onLine;
  }
}
