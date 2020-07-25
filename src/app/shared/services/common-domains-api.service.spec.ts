import { TestBed } from '@angular/core/testing';

import { CommonDomainsApiService } from './common-domains-api.service';

describe('CommonDomainsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommonDomainsApiService = TestBed.get(CommonDomainsApiService);
    expect(service).toBeTruthy();
  });
});
