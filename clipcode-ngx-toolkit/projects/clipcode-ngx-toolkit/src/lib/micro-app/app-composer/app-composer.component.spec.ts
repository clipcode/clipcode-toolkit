import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComposerComponent } from './app-composer.component';

describe('AppComposerComponent', () => {
  let component: AppComposerComponent;
  let fixture: ComponentFixture<AppComposerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComposerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
