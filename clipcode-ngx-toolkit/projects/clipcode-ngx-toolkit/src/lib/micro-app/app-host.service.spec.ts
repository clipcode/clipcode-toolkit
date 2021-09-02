import { TestBed } from '@angular/core/testing';

import { AppHostService } from './app-host.service';

describe('AppHostService', () => {
  let service: AppHostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppHostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
