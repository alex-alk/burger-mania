import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';

describe('ApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: ApiServiceService = TestBed.get(ApiServiceService);
    expect(service).toBeTruthy();
  });
});
