import { Component, OnInit } from '@angular/core';
import { filter, map, Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/services/contact-us.service';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  form = this.contactService.form;
  mediaSub: Subscription | undefined;
  public isMobile: boolean = false;
  loading = false;

  constructor(
    public router: Router,
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
