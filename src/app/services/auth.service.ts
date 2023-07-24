import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpRequest: HttpRequestService) {}
  // ...
  public isAuthenticated(): boolean {
    const loginStatus = sessionStorage.getItem('isLoggedIn');

    return loginStatus == 'true';
  }

  userLogin(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpRequest.isUserAvailable(username, password).subscribe({
        next: (result) => {
          if (result.statusCode == 201 && result.data) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('user', JSON.stringify(result.data));
            resolve(true);
          } else {
            reject(false);
          }
        },
        error: (err) => {
          reject(err);
        },
      });
    });
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }
}
