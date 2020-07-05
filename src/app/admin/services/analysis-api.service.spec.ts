import { TestBed } from '@angular/core/testing';

import { AnalysisApiService } from './analysis-api.service';

describe('AnalysisApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnalysisApiService = TestBed.get(AnalysisApiService);
    expect(service).toBeTruthy();
  });
});
