import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoPresenterComponent } from './geo-presenter.component';

describe('GeoPresenterComponent', () => {
  let component: GeoPresenterComponent;
  let fixture: ComponentFixture<GeoPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoPresenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
