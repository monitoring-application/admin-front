import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requestRoutes } from '../util/request_routes';
import { AuthService } from './auth.service';
import { NumberInput } from '@angular/cdk/coercion';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class PayoutRequestService {
  constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  //   create(): Observable<any> {
  //     const payload = this.form.value;
  //     var url: string = routes.baseBackendUrl + routes.payoutRequest;
  //     let header = new HttpHeaders();
  //     header = header.set('api-key', routes.apiKey);

  //     return this.httpClient.post(url, payload, {
  //       headers: header,
  //     });
  //   }

  fetchData(search: string, pageNumber: number, pageSize: NumberInput) {
    var url: string =
      routes.baseBackendUrl +
      routes.payoutRequest +
      `/pagination?search_value=${search}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.get(url, {
      headers: header,
    });
    return data;
  }
  paid(id: string) {
    var url: string =
      routes.baseBackendUrl + routes.payoutRequest + `/paid/${id}`;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.patch(
      url,
      {},
      {
        headers: header,
      }
    );
    return data;
  }
}
