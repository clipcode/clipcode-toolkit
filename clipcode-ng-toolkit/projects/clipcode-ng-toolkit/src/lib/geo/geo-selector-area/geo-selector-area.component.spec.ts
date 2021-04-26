import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoAreaSelectorComponent } from './geo-area-selector.component';

describe('GeoAreaSelectorComponent', () => {
  let component: GeoAreaSelectorComponent;
  let fixture: ComponentFixture<GeoAreaSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeoAreaSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoAreaSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
