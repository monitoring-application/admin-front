import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
