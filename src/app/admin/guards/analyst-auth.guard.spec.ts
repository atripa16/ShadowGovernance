import { TestBed, async, inject } from '@angular/core/testing';

import { AnalystAuthGuard } from './analyst-auth.guard';

describe('AnalystAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnalystAuthGuard]
    });
  });

  it('should ...', inject([AnalystAuthGuard], (guard: AnalystAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
