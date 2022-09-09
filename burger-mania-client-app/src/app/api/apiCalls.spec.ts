import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiCalls } from './apiCalls';

describe('ApiServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
  }));

  it('should be created', () => {
    const service: ApiCalls = TestBed.get(ApiCalls);
    expect(service).toBeTruthy();
  });
});
