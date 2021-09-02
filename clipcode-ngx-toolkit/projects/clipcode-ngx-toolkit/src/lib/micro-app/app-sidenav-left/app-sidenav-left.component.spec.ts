import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSidenavLeftComponent } from './app-sidenav-left.component';

describe('AppSidenavLeftComponent', () => {
  let component: AppSidenavLeftComponent;
  let fixture: ComponentFixture<AppSidenavLeftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSidenavLeftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSidenavLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
