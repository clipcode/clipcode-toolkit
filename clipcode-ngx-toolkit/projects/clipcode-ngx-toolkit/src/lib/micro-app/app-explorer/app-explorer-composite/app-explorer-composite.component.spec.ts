import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppExplorerCompositeComponent } from './app-explorer-composite.component';

describe('AppExplorerCompositeComponent', () => {
  let component: AppExplorerCompositeComponent;
  let fixture: ComponentFixture<AppExplorerCompositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppExplorerCompositeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppExplorerCompositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
