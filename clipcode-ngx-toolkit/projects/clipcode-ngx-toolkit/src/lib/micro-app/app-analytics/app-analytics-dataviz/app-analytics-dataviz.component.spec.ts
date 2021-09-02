import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnalyticsDatavizComponent } from './app-analytics-dataviz.component';

describe('AppAnalyticsDatavizComponent', () => {
  let component: AppAnalyticsDatavizComponent;
  let fixture: ComponentFixture<AppAnalyticsDatavizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAnalyticsDatavizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnalyticsDatavizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
