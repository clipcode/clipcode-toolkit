import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerModelComponent } from './app-explorer-model.component';

describe('AppExplorerModelComponent', () => {
  let component: AppExplorerModelComponent;
  let fixture: ComponentFixture<AppExplorerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerModelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
