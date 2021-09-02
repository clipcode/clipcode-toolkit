import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppHostComponent } from './app-host.component';

describe('AppHostComponent', () => {
  let component: AppHostComponent;
  let fixture: ComponentFixture<AppHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
