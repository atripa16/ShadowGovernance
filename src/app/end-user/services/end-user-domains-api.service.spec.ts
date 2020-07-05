import { TestBed } from '@angular/core/testing';

import { EndUserDomainsApiService } from './end-user-domains-api.service';

describe('EndUserDomainsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndUserDomainsApiService = TestBed.get(EndUserDomainsApiService);
    expect(service).toBeTruthy();
  });
});
