import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataDocComponent } from './app-data-doc.component';

describe('AppDataDocComponent', () => {
  let component: AppDataDocComponent;
  let fixture: ComponentFixture<AppDataDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDataDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDataDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
