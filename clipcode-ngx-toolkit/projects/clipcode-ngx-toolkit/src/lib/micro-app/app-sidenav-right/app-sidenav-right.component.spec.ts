import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidenavRightComponent } from './app-sidenav-right.component';

describe('AppSidenavRightComponent', () => {
  let component: AppSidenavRightComponent;
  let fixture: ComponentFixture<AppSidenavRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSidenavRightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidenavRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
