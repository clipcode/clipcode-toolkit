import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerListComponent } from './app-explorer-list.component';

describe('AppExplorerListComponent', () => {
  let component: AppExplorerListComponent;
  let fixture: ComponentFixture<AppExplorerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
