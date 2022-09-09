import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  signup(user: any) {
    return this.httpClient.post(`${environment.apiUrl}/api/users`, user);
  }
}
