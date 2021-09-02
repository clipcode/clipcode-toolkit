import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPanelHostComponent } from './app-panel-host.component';

describe('AppPanelHostComponent', () => {
  let component: AppPanelHostComponent;
  let fixture: ComponentFixture<AppPanelHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPanelHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPanelHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
