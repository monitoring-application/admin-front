import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FileManagerService } from 'src/app/services/file-manager.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SignUpService } from 'src/app/services/sign-up.service';
import { IAttachedModel } from 'src/app/shared/model/interface/i-attached-model';
import { ISignUpModel } from 'src/app/shared/model/interface/i-sign-up-model';
import { NotificationType } from 'src/app/util/notification_type';

@Component({
  selector: 'app-attachments-dlg',
  templateUrl: './attachments-dlg.component.html',
  styleUrls: ['./attachments-dlg.component.css'],
})
export class AttachmentsDlgComponent implements OnInit {
  attachments!: IAttachedModel[];
  havRecord: number = 0;
  member!: ISignUpModel;
  constructor(
    private signUpService: SignUpService,
    private dialog: MatDialogRef<AttachmentsDlgComponent>,
    private fileManagerService: FileManagerService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.fileManagerService.findAll().subscribe((x) => {
      const retVal: any = x;
      const { data } = retVal;
      this.attachments = data;

      this.havRecord = this.attachments.length;
    });

    this.member = this.fileManagerService.member;
  }
  submit() {}
  approve(id: number, status: number) {
    var type = status == 1 ? 'Approved!' : 'Dissaproved!';

    this.fileManagerService.approve(id, status).subscribe((x) => {
      this.notificationService.showNotification(
        NotificationType.success,
        `Successfully ${type}`,
        'Success'
      );
      this.loadData();
    });
  }
  verify() {
    this.signUpService
      .approve(this.fileManagerService.member.id, 4)
      ?.subscribe({
        next: (res) => {},
        error: (err) => {
          console.log({
            error: err,
          });
        },
        complete: () => {
          this.notificationService.showNotification(
            NotificationType.success,
            'This member is fully verified!',
            'Success'
          );
          setTimeout(async () => {
            this.close();
          }, 1000);
        },
      });
  }
  close() {
    this.dialog.close(false);
  }
}
