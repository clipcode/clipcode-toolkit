import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataHostComponent } from './app-data-host.component';

describe('AppDataHostComponent', () => {
  let component: AppDataHostComponent;
  let fixture: ComponentFixture<AppDataHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDataHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDataHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
