import { TestBed } from '@angular/core/testing';

import { AddUserApiService } from './add-user-api.service';

describe('AddUserApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddUserApiService = TestBed.get(AddUserApiService);
    expect(service).toBeTruthy();
  });
});
