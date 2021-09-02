import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCreateHostComponent } from './app-create-host.component';

describe('AppCreateHostComponent', () => {
  let component: AppCreateHostComponent;
  let fixture: ComponentFixture<AppCreateHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppCreateHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCreateHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
