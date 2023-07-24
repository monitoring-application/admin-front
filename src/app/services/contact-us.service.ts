import { Injectable } from '@angular/core';
import { HttpRequestService } from './http-request.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactUsFormGroup } from '../shared/model/formgroup/contact-us-form-group';
import { requestRoutes } from '../util/request_routes';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  }) as ContactUsFormGroup;
  resetform = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    message: ['', Validators.required],
  }) as ContactUsFormGroup;

  constructor(
    private http: HttpRequestService,
    private fb: FormBuilder,
    private httpClient: HttpClient
  ) {}

  create(): Observable<any> {
    const payload = this.form.value;
    var url: string = routes.baseBackendUrl + routes.contactUs;
    let header = new HttpHeaders();
    console.log(url);
    header = header.set('api-key', routes.apiKey);

    return this.httpClient.post(url, payload, {
      headers: header,
    });
  }
}
