import { TestBed } from '@angular/core/testing';

import { CommonDomainsService } from './common-domains.service';

describe('CommonDomainsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonDomainsService = TestBed.get(CommonDomainsService);
    expect(service).toBeTruthy();
  });
});
