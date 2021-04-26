import { Component, OnInit, AfterViewInit, ElementRef, Inject, ViewChild, Optional } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';
import { DiagnosticsModelContext } from '../../modelset/diagnostics-model-context';

@Component({
  selector: 'clipcode-geo-selector-point',
  templateUrl: './geo-selector-point.component.html',
  styleUrls: ['./geo-selector-point.component.css']
})
export class GeoSelectorPointComponent implements OnInit {

  @ViewChild('mymap') mymap!: GoogleMap;
  @ViewChild('myIdentifier') myIdentifier!: ElementRef;

  selectedLatitude: number | null;
  selectedLongitude: number | null;

  center = {lat: 53.5, lng: -8};
  markerOptions = { draggable: false };
  mapOptions = { fullscreenControl: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 5;
  mapTypeId: google.maps.MapTypeId;
  
  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
               public dialogRef: MatDialogRef<GeoSelectorPointComponent>,              
               @Optional() private diag?: DiagnosticsModelContext
    ) {
    this.selectedLatitude = data.selectedLatitude;
    this.selectedLongitude = data.selectedLongitude;
    this.center = { lat: data.centerLatitude, lng: data.centerLongitude };
    
    // Decide on map type
    if (data.maptype === 'roadmap') {
      this.mapTypeId = google.maps.MapTypeId.ROADMAP;
    } else if (data.maptype === 'satellite') {
      this.mapTypeId = google.maps.MapTypeId.SATELLITE;
    } else if (data.maptype === 'terrain') {
      this.mapTypeId = google.maps.MapTypeId.TERRAIN;
    } else { // default
      this.mapTypeId = google.maps.MapTypeId.HYBRID;
    }
 }

  ngOnInit(): void {
    this.markerPositions.pop();
    if (this.selectedLatitude !== null && this.selectedLongitude !== null){
      this.markerPositions.push({lat: this.selectedLatitude, lng: this.selectedLongitude});
      this.center = {lat: this.selectedLatitude, lng: this.selectedLongitude};
      this.zoom = 10;
    } else {
      // this.center = {lat: 53.6, lng: -8.1};
      this.zoom = 6.7;
    }
  }

  onSelectCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});

    navigator.geolocation.getCurrentPosition(
      ( p ) => {
        this.center.lat = p.coords.latitude;
        this.center.lng = p.coords.longitude;

        this.addMarkerX(new google.maps.LatLng(this.center));
        // console.log('onZoomToCurrentLocation: lat = '
        //  + this.center.lat.toString()
        //  + '; lng: ' + this.center.lng.toString());
        // this.zoom = 12;
      },
      (err)    => console.log('geoLocation error: ' + err.message),
      {
        timeout: 1000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }

  addMarkerX(latLng: google.maps.LatLng): void {
    this.markerPositions.pop();
    this.markerPositions.push(latLng.toJSON());
    this.selectedLatitude = latLng.lat();
    this.selectedLongitude = latLng.lng();
  }

  addMarker(event: google.maps.MouseEvent): void {
    this.markerPositions.pop();
    this.markerPositions.push(event.latLng.toJSON());
    this.selectedLatitude = event.latLng.lat();
    this.selectedLongitude = event.latLng.lng();
  }

  removeLastMarker(): void {
    this.markerPositions.pop();
    this.selectedLatitude = null;
    this.selectedLongitude = null;
  }

  onOK(): void {
    console.log('this.selectedLatitude = ' + this.selectedLatitude?.toString() + '; this.selectedLongitude = ' + this.selectedLongitude?.toString());

    this.dialogRef.close({currentLatitude: this.selectedLatitude, currentLongitude: this.selectedLongitude});
  }

  onCancel(): void {
    this.dialogRef.close({currentLatitude: -1, currentLongitude: -1});
  }
}
