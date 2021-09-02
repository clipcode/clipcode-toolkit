import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataGeoComponent } from './app-data-geo.component';

describe('AppDataGeoComponent', () => {
  let component: AppDataGeoComponent;
  let fixture: ComponentFixture<AppDataGeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDataGeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDataGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
