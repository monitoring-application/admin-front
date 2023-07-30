import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../model/user-info-model';
import { requestRoutes } from '../util/request_routes';
import { environment } from 'src/environments/environment';

var routes = new requestRoutes();

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  private baseUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}
  post<T>(url: string, body: any) {
    delete body.id;
    return this.http.post<T>(this.baseUrl + url, body);
  }
  patch<T>(url: string, item: any) {
    return this.http.patch<T>(this.baseUrl + url, item);
  }
  get<T>(url: string) {
    return this.http.get<T>(this.baseUrl + url);
  }
  delete<T>(url: string) {
    return this.http.delete<T>(this.baseUrl + url);
  }
  // isUserAvailable(params: any): Observable<any> {
  //   var url: string = routes.baseUrl + routes.responder;
  //   url = url + '/login';
  //   var body = {
  //     email: username,
  //     password: password,
  //   };
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };

  //   return this.http.post(url, body, httpOptions);
  // }

  // registerResponder(userInfo: UserInfo): Observable<any> {
  //   var url: string = routes.baseUrl + routes.responder;
  //   url = url + '/sign-up';
  //   return this.http.post(url, userInfo);
  // }

  // saveContactUs(
  //   first_name: string,
  //   last_name: string,
  //   email: string,
  //   message: string
  // ): Observable<any> {
  //   var url: string = routes.baseUrl + routes.contactUs;
  //   var body = {
  //     first_name: first_name,
  //     last_name: last_name,
  //     email: email,
  //     message: message,
  //   };
  //   let header = new HttpHeaders();
  //   header = header.set('api-key', routes.apiKey);
  //   return this.http.post(url, body, { headers: header });
  // }

  // getAPKLink(type: string): Observable<any> {
  //   var url: string = routes.baseUrl + routes.downloadLink;
  //   url = url + '/' + type;

  //   return this.http.get(url);
  // }
}
