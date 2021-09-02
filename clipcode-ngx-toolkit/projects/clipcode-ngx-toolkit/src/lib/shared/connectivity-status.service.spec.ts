import { TestBed } from '@angular/core/testing';

import { ConnectivityStatusService } from './connectivity-status.service';

describe('ConnectivityStatusService', () => {
  let service: ConnectivityStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectivityStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
