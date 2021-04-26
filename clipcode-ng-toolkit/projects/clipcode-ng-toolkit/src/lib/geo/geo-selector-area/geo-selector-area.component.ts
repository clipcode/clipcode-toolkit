import { Component, OnInit, ViewChild, AfterViewInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';
/// <reference types="googlemaps" />

@Component({
  selector: 'clipcode-geo-selector-area',
  templateUrl: './geo-selector-area.component.html',
  styleUrls: ['./geo-selector-area.component.css']
})
export class GeoSelectorAreaComponent implements OnInit, AfterViewInit {
  drawingManager!: google.maps.drawing.DrawingManager;
  @ViewChild(GoogleMap) map!: GoogleMap;
  center = {lat: 53.5, lng: -8};
  zoom = 6.3;
  mapTypeId: google.maps.MapTypeId = google.maps.MapTypeId.ROADMAP;
  mapOptions = { fullscreenControl: false};

  selectedLocationList: google.maps.MVCObject[] = new Array<google.maps.MVCObject>(); 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<GeoSelectorAreaComponent>) {

    this.center = { lat: data.centerLatitude, lng: data.centerLongitude };
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.drawingManager == null) {
      this.drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_LEFT,
          drawingModes: [
            google.maps.drawing.OverlayType.MARKER,
            google.maps.drawing.OverlayType.CIRCLE,
            google.maps.drawing.OverlayType.POLYGON,
            google.maps.drawing.OverlayType.POLYLINE,
            google.maps.drawing.OverlayType.RECTANGLE]
        }
      });
      if (this.map.googleMap !== undefined) {
        this.drawingManager.setMap(this.map.googleMap);
        this.map.googleMap.setOptions({fullscreenControl: false});
      } else {
        console.log('ERROR: LocationSearchComponent.ngAfterViewInit: this.map.googleMap !== undefined');
      }
    }

    google.maps.event.addListener(this.drawingManager, 'contextmenu', (c) => {
    });

    google.maps.event.addListener(this.drawingManager, 'click', (c) => {
    });

    google.maps.event.addListener(this.drawingManager, 'rightclick', (c) => {
     });

    google.maps.event.addListener(this.drawingManager, 'markercomplete', (marker) => {
      (marker as google.maps.Marker).setDraggable(true);
      this.selectedLocationList.push(marker);
    });
    google.maps.event.addListener(this.drawingManager, 'circlecomplete', (circle) => {
      (circle as google.maps.Circle).setDraggable(true);
      (circle as google.maps.Circle).setEditable(true);
      console.log('circlecomplete');
      this.selectedLocationList.push(circle);
    });
    google.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
      (polygon as google.maps.Polygon).setDraggable(true);
      (polygon as google.maps.Polygon).setEditable(true);     
      this.selectedLocationList.push(polygon);
    });
    google.maps.event.addListener(this.drawingManager, 'polylinecomplete', (polyline) => {
      (polyline as google.maps.Polygon).setDraggable(true);
      (polyline as google.maps.Polygon).setEditable(true);
      this.selectedLocationList.push(polyline);
      
      (polyline as google.maps.Polygon).addListener('contextmenu', (c) => {
     });
 
     (polyline as google.maps.Polygon).addListener('click', (c) => {
     });
 
     (polyline as google.maps.Polygon).addListener('rightclick', (c) => {
      });


    });
    google.maps.event.addListener(this.drawingManager, 'rectanglecomplete', (rectangle) => {
      (rectangle as google.maps.Polygon).setDraggable(true);
      (rectangle as google.maps.Polygon).setEditable(true);
      this.selectedLocationList.push(rectangle);
    });
  }

  onOK(): void {  
    if (this.selectedLocationList.length == 0) {
      this.dialogRef.close(null);
    } else {
      this.dialogRef.close(this.selectedLocationList);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
