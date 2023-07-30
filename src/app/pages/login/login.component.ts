import { Component, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  formLogin: FormGroup = <FormGroup>{};

  hide: boolean = true;
  loginError: string = '';
  isProcessing: boolean = false;
  username: string = '';
  password: string = '';

  constructor(
    public router: Router,
    fBuilder: FormBuilder,
    private location: Location,
    private authService: AuthService,
    public mediaObserver: MediaObserver,
    private contactService: ContactUsService,
    private notificationService: NotificationService
  ) {
    this.onCreateForm(fBuilder);
  }

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

  onCreateForm(builder: FormBuilder) {
    this.formLogin = builder.group({
      username: builder.control('', { validators: [Validators.required] }),
      password: builder.control('', { validators: [Validators.required] }),
    });
  }
  async login() {
    const _payload = {
      username: this.formLogin.controls['username'].value,
      password: this.formLogin.controls['password'].value,
    };

    this.formLogin.markAllAsTouched();

    if (!this.formLogin.valid) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Please supply needed!',
        'Warning'
      );
      return;
    }

    setTimeout(() => {
      this.authService.onLogin(_payload).subscribe({
        next: (x) => {
          if (!this.validationLogin(x)) return;
          this.router.navigate(['']);
        },
        error: (e) => {
          // console.log({ e: e });
        },
        complete: () => {
          console.log('completed');
        },
      });
    }, 1000);
  }

  back() {
    this.location.back();
  }

  validationLogin(data: any): boolean {
    if (data.data.userStats == 1) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'User not found',
        'Warning'
      );
      return false;
    } else if (data.data.userStats == 2) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'User is inactive',
        'Warning'
      );
      return false;
    } else if (data.data.userStats == 3) {
      this.notificationService.showNotification(
        NotificationType.warning,
        'Invalid passwrod',
        'Warning'
      );
      return false;
    }
    return true;
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
