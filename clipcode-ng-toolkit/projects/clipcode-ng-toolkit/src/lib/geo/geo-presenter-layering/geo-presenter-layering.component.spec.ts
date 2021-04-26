import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLayersDialogComponent } from './geo-layers-dialog.component';

describe('GeoLayersDialogComponent', () => {
  let component: GeoLayersDialogComponent;
  let fixture: ComponentFixture<GeoLayersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoLayersDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoLayersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
