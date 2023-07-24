import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.contactService.form;
  mediaSub: Subscription | undefined;
  public isMobile: boolean = false;
  loading = false;

  hide: boolean = true;
  loginError: string = '';
  isProcessing: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    public router: Router,
    private location: Location,
    private authService: AuthService,
    public mediaObserver: MediaObserver,
    private contactService: ContactUsService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.isMobile = change.mqAlias === 'xs' ? true : false;
      });
  }

  async login() {
    if (this.username != '' && this.password != '') {
      if (this.isProcessing) return;
      this.hide = true;
      this.isProcessing = true;
      setTimeout(() => {
        this.authService
          .userLogin(this.username, this.password)
          .then((res) => {
            this.router.navigate(['']);
            this.isProcessing = false;
          })
          .catch((err) => {
            var str = err.error.message || '';
            this.loginError = str[0].toUpperCase() + str.slice(1); //"Invalid Credentials";
            this.isProcessing = false;
          });
      }, 3000);
    } else {
      this.loginError = 'Invalid Credentials';
      this.isProcessing = false;
    }
  }

  back() {
    this.location.back();
  }

  validation(): boolean {
    this.loading = true;
    this.form.markAllAsTouched();

    if (!this.form.valid) {
      this.loading = false;

      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply needed!',
        'Warning'
      );
      return false;
    }

    return true;
  }
  submit() {
    if (!this.validation()) return;

    this.contactService.create()?.subscribe({
      next: (res) => {
        console.log({ result: res });
      },
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Message Sent!',
          'Success'
        );
        setTimeout(() => {
          this.contactService.form.reset(this.contactService.resetform.value);
        }, 1000);
      },
    });
  }
}
