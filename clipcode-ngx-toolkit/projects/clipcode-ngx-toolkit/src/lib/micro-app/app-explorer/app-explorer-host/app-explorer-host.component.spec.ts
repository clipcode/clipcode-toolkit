import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerHostComponent } from './app-explorer-host.component';

describe('AppExplorerHostComponent', () => {
  let component: AppExplorerHostComponent;
  let fixture: ComponentFixture<AppExplorerHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
