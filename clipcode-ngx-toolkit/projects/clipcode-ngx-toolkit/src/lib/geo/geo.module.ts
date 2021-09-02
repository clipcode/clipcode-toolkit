import { NgModule } from '@angular/core';

import {GoogleMapsModule} from '@angular/google-maps';

import { ClipcodeNgxToolkitSharedModule } from '../shared/shared.module';

import { MapDirectionsRenderer } from './12-on-11/map-directions-renderer';
import { MapHeatmapLayer }       from './12-on-11/map-heatmap-layer';

import { GeoSelectorThumbnailComponent } from './geo-selector-thumbnail/geo-selector-thumbnail.component';
import { GeoSelectorPointComponent } from './geo-selector-point/geo-selector-point.component';
import { GeoSelectorAreaComponent } from './geo-selector-area/geo-selector-area.component';

import { GeoPresenterGridComponent } from './geo-presenter-grid/geo-presenter-grid.component';
import { GeoPresenterLayeringComponent } from './geo-presenter-layering/geo-presenter-layering.component';
import { GeoSelectorComponent } from './geo-selector/geo-selector.component';
import { GeoPresenterComponent } from './geo-presenter/geo-presenter.component';

@NgModule({
  declarations: [
    MapDirectionsRenderer,
    MapHeatmapLayer,
    GeoSelectorComponent,
    GeoSelectorThumbnailComponent,
    GeoSelectorPointComponent,
    GeoSelectorAreaComponent,
    GeoPresenterComponent,
    GeoPresenterLayeringComponent,
    GeoPresenterGridComponent
  ],
  imports: [ 
    GoogleMapsModule,
    ClipcodeNgxToolkitSharedModule
  ], 
  exports: [
    MapDirectionsRenderer, // 12 on 11
    MapHeatmapLayer,       // 12 on 11
 
    // Angular Components modules
    GoogleMapsModule,

    // Locally Defined
    GeoSelectorComponent,
    GeoSelectorThumbnailComponent,
    GeoSelectorPointComponent,
    GeoSelectorAreaComponent,
    GeoPresenterComponent,
    GeoPresenterGridComponent,
    GeoPresenterLayeringComponent
  ]
})
export class ClipcodeNgxToolkitGeoModule { }
