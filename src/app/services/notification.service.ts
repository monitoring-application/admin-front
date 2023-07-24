import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationType } from '../util/notification_type';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  timeout = 1000;
  constructor(private toastr: ToastrService) {}
  showNotification(
    type: string = NotificationType.default,
    message: string,
    title: string = ''
  ) {
    switch (type) {
      case NotificationType.info:
        this.toastr.info(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span>' +
            message +
            '</span>',
          title || 'Info',
          {
            timeOut: this.timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-info alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case NotificationType.success:
        this.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span>' +
            message +
            '</span>',
          title || 'Success',
          {
            timeOut: this.timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-success alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case NotificationType.warning:
        this.toastr.warning(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span>' +
            message +
            '</span>',
          title || 'Warning',
          {
            timeOut: this.timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-warning alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      case NotificationType.error:
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span>' +
            message +
            '</span>',
          title || 'Error',
          {
            timeOut: this.timeout,
            enableHtml: true,
            closeButton: true,
            toastClass: 'alert alert-danger alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
      default:
        this.toastr.show(
          '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span>' +
            message +
            '</span>',
          title,
          {
            timeOut: this.timeout,
            closeButton: true,
            enableHtml: true,
            toastClass: 'alert alert-primary alert-with-icon',
            positionClass: 'toast-top-center',
          }
        );
        break;
    }
  }
}
