import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { DiagnosticsModelContext } from '../modelset/diagnostics-model-context';

// NOTE: angular.json needs:
// "scripts": [
//    "node_modules/@googlemaps/markerclustererplus/dist/index.min.js",
// ]

export class GeoServiceOptions {
  constructor(
    public readonly apiKey: string,
    public readonly drawing: boolean = true, 
    public readonly geometry: boolean = true, 
    public readonly places: boolean = true,
    public readonly visualization: boolean = true,
    public readonly markerclusterer: boolean = true) { }
}

export enum GeoServiceStatus {
  LOAD_NOT_ATEMPTED_YET,
  LOAD_API_MAPS_ATTEMPT_IN_PROGRESS, 
  LOAD_API_MAPS_SUCCEEDED,
  LOAD_API_MAPS_FAILED
}

const API_MAPS_INIT_STRING = 'https://maps.googleapis.com/maps/api/js?key=';

@Injectable({
  providedIn: 'root'
})
export class GeoService {
  private apiLoaded$: Observable<boolean> | null = null;
  private status: GeoServiceStatus = GeoServiceStatus.LOAD_NOT_ATEMPTED_YET;

  constructor(
    private options: GeoServiceOptions,
    private httpClient: HttpClient,
    @Optional() private diag?: DiagnosticsModelContext) { 
      // this.diag?.trace('', '', '', 'GeoService.constructor called');
  }
  
  checkAPILoad(): Observable<boolean> {
  //  this.diag?.trace('', '', '', 
  //  this.apiLoaded$? 'GeoService.checkAPIMapsLoad called - apiMapsLoaded is NOT NULL' 
  //                : 'GeoService.checkAPIMapsLoad called - apiMapsLoaded is NULL');

    if (!this.apiLoaded$) {
      this.status = GeoServiceStatus.LOAD_API_MAPS_ATTEMPT_IN_PROGRESS;
      this.apiLoaded$ = this.httpClient.jsonp(this.getAPIString(), 'callback')
        .pipe(
          shareReplay({bufferSize: 1, refCount: true}),      
          map(() => { 
            this.status = GeoServiceStatus.LOAD_API_MAPS_SUCCEEDED;
            // this.diag?.trace('', '', '', 'GeoService.apiLoaded: GeoServiceStatus.LOAD_API_MAPS_SUCCEEDED');
            return true; }),
          catchError(() => { 
            this.status = GeoServiceStatus.LOAD_API_MAPS_FAILED;
            this.diag?.trace('', '', '', 'GeoService.apiLoaded: GeoServiceStatus.LOAD_API_MAPS_FAILED');
            return of(false); })
        );
        // Only wish to init once. Need shareReplay to avoid this error:
        // -- "You have included the Google Maps JavaScript API multiple times on this page. 
        // --  This may cause unexpected errors."
    }
    return this.apiLoaded$ as Observable<boolean>;
  }
  
  retryAPILoad(): Observable<boolean> {
    this.apiLoaded$ = null;
    this.status = GeoServiceStatus.LOAD_NOT_ATEMPTED_YET;
    return this.checkAPILoad();
  }

  getStatus(): GeoServiceStatus {
    return this.status;
  }
 
  private getAPIString(): string {
    // 
    if (this.options.apiKey === undefined ||  this.options.apiKey == null || this.options.apiKey ==''){
      this.diag?.trace('', '', '', 'GeoService.getAPIString(): ERROR - apiKey is required');
      return '';
    }
    let librariesString = '';
    if (this.options.drawing === undefined || this.options.drawing) {
      librariesString = '&libraries=drawing';
    }
    if (this.options.geometry === undefined || this.options.geometry) {
      if (librariesString == '') {
        librariesString = '&libraries=geometry';
      } else {
        librariesString += ',geometry';
      }
    }
    if (this.options.places === undefined || this.options.places) {
      if (librariesString == '') {
        librariesString = '&libraries=places';
      } else {
        librariesString += ',places';
      }
    }
    if (this.options.visualization === undefined || this.options.visualization) {
      if (librariesString == '') {
        librariesString = '&libraries=visualization';
      } else {
        librariesString += ',visualization';
      }
    }
 
    // Note we do not trace apiKey as we do not want to see it in trace files
    // this.diag?.trace('', '', '', 'GeoService.getAPIString(): librariesString = ' + librariesString);

    let apiLoadString = API_MAPS_INIT_STRING + this.options.apiKey;
 
    if (librariesString != ''){
      apiLoadString += librariesString;
    }

    return apiLoadString;
  }
}
