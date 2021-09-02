import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoSelectorComponent } from './geo-selector.component';

describe('GeoSelectorComponent', () => {
  let component: GeoSelectorComponent;
  let fixture: ComponentFixture<GeoSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
