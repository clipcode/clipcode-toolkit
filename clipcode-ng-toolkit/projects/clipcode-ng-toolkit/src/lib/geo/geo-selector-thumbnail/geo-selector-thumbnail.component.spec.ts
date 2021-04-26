import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSelectorThumbnailComponent } from './geo-selector-thumbnail.component';

describe('GeoSelectorThumbnailComponent', () => {
  let component: GeoSelectorThumbnailComponent;
  let fixture: ComponentFixture<GeoSelectorThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoSelectorThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSelectorThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
