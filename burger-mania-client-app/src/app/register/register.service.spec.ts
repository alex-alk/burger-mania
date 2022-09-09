import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { defer, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new RegisterService(httpClientSpy);
  });

  it('calls /api/users', () => {
    httpClientSpy.post.and.returnValue(of());
    service.signup({});
    expect (httpClientSpy.post.calls.allArgs()[0][0]).toBe(`${environment.apiUrl}/api/users`);
  });
});
