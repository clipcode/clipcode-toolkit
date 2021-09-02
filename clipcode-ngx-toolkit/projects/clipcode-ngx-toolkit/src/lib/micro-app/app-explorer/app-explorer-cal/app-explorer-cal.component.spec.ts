import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerCalComponent } from './app-explorer-cal.component';

describe('AppExplorerCalComponent', () => {
  let component: AppExplorerCalComponent;
  let fixture: ComponentFixture<AppExplorerCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
