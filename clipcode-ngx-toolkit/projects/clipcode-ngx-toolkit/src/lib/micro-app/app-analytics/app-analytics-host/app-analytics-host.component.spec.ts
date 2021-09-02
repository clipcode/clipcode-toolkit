import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAnalyticsHostComponent } from './app-analytics-host.component';

describe('AppAnalyticsHostComponent', () => {
  let component: AppAnalyticsHostComponent;
  let fixture: ComponentFixture<AppAnalyticsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAnalyticsHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAnalyticsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
