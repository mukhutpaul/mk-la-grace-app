import { TestBed } from '@angular/core/testing';

import { FcService } from './fc.service';

describe('FcService', () => {
  let service: FcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
