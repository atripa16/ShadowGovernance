import { TestBed } from '@angular/core/testing';

import { EndUserApiService } from './end-user-api.service';

describe('EndUserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndUserApiService = TestBed.get(EndUserApiService);
    expect(service).toBeTruthy();
  });
});
