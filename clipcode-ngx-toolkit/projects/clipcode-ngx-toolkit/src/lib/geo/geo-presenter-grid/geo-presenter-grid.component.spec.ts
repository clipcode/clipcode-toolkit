import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverSurveyManagerModelComponentComponent } from './observer-survey-manager-model-component.component';

describe('ObserverSurveyManagerModelComponentComponent', () => {
  let component: ObserverSurveyManagerModelComponentComponent;
  let fixture: ComponentFixture<ObserverSurveyManagerModelComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObserverSurveyManagerModelComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverSurveyManagerModelComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
