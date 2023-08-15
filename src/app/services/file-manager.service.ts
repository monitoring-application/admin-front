import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpRequestService } from './http-request.service';
import { requestRoutes } from '../util/request_routes';
import { AuthService } from './auth.service';
import { ISignUpModel } from '../shared/model/interface/i-sign-up-model';

var routes = new requestRoutes();
@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  member!: ISignUpModel;
  constructor(
    private http: HttpRequestService,
    private client: HttpClient,
    private authService: AuthService
  ) {}

  findAll() {
    var url: string =
      routes.baseBackendUrl +
      routes.fileManager +
      '/per-member/' +
      this.member.id;
    var data = this.client.get(`${url}`);
    return data;
  }

  approve(id: number, status: number) {
    var url: string = routes.baseBackendUrl + routes.fileManager;
    var data = this.client.patch(`${url}/approve/${id}/${status}`, {});
    return data;
  }

  remove(id: number) {
    var url: string = routes.baseBackendUrl + routes.fileManager + '/' + id;
    var data = this.client.delete(`${url}`);
    return data;
  }
}
