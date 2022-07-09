import { TestBed } from '@angular/core/testing';

import { RecentBurgersService } from './recent-burgers.service';

describe('RecentBurgersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentBurgersService = TestBed.get(RecentBurgersService);
    expect(service).toBeTruthy();
  });
});
