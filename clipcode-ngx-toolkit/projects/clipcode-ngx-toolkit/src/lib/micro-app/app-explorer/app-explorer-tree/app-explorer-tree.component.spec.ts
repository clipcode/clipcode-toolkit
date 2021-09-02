import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerTreeComponent } from './app-explorer-tree.component';

describe('AppExplorerTreeComponent', () => {
  let component: AppExplorerTreeComponent;
  let fixture: ComponentFixture<AppExplorerTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerTreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
