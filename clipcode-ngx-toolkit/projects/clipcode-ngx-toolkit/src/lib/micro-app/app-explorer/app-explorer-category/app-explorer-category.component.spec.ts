import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerCategoryComponent } from './app-explorer-category.component';

describe('AppExplorerCategoryComponent', () => {
  let component: AppExplorerCategoryComponent;
  let fixture: ComponentFixture<AppExplorerCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
