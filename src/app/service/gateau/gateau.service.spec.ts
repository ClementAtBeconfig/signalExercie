import { TestBed } from '@angular/core/testing';

import { GateauService } from './gateau.service';

describe('GateauService', () => {
  let service: GateauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GateauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
