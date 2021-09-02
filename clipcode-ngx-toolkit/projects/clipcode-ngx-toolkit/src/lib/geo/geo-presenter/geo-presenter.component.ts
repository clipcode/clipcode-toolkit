import { Component, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DiagnosticsModelContext } from '../../modelset/diagnostics-model-context';
import { ConnectivityStatusService } from '../../shared/connectivity-status.service';
import { PresenterDataItem } from '../../shared/presenter-data-item';
import { GeoService } from '../geo.service';

export class GeoPresenterOptions {
  isEditable: boolean = true;
  poiIcon: string = '';
} 

@Component({
  selector: 'clipcode-geo-presenter',
  templateUrl: './geo-presenter.component.html',
  styleUrls: ['./geo-presenter.component.css']
})
export class GeoPresenterComponent implements OnInit {

  @Input() geoPresenterOptions: GeoPresenterOptions | null = null;
  @Input() centerLatitude: number | null = null;
  @Input() centerLongitude: number | null = null;
 
  @Input() dataItems: Observable<PresenterDataItem[]> | null = null;

  @Output() action = new EventEmitter<{actionVerb: string, actionItem: string}>();
 
  apiLoaded$: Observable<boolean>;
  connected$: Observable<boolean>;
  center = {lat: 53.5, lng: -8};

  constructor(
    private snackBar: MatSnackBar,
    private connectivityStatusService: ConnectivityStatusService,
    private geoService: GeoService,
    private dialog: MatDialog,
    @Optional() private diag?: DiagnosticsModelContext) { 
  
    if (this.centerLatitude != null && this.centerLongitude != null) {
      this.center = {lat: this.centerLatitude, lng: this.centerLongitude};
    }
  
    // only attempt init if we are online
    this.connected$ = connectivityStatusService.createObservable();
    this.apiLoaded$ = new Observable<boolean>(); 

    this.connected$.subscribe ( isConnected => {
      if (isConnected) { 
        // diag?.trace('','','', 'have become connected');
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
      this.snackBar.open('Internet is not available', 'Continue', {duration: 5000 });
    } else {
      this.apiLoaded$ = this.geoService.retryAPILoad();       
    }
  }
  
  onAction(event: any) {
     this.action.emit (event);
  }
}
