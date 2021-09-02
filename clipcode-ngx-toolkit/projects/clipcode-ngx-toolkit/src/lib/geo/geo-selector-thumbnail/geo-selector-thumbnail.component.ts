/// <reference types="googlemaps" />

import { Component, OnInit, AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { GeoSelectorPointComponent } from '../geo-selector-point/geo-selector-point.component';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';

import { GeoUtil } from './geo-util';

@Component({
  selector: 'clipcode-geo-selector-thumbnail',
  templateUrl: './geo-selector-thumbnail.component.html',
  styleUrls: ['./geo-selector-thumbnail.component.css']
})
export class GeoSelectorThumbnailComponent implements OnInit, AfterViewInit {
  @ViewChild('mymap') mymap!: GoogleMap;

  center = {lat: 53.5, lng: -8};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 5;
  display?: google.maps.LatLngLiteral;

  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;

  @Input() initialLatitude: number | null = null;
  @Input() initialLongitude: number | null = null;
  @Input() centerLatitude: number | null = null;
  @Input() centerLongitude: number | null = null;

  @Output() updateLocation = new EventEmitter<{lat: number, lng: number}>();
  @Output() updateCounty = new EventEmitter<{county: string}>();

  selectedLatitude: number | null = null;
  selectedLongitude: number | null = null;
  
  constructor(public dialog: MatDialog) { 
    if (this.centerLatitude != null && this.centerLongitude != null) {
      this.center = {lat: this.centerLatitude, lng: this.centerLongitude};
    } 
  }

  ngOnInit(): void {
    this.selectedLatitude = this.initialLatitude;
    this.selectedLongitude = this.initialLongitude;

    this.markerPositions.pop();
    if (this.selectedLatitude != null && this.selectedLongitude != null){
      this.markerPositions.push({lat: this.selectedLatitude, lng: this.selectedLongitude});
      this.center.lat = this.selectedLatitude;
      this.center.lng = this.selectedLongitude;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(
      () => this.mapTypeId = google.maps.MapTypeId.ROADMAP,
      0);
  }

  
  onShowLocationPicker(maptypeparam: string): void {
    const dialogRef = this.dialog.open(
      GeoSelectorPointComponent,
      {
        // width: '100vw', height: '100vh',
        // maxWidth: '100vw !important',
        width: '100%',
        height: '100%',
        maxWidth: '100% !important',
        maxHeight: '100% !important',
       data: {
          selectedLatitude: this.selectedLatitude,
          selectedLongitude: this.selectedLongitude,
          centerLatitude: this.center.lat,
          centerLongitude: this.center.lng,
          maptype: maptypeparam,
        },
        panelClass: 'myapp-no-padding-dialog'
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.currentLatitude !== -1 && result.currentLongitude !== -1) {
          this.selectedLatitude = result.currentLatitude;
          this.selectedLongitude = result.currentLongitude;

          this.markerPositions.pop();
          if (this.selectedLatitude != null && this.selectedLongitude != null) {
            this.markerPositions.push({lat: this.selectedLatitude, lng: this.selectedLongitude });
            this.center = {lat: this.selectedLatitude, lng: this.selectedLongitude};

            const myGeoCoder = new google.maps.Geocoder();
            myGeoCoder.geocode({ location: this.center }, ( result, status) => {
              // console.log('GeoCoder callback ===================================');
              // console.log('GeoCoder status = ' + status.toString());
              // console.log('GeoCoder result = ' + result.toString());
              if (result) {   
                // GeoUtil.dumpGeocodedData(result as Array<google.maps.GeocoderResult>);                
               
                if (this.selectedLatitude != null && this.selectedLongitude != null) {
                  // console.log('dialogRef.afterClosed: about to call emit');
                  this.updateLocation.emit({lat: this.selectedLatitude, lng: this.selectedLongitude});
                  // console.log('dialogRef.afterClosed: after calling emit');
                  this.getGeocodedCounty(this.center, result as Array<google.maps.GeocoderResult>);
               } else {
                  // console.log('dialogRef.afterClosed:result is empty');
                  if (this.selectedLatitude != null && this.selectedLongitude != null) {
                    this.updateLocation.emit({lat: this.selectedLatitude, lng: this.selectedLongitude});
                 }
               }
             }
            });
          }
        }
      }
    });
  }

  niPlaces(location: {lat: number, lng: number}): string {
    let county = ''; 
    let finishedProcessing = false; 
    let timeoutCount = 0;

    this.mymap.data.loadGeoJson(
      '/pwa/raptor-monitor/OSNI_Open_Data_-_50K_Boundaries_-_NI_Counties.geojson', {},
      (features: google.maps.Data.Feature[]) => {
        features.forEach ( f => { 
          if (county == ''){
            const g = f.getGeometry();
            if (g.getType().toLowerCase() == 'polygon'){
              if (GeoUtil.checkPolygon(
                  new google.maps.LatLng(location.lat, location.lng), 
                  (g as google.maps.Data.Polygon))) {
                county = f.getProperty('CountyName');
                // console.log('ni places: /Polygon/ county : ' + county);
              };
            } else if (g.getType() == 'MultiPolygon'){

              if (GeoUtil.checkMultiPolygon(
                new google.maps.LatLng(location.lat, location.lng), 
                (g as google.maps.Data.MultiPolygon))) {
              county = f.getProperty('CountyName');
              // console.log('ni places: /MultiPolygon/ county : ' + county);
            };

            }
          }
          // else ignore
        });
        
        this.mymap.data.forEach ( feature  => this.mymap.data.remove(feature)); // remove NI map

        if (county == 'ANTRIM') { county = 'Antrim';}
        else if (county == 'ARMAGH') { county = 'Armagh';}
        else if (county == 'LONDONDERRY') { county = 'Derry/Londonderry';}
        else if (county == 'DOWN') { county = 'Down';}
        else if (county == 'FERMANAGH') { county = 'Fermanagh';}
        else if (county == 'TYRONE') { county = 'Tyrone';}
        
        this.updateCounty.emit({county: county});
        finishedProcessing = true;
      });   

    return county;
  }

  removeCoAndCounty(county: string) {
    let countyPlus = county;
    if (county.substring(0, 'County '.length) == 'County '){
      countyPlus = county.substring('County '.length);
    }

    if (county.substring(0, 'Co. '.length) == 'Co. '){
      countyPlus = county.substring('Co. '.length);
     }  

    return countyPlus;
  }

  is26CountyOrNI(countyOrNI: string): boolean {
    if (countyOrNI == 'Northern Ireland'){
      return true;
    }

    const countyPlus = this.removeCoAndCounty(countyOrNI);

    const counties26 = [
      'Carlow', 'Cavan', 'Clare', 'Cork', 'Donegal', 'Dublin',
      'Galway', 'Kerry', 'Kildare', 'Kilkenny', 'Laois', 'Leitrim', 'Limerick',
      'Longford', 'Louth', 'Mayo', 'Meath', 'Monaghan', 'Offaly', 'Roscommon',
      'Sligo', 'Tipperary', 'Waterford', 'Westmeath', 'Wexford', 'Wicklow'];
 
    if (counties26.includes ( countyPlus )) {
      return true;
    }

    return false;
  }

  getGeocodedCounty(
    zz: {lat: number, lng: number},
    typedResult: Array<google.maps.GeocoderResult>): string {

    let administrative_area_level_1 = '';
    // let administrative_area_level_2 = '';
    if (typedResult.length > 0) {
      typedResult.forEach( tr => {

        if (tr.address_components) {
          if (tr.address_components.length>0){
            tr.address_components.forEach( ac => { 

              if (administrative_area_level_1 == ''){
                if (ac.types && ac.long_name != '' && ac.long_name != undefined 
                    && ac.types.includes ('administrative_area_level_1')
                    && this.is26CountyOrNI(ac.long_name ) ){
                      administrative_area_level_1 = ac.long_name;
                }
              }

       //       if (administrative_area_level_2 == ''){
         //       if (ac.types && ac.long_name != '' && ac.long_name != undefined 
           //         && ac.types.includes ('administrative_area_level_2')){
             //         administrative_area_level_2 = ac.long_name;
           //   }

          //  }
            });
          }
        }
      });
    }

    if (administrative_area_level_1 == '') {
      return '';
    }

    if (administrative_area_level_1 == 'Northern Ireland') {
    //  console.log('getGeocodedCounty: administrative_area_level_2 = ' + administrative_area_level_2);
      // administrative_area_level_1 = administrative_area_level_2;

      administrative_area_level_1 = this.niPlaces(zz); // administrative_area_level_1);     
    } else {
      if (administrative_area_level_1.substring(0, 'County '.length) == 'County '){
        administrative_area_level_1 = administrative_area_level_1.substring('County '.length);
      }
      if (administrative_area_level_1.substring(0, 'Co. '.length) == 'Co. '){
        administrative_area_level_1 = administrative_area_level_1.substring('Co. '.length);
      }
      // console.log('getGeocodedCounty: this.updateCounty.emit({county: ' +  administrative_area_level_1 + '});');
      this.updateCounty.emit({county: administrative_area_level_1});
    }
    
    return administrative_area_level_1;
  }

  onSelectCurrentLocation(): void {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});

    navigator.geolocation.getCurrentPosition(
      ( p ) => {
        this.selectedLatitude = p.coords.latitude;
        this.selectedLongitude = p.coords.longitude;

        this.markerPositions.pop();
        if (this.selectedLatitude != null && this.selectedLongitude != null) {
          this.markerPositions.push({lat: this.selectedLatitude, lng: this.selectedLongitude });
          this.center = {lat: this.selectedLatitude, lng: this.selectedLongitude};

          // this.mymap..data.getFeatureById
          const myGeoCoder = new google.maps.Geocoder();
          myGeoCoder.geocode({ location: this.center }, ( result, status) => {
            // console.log('GeoCoder callback ===================================');
            // console.log('GeoCoder status = ' + status.toString());
            // console.log('GeoCoder result = ' + result.toString());
            if (result) {
              // GeoUtil.dumpGeocodedData(result as Array<google.maps.GeocoderResult>);
              if (this.selectedLatitude != null && this.selectedLongitude != null) {
                // console.log('Thumbnail: onSelectCurrentLocation : About to call this.updateLocation.emit');
                this.updateLocation.emit({lat: this.selectedLatitude, lng: this.selectedLongitude});
                // console.log('Thumbnail: onSelectCurrentLocation : after calling this.updateLocation.emit');
                this.getGeocodedCounty(this.center, result as Array<google.maps.GeocoderResult>);
              }
            } else {
              // console.log('result is empty');
              if (this.selectedLatitude != null && this.selectedLongitude != null) {
                this.updateLocation.emit({lat: this.selectedLatitude, lng: this.selectedLongitude});
              }
            }
          });
        }
      },
      (err)    => console.log('geoLocation error: ' + err.message),
      {
        timeout: 1000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }
}
