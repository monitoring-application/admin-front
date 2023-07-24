import { Injectable } from '@angular/core';
import { RouteInfo } from '../util/routeInfo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private authService: AuthService) {}

  routes: RouteInfo[] = [
    {
      path: '/members',
      title: 'Members',
      icon: 'supervisor_account',
      class: '',
      children: [],
      visible: true,
    },
  ];
}
