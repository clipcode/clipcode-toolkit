import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerMapComponent } from './app-explorer-map.component';

describe('AppExplorerMapComponent', () => {
  let component: AppExplorerMapComponent;
  let fixture: ComponentFixture<AppExplorerMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
