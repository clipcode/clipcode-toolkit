import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataGraphComponent } from './app-data-graph.component';

describe('AppDataGraphComponent', () => {
  let component: AppDataGraphComponent;
  let fixture: ComponentFixture<AppDataGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDataGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDataGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
