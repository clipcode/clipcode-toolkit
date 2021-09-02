import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerMediaComponent } from './app-explorer-media.component';

describe('AppExplorerMediaComponent', () => {
  let component: AppExplorerMediaComponent;
  let fixture: ComponentFixture<AppExplorerMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerMediaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
