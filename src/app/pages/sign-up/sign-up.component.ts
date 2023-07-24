import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, filter, map } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  form = this.signUpService.form;
  mediaSub!: Subscription;
  public isMobile: boolean = false;
  loading = false;

  constructor(
    public mediaObserver: MediaObserver,
    private signUpService: SignUpService,
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
  submit() {
    if (!this.validation()) return;
    this.signUpService.create()?.subscribe({
      next: (res) => {},
      error: (err) => {
        console.log({
          error: err,
        });
      },
      complete: () => {
        this.notificationService.showNotification(
          NotificationType.success,
          'Successfully Saved!',
          'Success'
        );
        setTimeout(() => {
          this.loading = false;
          this.signUpService.form.reset(this.signUpService.resetform.value);
        }, 500);
      },
    });
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
    // if (this.form.value.first_name == '') {
    //   this.loading = false;
    //   this.notificationService.showNotification(
    //     NotificationType.error,
    //     'Please supply the first name!',
    //     'Information'
    //   );
    //   return false;
    // }
    // if (this.form.value.last_name == '') {
    //   this.loading = false;
    //   this.notificationService.showNotification(
    //     NotificationType.error,
    //     'Please supply the last name!',
    //     'Information'
    //   );
    //   return false;
    // }
    // if (this.form.value.email == '') {
    //   this.loading = false;
    //   this.notificationService.showNotification(
    //     NotificationType.error,
    //     'Please supply the email addresss!',
    //     'Information'
    //   );
    //   return false;
    // }

    return true;
  }
}
