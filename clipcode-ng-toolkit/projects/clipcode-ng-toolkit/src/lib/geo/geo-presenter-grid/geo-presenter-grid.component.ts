import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, NgZone, EventEmitter, Output, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';

import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

import { MapDirectionsService, MapGeocoder } from '../../../public-api';
import { GeoPresenterLayeringComponent, GeoLayerSelection } from '../geo-presenter-layering/geo-presenter-layering.component';
import { PresenterDataItem } from '../../shared/presenter-data-item';
import { GeoPresenterOptions } from '../geo-presenter/geo-presenter.component';

@Component({
  selector: 'clipcode-geo-presenter-grid',
  templateUrl: './geo-presenter-grid.component.html',
  styleUrls: ['./geo-presenter-grid.component.css']
})
export class GeoPresenterGridComponent implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;
  @ViewChild(GoogleMap) actualMap!: GoogleMap;
  @ViewChild('placeAutoComplete') public placeAutoCompleteElementRef!: ElementRef;

  @Input() dataItems: Observable<PresenterDataItem[]> | null = null;
  @Input() geoPresenterOptions: GeoPresenterOptions | null = null;

  currentPresenterDataItems: PresenterDataItem[] | null = null;
  
  @Output() action = new EventEmitter<{actionVerb: string, actionItem: string}>();

  directionsResults$: Observable<google.maps.DirectionsResult|undefined> | undefined = undefined;
  currentSelectedSummaryIndex = -1;
  observationTotalCount =  0;
  observationWithLocationCount = 0;
  observationWithoutLocationCount = 0;


  geocodeAddress = '';

  markerClustererImagePath =
  'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m';

  showBicycling = false;
  showTraffic = false;
  showTransit = false;

  poiShow = false;
  poiLocation = {lat: 53.5, lng: -7};
  poiSnackbarMessageShow = false; 

  typeInfoString =    '<NOT SET>';
  subjectInfoString = '<NOT SET>';
  dateInfoString =    '<NOT SET>';

  center = {lat: 53.5, lng: -8};
  
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptionsList: google.maps.MarkerOptions[] = []; 
  
  mapOptions = {
    fullscreenControl: true,
    streetViewControl: true,
    zoomControl: true,
    mapTypeControl: true,
    rotateControl: true,
    scaleControl: true
  };

  zoom = 6.3;
  showGeoTools = false;
  outputText = '';
  heatmapOptions = {radius: 5};
  heatmapData: google.maps.LatLngLiteral[] = new Array<google.maps.LatLngLiteral>();
  markerDisplayMode = 'clusterer';  // marker, heatmap

  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;

  display?: google.maps.LatLngLiteral;

  isShareSupported = false;
  isClipboardWriteSupported = false;

  onClone() {
    this.action.emit ({
      actionVerb: 'clone', 
      actionItem: this.currentSelectedSummaryIndex.toString()
    });
  }

  onEdit() {
    this.action.emit ({
      actionVerb: 'edit', 
      actionItem: this.currentSelectedSummaryIndex.toString()
    });
  }

  onArchive() {
    this.action.emit ({
      actionVerb: 'archive', 
      actionItem: this.currentSelectedSummaryIndex.toString()
    });}

  onDelete() {
    this.action.emit ({
      actionVerb: 'delete', 
      actionItem: this.currentSelectedSummaryIndex.toString()
    });
  }

  constructor(
    private snackBar: MatSnackBar,
    public mapDirectionsService: MapDirectionsService,
    geocoder: MapGeocoder,
    public dialog: MatDialog, 
    private http: HttpClient,
    private ngZone: NgZone) {
    
    let mynav: any;
    mynav = window.navigator;

    if (mynav && mynav.share) {
      this.isShareSupported = true;
      console.log('isShareSupported set to true');
    }

    if (mynav && mynav.clipboard && mynav.clipboard.writeText) {
      this.isClipboardWriteSupported = true;
    }

    if (this.geoPresenterOptions == null) { 
      this.geoPresenterOptions = new GeoPresenterOptions();
      this.geoPresenterOptions.poiIcon = 'assets/poi-dot.png';
    }
  }
  
  ngOnInit(): void {
 
    this.getList();    
  }

  getList(): void {
    console.log('getList() entering');
    if (!this.dataItems) {
      console.log('NO dataItems observable provided');
    }

    if (this.dataItems) {
      console.log('dataItems observable provided');
      this.dataItems.subscribe( olist => {
        console.log('updated dataItems detected');
        this.currentPresenterDataItems = olist;
        this.filterList();
  
        this.heatmapData = new Array<google.maps.LatLngLiteral>();
        this.currentPresenterDataItems?.forEach ( s => {
          if (s.latitude != null && s.longitude != null) {
            this.heatmapData.push( {lat: s.latitude, lng: s.longitude});
          }
        });
      });
    }
  }
  
  addMarkerOption(num: string,mapSymbol: string): void {
    this.markerOptionsList.push(
      {
        draggable: false,
        icon: mapSymbol,
        label: num
    });
  }
    
  filterList(): void {
    console.log('filterList entering');
    this.observationWithLocationCount = 0;
    this.observationWithoutLocationCount = 0;
    if (this.currentPresenterDataItems == null){
      return;
    }
  
    this.markerPositions = [];
    this.markerOptionsList = [];
  
    if (this.currentPresenterDataItems.length === 0) {
      return;
    }
  
    let index = 0;
  
    while (index < this.currentPresenterDataItems.length) {
      if ( this.currentPresenterDataItems[index].latitude &&
          this.currentPresenterDataItems[index].longitude &&
          this.currentPresenterDataItems[index].mapSymbol ) {
       
        this.markerPositions.push({
          lat: this.currentPresenterDataItems[index].latitude as number,
          lng: this.currentPresenterDataItems[index].longitude as number});

        this.addMarkerOption(index.toString(), 
          this.currentPresenterDataItems[index].mapSymbol!);
          this.observationWithLocationCount++;
      } else {
        this.observationWithoutLocationCount++;
      }
      index++;
    }
    this.observationTotalCount = this.observationWithLocationCount + this.observationWithoutLocationCount;
  
    if (this.poiShow) {
      console.log('FilterList poiShow = true ');
      console.log((this.poiLocation.lat as number).toString());
      console.log((this.poiLocation.lng as number).toString());
      console.log(this.geoPresenterOptions?.poiIcon);
    } else {
      console.log('FilterList poiShow = FALSE');    
    }
    if (this.poiShow && this.geoPresenterOptions ) {
      this.markerPositions.push({
        lat: this.poiLocation.lat as number,
        lng: this.poiLocation.lng as number});
     
      this.markerOptionsList.push(
      {
        draggable: false,
        icon: this.geoPresenterOptions.poiIcon, 
        label: ''
        });
    }
  
    // console.log('filterList this.observationTotalCount = ' + this.observationTotalCount.toString());
    // console.log('filterList this.observationWithLocationCount = ' + this.observationWithLocationCount.toString());
    // console.log('filterList this.observationWithoutLocationCount = ' + this.observationWithoutLocationCount.toString());
  }

  ngAfterViewInit(): void { 
    if (google.maps.places === undefined || google.maps.places == null) {
      console.log('google.maps.places NULL');
    } 
      let placeAutoComplete = 
        new google.maps.places.Autocomplete(
          this.placeAutoCompleteElementRef.nativeElement);

      placeAutoComplete.addListener("place_changed", 
        () => { this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = placeAutoComplete.getPlace();
          if (place.geometry !== undefined) {            
            this.actualMap.center = 
              { lat: place.geometry.location.lat(), 
                lng: place.geometry.location.lng()}; 
                this.actualMap.zoom = 10;
  
          }
        });
      });

    setTimeout(
      () => {this.mapTypeId = google.maps.MapTypeId.ROADMAP; },
      0);
  }
  
  hideOutputText() {
    this.outputText = '';
    this.directionsResults$ = undefined;
    this.geocodeAddress = '';
  }

  geoToolsToggle() {
    this.showGeoTools = ! this.showGeoTools; 
  }

  poiToggle() {
    if (!this.poiShow) {
      if (!this.poiSnackbarMessageShow) {
        this.snackBar.open('The Actions menu for each marker offers Distance and Directions features, which involves two points, the selected marker and another point - called Point Of Interest (POI) - which you need to set by simply clicking on the map', 
          'Continue', {duration: 10000 });
        this.poiSnackbarMessageShow = true;
      }  
      this.hideOutputText();      
    }

    this.poiShow = !this.poiShow;
    this.filterList();
  }

  poiChange(event: google.maps.MouseEvent): void {
    this.poiShow = true; // always show POI, if user clicks on map
    this.poiLocation.lat = event.latLng.lat();
    this.poiLocation.lng = event.latLng.lng();
    this.filterList();
  }

  currentLocationSetPOI() {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});

    navigator.geolocation.getCurrentPosition(
      ( p ) => {
        this.poiLocation.lat = p.coords.latitude;
        this.poiLocation.lng = p.coords.longitude;    
        this.poiShow = true; // always show POI, if user set POI to current location
        this.filterList();
      },
      (err)    => alert('geoLocation error: ' + err.message),
      {
        timeout: 1000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }

  currentLocationCenter() {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});

    navigator.geolocation.getCurrentPosition(
      ( p ) => {
        this.actualMap.center = { lat: p.coords.latitude, lng: p.coords.longitude};   
      },
      (err)    => alert('geoLocation error: ' + err.message),
      {
        timeout: 1000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }

  currentLocationCenterZoom() {
    navigator.geolocation.getCurrentPosition(() => {}, () => {}, {});

    navigator.geolocation.getCurrentPosition(
      ( p ) => {
        this.actualMap.center = { lat: p.coords.latitude, lng: p.coords.longitude};   
        this.actualMap.zoom = 10;
      },
      (err)    => alert('geoLocation error: ' + err.message),
      {
        timeout: 1000,
        enableHighAccuracy: true,
        maximumAge: 0
      }
    );
  }

  poiCenter() {
    this.actualMap.center = { lat: this.poiLocation.lat, lng: this.poiLocation.lng};   
  }

  poiCenterZoom() {
    this.actualMap.center = { lat: this.poiLocation.lat, lng: this.poiLocation.lng};   
    this.actualMap.zoom = 10;
  }

  onGeocode() {
    if (this.geocodeAddress == '') {
      this.snackBar.open('Please enter location to request', 'Continue', {duration: 2000 });        
      return;
    }
   
    const geocoder = new google.maps.Geocoder();
    
    this.outputText = 'Requesting geocode data - please wait ...';
  
    geocoder.geocode( { address:  this.geocodeAddress }, 
      (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      let msg = '';
      if (status == google.maps.GeocoderStatus.OK) {
        if (results == null || results.length == 0) {
          msg = 'Empty Geocode Result';
        } else if (results.length == 1) {
          msg = this.makeGeocodeGeometryString(results);
          
        } else {
          msg = results.length.toString() + 
                ' geocode results found\n' + 
                this.makeGeocodeGeometryString(results);
        }

      } else {
        msg = 'ERROR - ' + status;
      }
      this.outputText = msg;       
    });
  }

  onDistance() {
    if (!this.currentPresenterDataItems) {
      return;
    }
  
    const selectedObj: PresenterDataItem = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    const geocoder = new google.maps.Geocoder();

    if (selectedObj.latitude == null || selectedObj.longitude == null) {
      return;
    }

    const val: google.maps.LatLngLiteral = {lat: selectedObj.latitude, lng: selectedObj.longitude};
 
    this.outputText = 'Requesting distance data - please wait ...';
 
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix( { 
      origins: [val], 
      destinations: [  {lat: this.poiLocation.lat, lng: this.poiLocation.lng}],
      travelMode: google.maps.TravelMode.DRIVING
    }, 
    (response: google.maps.DistanceMatrixResponse, status: google.maps.DistanceMatrixStatus) => {
      let msg = '';
      if (status == google.maps.DistanceMatrixStatus.OK) {
        if (response == null || response.rows == null || response.rows.length<1){
          msg = 'unexpected number of rows in response';
        } else {
          if (response.rows[0].elements == null || response.rows[0].elements.length<1) {
            msg = 'Unexpected number of elements in response row';
          } else {
            if (response.rows[0].elements[0].duration_in_traffic && response.rows[0].elements[0].duration_in_traffic.text) {
            msg = 'Row count = ' + response.rows.length.toString() +
            '\nFirst result:' +  
            '\ndistance = ' + response.rows[0].elements[0].distance.text +    
            '\nduration = ' + response.rows[0].elements[0].duration.text +    
            '\nduration_in_traffic = ' + response.rows[0].elements[0].duration_in_traffic.text;   
            } else {
              msg = 'Row count = ' + response.rows.length.toString() + 
              '\nFirst result:' +  
              '\ndistance = ' + response.rows[0].elements[0].distance.text +    
              '\nduration = ' + response.rows[0].elements[0].duration.text;
            }
          }
        }
      } else {
        msg = 'ERROR - ' + status;
      }
      this.outputText = msg;
    }); 
  }

  onDirectionsFromPOI(mode: string) {
    const myTravelMode: google.maps.TravelMode = mode as google.maps.TravelMode;

    if (!this.currentPresenterDataItems) {
      return;
    }
  
    const selectedObj: PresenterDataItem = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    if (selectedObj.latitude == null || selectedObj.longitude == null) {
      return;
    }

    const val: google.maps.LatLngLiteral = {lat: selectedObj.latitude, lng: selectedObj.longitude};

    this.outputText = 'Requesting directions data - please wait ...';
    
    const request: google.maps.DirectionsRequest = {
      origin: {lat: this.poiLocation.lat, lng: this.poiLocation.lng},
      destination: val,
      travelMode: myTravelMode,
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map( response => 
      {
        this.setDirectionText(response.result);
        return response.result;
      }));
    // mapDirectionsService.route(request).subscribe ( response => 
    // console.log('directionsResults directionsResults directionsResults'));

  }

  setDirectionText(result: google.maps.DirectionsResult | undefined) {
    if (result) {
      this.outputText = '';

      if (result.routes == null || result.routes.length==0) {
        this.outputText = 'No routes found';
        return;
      }

      this.outputText = 'Number of routes = ' + result.routes.length.toString(); 
      this.outputText += '\nFirst Route:';
      if (result.routes[0].legs == null || result.routes[0].legs.length == 0)
      {
        this.outputText += '\nUnexpected number of legs'; 
      } else {
        this.outputText += '\nNumber of legs = ' + result.routes[0].legs.length.toString();

        result.routes[0].legs.forEach ( leg => {
          if (leg.departure_time) {
            this.outputText += '\ndeparture_time: ' + leg.departure_time.text;
          }
          if (leg.arrival_time) {
            this.outputText += '\narrival_time: ' + leg.arrival_time.text;
          }
          if (leg.duration) {
            this.outputText += '\nduration: ' + leg.duration.text;
          }
          if (leg.duration_in_traffic) {
            this.outputText += '\nduration_in_traffic: ' + leg.duration_in_traffic.text;
          }
          if (leg.distance) {
            this.outputText += '\ndistance: ' + leg.distance.text;
          }

          if (leg.start_address) {
            this.outputText += '\nstart_address: ' + leg.start_address;
          }

          if (leg.start_location) {
            this.outputText += '\nstart_location: ' + leg.start_location.toString();
          }

          if (leg.end_address) {
            this.outputText += '\nend_address: ' + leg.end_address;
          }

          if (leg.end_location) {
            this.outputText += '\nend_location: ' + leg.end_location.toString();
          }

          if (leg.steps && leg.steps.length > 0) {
            this.outputText += '\nnumber of transit steps: ' + leg.steps.length.toString();
            let curIndex = 0; 
            let maxIndex = leg.steps.length;

            while (curIndex < maxIndex){
              if (leg.steps[curIndex].instructions != null){
                let instruction = leg.steps[curIndex].instructions;
                instruction = instruction.replace(/<b>/g,'');
                instruction = instruction.replace(/<\/b>/g,'');

                let travelModeStr = '';
                if (leg.steps[curIndex].travel_mode != null) {
                  if (leg.steps[curIndex].travel_mode == google.maps.TravelMode.BICYCLING) {
                    travelModeStr = 'BICYCLING';
                  } else if (leg.steps[curIndex].travel_mode == google.maps.TravelMode.DRIVING) {
                    travelModeStr = 'DRIVING';
                  } else if (leg.steps[curIndex].travel_mode == google.maps.TravelMode.TRANSIT) {
                    travelModeStr = 'TRANSIT';
                  } else if (leg.steps[curIndex].travel_mode == google.maps.TravelMode.TWO_WHEELER) {
                    travelModeStr = 'TWO_WHEELER';
                  } else if (leg.steps[curIndex].travel_mode == google.maps.TravelMode.WALKING) {
                    travelModeStr = 'WALKING';
                  }
                }
                if (travelModeStr != '') {
                  this.outputText += '\n' + instruction + ' - ' + travelModeStr;
                } else {
                  this.outputText += '\n' + instruction;
                }
              } 
              curIndex++;
            }            
          }
        });
      }
      this.outputText += '\n----------'; 

      if (result.geocoded_waypoints && result.geocoded_waypoints.length>0) {
        result.geocoded_waypoints.forEach ( wp => {
          if (wp.place_id) {
            this.outputText += '\nPlace ID: ' + wp.place_id;
          }
          if (wp.types && wp.types.length>0) {
            this.outputText += '\nNumber of Waypoint Types: ' + wp.types.length.toString();
            this.outputText += '\nFirst Type: ' + wp.types[0];
          }
        });   
      }
    } else {
      console.log('setDirectionText called with UNDEFINED');
      this.outputText='';
    }
  }

  onDirectionsToPOI(mode: string) {
    const myTravelMode: google.maps.TravelMode = mode as google.maps.TravelMode;

    if (!this.currentPresenterDataItems) {
      return;
    }
  
    const selectedObj: PresenterDataItem = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    if (selectedObj.latitude == null || selectedObj.longitude == null) {
      return;
    }

    this.outputText = 'Requesting directions data - please wait ...';

    const val: google.maps.LatLngLiteral = {lat: selectedObj.latitude, lng: selectedObj.longitude};
  
    const request: google.maps.DirectionsRequest = {
      origin: val,
      destination: {lat: this.poiLocation.lat, lng: this.poiLocation.lng},
      travelMode: myTravelMode,
      // google.maps.TravelMode.DRIVING,
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map( response => 
      {
        this.setDirectionText(response.result);
        return response.result;
      }));

    // this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map( response => response.result));
    // mapDirectionsService.route(request).subscribe ( response => 
    // console.log('directionsResults directionsResults directionsResults'));

  }

  onReverseGeocode() {
    if (!this.currentPresenterDataItems) {
      return;
    }
  
    const selectedObj: PresenterDataItem = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    const geocoder = new google.maps.Geocoder();

    if (selectedObj.latitude == null || selectedObj.longitude == null) {
      return;
    }
    
    this.outputText = 'Requesting reverse geocode data - please wait ...';
  
    const val: google.maps.LatLngLiteral = {lat: selectedObj.latitude, lng: selectedObj.longitude};
    geocoder.geocode( { location:  val }, (results: google.maps.GeocoderResult[], status: google.maps.GeocoderStatus) => {
      let msg = '';
      if (status == google.maps.GeocoderStatus.OK) {
        if (results == null || results.length == 0) {
          msg = 'Empty Geocode Result';
        } else if (results.length == 1) {
          msg = this.makeGeocodeString(results);
          
        } else {
          msg = results.length.toString() + 
                ' reverse geocode results found\n' + 
                this.makeGeocodeString(results);
        }

      } else {
        msg = 'ERROR - ' + status;
      }
      this.outputText = msg;
      // this.snackBar.open(msg, 'Continue', {duration: 2000 });        
    });
  }

  makeGeocodeGeometryString(results: google.maps.GeocoderResult[]): string {
    let msg = '';
    let firstRow = true;
    
    if (results == null || results.length == 0) {
      alert('geocode - no results found');
      return 'ERROR';
    }

    results.forEach ( result => {

      if (firstRow) {
        firstRow = false;
      } else {
        msg += '-------------------------\n';
      }

      if (result.formatted_address) {
        msg += result.formatted_address + '\n';
      }

      if (result.geometry != null && result.geometry.location != null) {
        const str = result.geometry.location.lat().toString();
        const str1 = result.geometry.location.lng().toString();
        msg += 'Latitude = ' + str + '\nLongitude = ' + str1 + '\n';
      }
    });

    return msg;
  }

  makeGeocodeString(results: google.maps.GeocoderResult[]): string {

    let msg = '';
    let firstRow = true;

    if (results == null || results.length == 0) {
      return 'ERROR - Unexpected result count';
    }

    results.forEach ( result => {

      if (firstRow) {
        firstRow = false;
      } else {
        msg += '\n--------------------------';
      }

      if (result.address_components == null || result.address_components.length == 0) {
        msg  += 'ERROR';
      } else {
        result.address_components.forEach( ac => { msg += '\n' + ac.long_name; });
      }
  });

    return msg;
  }        

  onElevation() {
    if (!this.currentPresenterDataItems) {
      return;
    }
  
    const selectedObj: PresenterDataItem = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    const geoElevation = new google.maps.ElevationService();
    const locations: Array<google.maps.LatLngLiteral | google.maps.LatLng> 
      = new Array<google.maps.LatLngLiteral | google.maps.LatLng>();
      
    if (selectedObj.latitude == null || selectedObj.longitude == null) {
      return;
    }

    this.outputText = 'Requesting elevation data - please wait ...';
     
    locations.push ( {lat: selectedObj.latitude, lng: selectedObj.longitude});

    geoElevation.getElevationForLocations ( {locations: locations}, 
      (results: google.maps.ElevationResult[], status: google.maps.ElevationStatus) => {
        let msg = '';
        if (status == google.maps.ElevationStatus.OK) {
          if (results == null || results.length == 0) {
            msg = 'Empty Elevation Result';
          } else if (results.length == 1) {
            msg = 'Elevation is: ' + results[0].elevation.toString() 
            + '\nresolution = ' + results[0].resolution.toString() 
            + '\nlatitude: ' + results[0].location.lat().toString()
            + '\nlongitude: ' + results[0].location.lng().toString();
          } else {
            msg = results.length.toString() + ' elevation results found - first one is = ' 
            + results[0].elevation.toString() 
            + '\nresolution = ' + results[0].resolution.toString() 
            + '\nlatitude: ' + results[0].location.lat().toString()
            + '\nlongitude: ' + results[0].location.lng().toString();
          }
        } else if (status == google.maps.ElevationStatus.INVALID_REQUEST) {
          msg = 'ERROR - INVALID_REQUEST';
        } else if (status == google.maps.ElevationStatus.OVER_QUERY_LIMIT) {
          msg = 'ERROR - OVER_QUERY_LIMIT';
        } else if (status == google.maps.ElevationStatus.REQUEST_DENIED) {
          msg = 'ERROR - REQUEST_DENIED';
        } else if (status == google.maps.ElevationStatus.UNKNOWN_ERROR) {
          msg = 'ERROR - UNKNOWN_ERROR';
        } else {
          msg = 'ERROR - Unexpected error';
        }
        this.outputText = msg;

//        this.snackBar.open(msg, 'Continue', {duration: 2000 });        
    });
  }

  onLayers() {
    console.log('onLayers entered');
    /*
    const options = { params: new HttpParams().set('dd', 'fsfdsfsdd') };
  this.http.get(str, options).subscribe(
      result => { 
        console.log('onLayers() - got result');
        if (result == null || result === undefined) { // } || result.length == 0) {
          console.log('onLayers() - empty result');
        } else {
          console.log('onLayers() - Result found'); // length = ' + result.length.toString());
        }
    }); */
  // this.map.data.loadGeoJson('/pwa/paw-ireland/map-of-ireland.geojson');

  const dialogRef = this.dialog.open(
    GeoPresenterLayeringComponent,
      { width: '100vw', height: '100vh',
      maxWidth: '100vw !important',
      panelClass: 'myapp-no-padding-dialog',
 //     data: { perNetworkDataCache: this.dataService.dataCache.currentNetwork }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != null) {
        const gl = result as GeoLayerSelection; 
        this.showBicycling = gl.showBicyclingLayer;
        this.showTraffic = gl.showTrafficLayer;
        this.showTransit = gl.showTransitLayer;

        if (gl.customData != '') {
          this.actualMap.data.loadGeoJson(gl.customData); 
        } else {
          console.log('gl.customData empty');
        }  
      }
    });
    console.log('onLayers leaving');
  }


  xsetLabel(num: number): google.maps.MarkerLabel {
    console.log('Called: setLabel('+num.toString()+')');
    return { text: num.toString() };
  }

  getSelectedSummaryIndex(markerIndex: number): number {
    console.log('getSelectedSummaryIndex: entering : = markerIndex' + markerIndex.toString());

    let index = 0;
    let counter = markerIndex;
    let found = false;
    if (this.currentPresenterDataItems == null){
      console.log('this.currentPresenterDataItems == null');
      return -1;
    }

    while (counter >=0 && index < this.currentPresenterDataItems.length && found !== true)
    {
      if (this.currentPresenterDataItems[index].latitude != null &&
        this.currentPresenterDataItems[index].longitude != null){
          if (counter === 0) {
            found = true;
          } else {
            counter--;
          }
      }
      if (!found) {
        index++;
      }
    }
    if (found) {
      return index;
    } else {
      return -1;
    }
  }

  onShareMetadata() {}
  
  onCopyMetadata() {}

  metadataText = '';

  openInfoWindow(marker: MapMarker): void {
    if (marker === undefined) {
      console.log('marker === undefined');
      return;
    }
    if (marker == null) {
      console.log('marker == null');
      return;
    }

    const mylabel = (marker.getLabel() as any) as string;
    if (mylabel == null) {
      console.log('mylabel == null');
      return;
    }

    // console.log('X1: mylabel.text = ' + mylabel.text);
    console.log('X1: mylabel = ' + mylabel);

    
    this.currentSelectedSummaryIndex = this.getSelectedSummaryIndex(parseInt(mylabel, 10));
    if (this.currentSelectedSummaryIndex === -1) {
      console.log('X1: this.currentSelectedSummaryIndex === -1');
      return;
    }

    if (this.currentPresenterDataItems == null) {
      return;
    }
    console.log('X1: this.currentSelectedSummaryIndex = ' + this.currentSelectedSummaryIndex);

    if (this.currentPresenterDataItems[this.currentSelectedSummaryIndex] === undefined) {
      console.log('------------------------\n');
      console.log('currentPresenterDataItems DUMP:\n');
      console.log('this.currentSelectedSummaryIndex = ' +
        this.currentSelectedSummaryIndex.toString() + '\n');
      console.log('this.currentPresenterDataItems.length = ' +
        this.currentPresenterDataItems.length.toString() + '\n');

      let index = 0;
      this.currentPresenterDataItems.forEach ( os => { 
        if (os === undefined) {
          console.log('this.currentPresenterDataItems['+ index.toString() + '] === undefined\n');
        }
        index++;
      });
      console.log('------------------------\n');

      console.log('curr is undefined - returning');
      return;
    } 
    const curr = this.currentPresenterDataItems[this.currentSelectedSummaryIndex];

    this.metadataText = '';
    if (curr.latitude != null && curr.longitude != null) {
      if (curr.type) {
        this.metadataText += 'Type: ' + curr.type;
      }

      this.metadataText += 
        '\nSubject: ' + (curr.subject as string) + 
        '\nDate: ' + (curr.date?.toString()) +
        '\nLatitude:\n' + curr.latitude.toString() + 
        '\nLongitude:\n' + curr.longitude.toString();
    } else {
      this.metadataText = 
        'Type: ' + (curr.type as string) + 
      '\nSubject: ' + (curr.subject as string) + 
      '\nDate: ' + (curr.date?.toString());
    }

    this.infoWindow.open(marker);
  }
}
