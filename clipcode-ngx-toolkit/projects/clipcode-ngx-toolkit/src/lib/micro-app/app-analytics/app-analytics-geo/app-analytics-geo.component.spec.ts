import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnalyticsGeoComponent } from './app-analytics-geo.component';

describe('AppAnalyticsGeoComponent', () => {
  let component: AppAnalyticsGeoComponent;
  let fixture: ComponentFixture<AppAnalyticsGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAnalyticsGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnalyticsGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
