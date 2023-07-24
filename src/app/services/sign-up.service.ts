import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpRequestService } from './http-request.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { requestRoutes } from '../util/request_routes';
import { SignUpFormGroup } from '../shared/model/formgroup/sign-up-form-group';
import { ISignUpModel } from '../shared/model/interface/i-sign-up-model';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private baseUrl = '/v1/sign-up';
  form = this.fb.group({
    id: '',
    member_code: '',
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    referal_code: '',
    mobile_number: '',
    downline: 0,
    status: 0,
  }) as SignUpFormGroup;
  resetform = this.fb.group({
    id: '',
    member_code: '',
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    referal_code: '',
    mobile_number: '',
    downline: 0,
    status: 0,
  }) as SignUpFormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient) {}

  create(): Observable<any> {
    const payload = this.form.value;
    var url: string = routes.baseBackendUrl + routes.signUp;
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    return this.httpClient.post(url, payload, {
      headers: header,
    });
  }
  fetchData(value: string, pageNumber: number, pageSize: number) {
    var url: string =
      routes.baseBackendUrl +
      routes.signUp +
      `/pagination?search_value=${value}&pageNumber=${pageNumber}&pageSize=${pageSize}`;

    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.get(url, {
      headers: header,
    });
    return data;
  }

  approve(id: string, status: number) {
    var param: string = '/approve/' + id + '/' + status;
    var url: string = routes.baseBackendUrl + routes.signUp + param;

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
  remove(id: string) {
    var url: string = routes.baseBackendUrl + routes.signUp + '/' + id;
    let header = new HttpHeaders();
    header = header.set('api-key', routes.apiKey);

    const data = this.httpClient.delete(url, {
      headers: header,
    });
    return data;
  }
}
