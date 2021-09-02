import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnalyticsReportComponent } from './app-analytics-report.component';

describe('AppAnalyticsReportComponent', () => {
  let component: AppAnalyticsReportComponent;
  let fixture: ComponentFixture<AppAnalyticsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAnalyticsReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnalyticsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
