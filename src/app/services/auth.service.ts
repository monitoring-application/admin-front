import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requestRoutes } from '../util/request_routes';
import { map } from 'rxjs';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpRequest: HttpRequestService,
    private httpClient: HttpClient
  ) {}
  // ...
  public isAuthenticated(): boolean {
    const loginStatus = sessionStorage.getItem('isLoggedIn');

    return loginStatus == 'true';
  }

  onLogin(params: any) {
    var url: string = routes.baseBackendUrl + routes.user + '/login';
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    return this.httpClient.post(url, params, { headers: header }).pipe(
      map((x) => {
        this.setUserInfo(x);
        return x;
      })
    );
  }

  setUserInfo(result: any) {
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('id', result.data.id);
    sessionStorage.setItem('first_name', result.data.first_name);
    sessionStorage.setItem('middle_name', result.data.middle_name);
    sessionStorage.setItem('last_name', result.data.last_name);
    sessionStorage.setItem('email', result.data.email);
    sessionStorage.setItem('status', result.data.status);
  }
  getUserId() {
    const id = sessionStorage.getItem('id');
    return id;
  }
  getUserFullName() {
    const item = sessionStorage.getItem('first_name');
    return item;
  }
  getUserEmail() {
    const item = sessionStorage.getItem('email');
    return item;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
