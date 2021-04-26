import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';

export class GeoLayerSelection {
  showBicyclingLayer=false;
  showTransitLayer=false;
  showTrafficLayer=false;
  customData: string = '';
}

@Component({
  selector: 'clipcode-geo-presenter-layering',
  templateUrl: './geo-presenter-layering.component.html',
  styleUrls: ['./geo-presenter-layering.component.css']
})
export class GeoPresenterLayeringComponent implements OnInit {

  showBicyclingLayer=false;
  showTrafficLayer=false;
  showTransitLayer=false;
  showCustomDataInput=false;
  customData: string = '';
  customDataSelection: string='';
  customDataString = '';

  constructor( public dialogRef: MatDialogRef<GeoPresenterLayeringComponent> ) { }

  ngOnInit(): void { }

  onChange(rc: MatRadioChange) {
    this.showCustomDataInput = rc.value == "11";
    if (!this.showCustomDataInput) {
      this.customDataString = '';
    }
  }

  onShow(): void {
    const ls = new GeoLayerSelection();
    ls.showBicyclingLayer = this.showBicyclingLayer;
    ls.showTrafficLayer = this.showTrafficLayer;
    ls.showTransitLayer = this.showTransitLayer;
    ls.customData = this.customData;

    if (this.customDataSelection == '1') {
      ls.customData = 'https://opendata-galwaycoco.hub.arcgis.com/datasets/46bac99da738428e8e7972afbf323d72_1.geojson?outSR=%7B%22latestWkid%22%3A2157%2C%22wkid%22%3A2157%7D'
    } else if (this.customDataSelection == '2') {
      ls.customData = 'https://opendata.arcgis.com/datasets/4658e2773a364603964e2eb932ebce61_0.geojson';
    } else if (this.customDataSelection == '3') {
      ls.customData = 'https://opendata-galwaycoco.hub.arcgis.com/datasets/29dd8cdba53f4bb7b156705de0d42e9d_0.geojson?outSR=%7B%22latestWkid%22%3A2157%2C%22wkid%22%3A2157%7D';
    } else if (this.customDataSelection == '4') {
      ls.customData = 'https://data-sdublincoco.opendata.arcgis.com/datasets/48f3eeaffa724b548299528680269631_0.geojson?outSR=%7B%22latestWkid%22%3A4326%2C%22wkid%22%3A4326%7D';
    } else if (this.customDataSelection == '5') {
      ls.customData = 'https://data-roscoco.opendata.arcgis.com/datasets/44a979a3297d43f583b5e5126ebf42d7_0.geojson?outSR=%7B%22latestWkid%22%3A2157%2C%22wkid%22%3A2157%7D';
    } else if (this.customDataSelection == '6') {
      ls.customData ='http://osni-spatialni.opendata.arcgis.com/datasets/c43e13180e6f4587a59ee0de5ac3b70c_1.geojson';
    } else if (this.customDataSelection == '7') {
      ls.customData ='http://osni-spatialni.opendata.arcgis.com/datasets/9a6d8545dd2c4d55bc17f23bf10c91cb_1.geojson';
    } else if (this.customDataSelection == '8') {
      ls.customData ='http://osni-spatialni.opendata.arcgis.com/datasets/2df7b462d1c342a4a1e3b73ca6238fdb_2.geojson';
    } else if (this.customDataSelection == '9') {
      ls.customData ='http://osni-spatialni.opendata.arcgis.com/datasets/01a3c821cdeb4e4da578fd5e0beb8f84_5.geojson';
    } else if (this.customDataSelection == '10') {
      ls.customData ='http://osni-spatialni.opendata.arcgis.com/datasets/0f9d91494d9a48e0963d17d2e3187e23_3.geojson';
    } else if (this.customDataSelection == '11') {
      ls.customData = this.customDataString;
    }

    this.dialogRef.close(ls);
   }

  onCancel() {
    this.dialogRef.close(null);
  }
}