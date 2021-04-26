import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

import { DiagnosticsModelContext } from '../../modelset/diagnostics-model-context';
import { ConnectivityStatusService } from '../../shared/connectivity-status.service';
import { GeoService } from '../geo.service';
import { MatDialog } from '@angular/material/dialog';
import { GeoSelectorAreaComponent } from '../geo-selector-area/geo-selector-area.component';
import { GeoSelectorPointComponent } from '../geo-selector-point/geo-selector-point.component';

export enum GeoSelectorKind {
  GEO_SELECTOR_POINT=0,
  GEO_SELECTOR_AREA=1
}

export class GeoSelectorOptions {
  showThumbnail: boolean = true;
  kind: GeoSelectorKind = GeoSelectorKind.GEO_SELECTOR_POINT;
  isEditable: boolean = true;
} 

@Component({
  selector: 'clipcode-geo-selector',
  templateUrl: './geo-selector.component.html',
  styleUrls: ['./geo-selector.component.css']
})
export class GeoSelectorComponent implements OnInit {
  @Input() geoSelectorOptions: GeoSelectorOptions | null = null;
  @Input() initialLatitude: number | null = null;
  @Input() initialLongitude: number | null = null;
  @Input() centerLatitude: number | null = null;
  @Input() centerLongitude: number | null = null;

  @Output() updateSelectedPoint = new EventEmitter<{lat: number, lng: number}>();
  @Output() updateSelectedRegion = new EventEmitter<{selectedRegion: string}>();

  apiLoaded$: Observable<boolean>;
  connected$: Observable<boolean>;
  center = {lat: 53.5, lng: -8};

  kindType = GeoSelectorKind;

  constructor(
    private snackBar: MatSnackBar,
    private connectivityStatusService: ConnectivityStatusService,
    private geoService: GeoService,
    private dialog: MatDialog,
    @Optional() private diag?: DiagnosticsModelContext,
  ) { 

    if (this.centerLatitude != null && this.centerLongitude != null) {
      this.center = {lat: this.centerLatitude, lng: this.centerLongitude};
    }

    if (this.geoSelectorOptions == null) { 
      this.geoSelectorOptions = new GeoSelectorOptions();
    }
    
    // only attempt init if we are online
    this.connected$ = connectivityStatusService.createObservable();
    this.apiLoaded$ = new Observable<boolean>(); 

    this.connected$.subscribe ( isConnected => {
      if (isConnected) { 
        diag?.trace('','','', 'have become connected');
        this.apiLoaded$ = geoService.checkAPILoad(); 
      } else {
        diag?.trace('','','', 'have become disconnected');
      }
    });
  }

  ngOnInit(): void { }

  onRetry() {
    this.diag?.trace('','','', 'GeoSelectorComponent.onRetry');
    if (!this.connectivityStatusService.currentStatus) {
      this.snackBar.open('Internet is not available', 'Continue', {duration: 200 });
    } else {
      this.apiLoaded$ = this.geoService.retryAPILoad();       
    }
  }

  onShowSelectorPoint() {
    const dialogRef = this.dialog.open(
      GeoSelectorPointComponent,
      {
        width: '100%',
        height: '100%',
        maxWidth: '100% !important',
        maxHeight: '100% !important',
        data: {
          selectedLatitude: this.initialLatitude,
          selectedLongitude: this.initialLongitude,
          centerLatitude: this.center.lat,
          centerLongitude: this.center.lng,
          maptype: 'roadmap',
        },
        panelClass: 'myapp-no-padding-dialog'
      });
  }
  
  onShowSelectorArea() {
    const dialogRef = this.dialog.open(
      GeoSelectorAreaComponent,
      {
        width: '100%',
        height: '100%',
        maxWidth: '100% !important',
        maxHeight: '100% !important',       
        data: {
          centerLatitude: this.center.lat,
          centerLongitude: this.center.lng
        },
        panelClass: 'myapp-no-padding-dialog'
      });
  }
  
  onUpdateLocation($event : {lat: number, lng: number}) {
    this.updateSelectedPoint.emit ($event);
  }
}
