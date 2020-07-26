import { inject, TestBed } from '@angular/core/testing';
import { EndUserAuthGuard } from './end-user-auth.guard';


describe('AnalystAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EndUserAuthGuard]
    });
  });

  it('should ...', inject([EndUserAuthGuard], (guard: EndUserAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
