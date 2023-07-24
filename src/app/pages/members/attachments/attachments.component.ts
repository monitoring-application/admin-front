import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription, filter, map } from 'rxjs';
import { AttachedModel } from 'src/app/shared/model/base/attached-file-model';
import { IAttachedModel } from 'src/app/shared/model/interface/i-attached-model';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.css'],
})
export class AttachmentsComponent implements OnInit {
  form!: any;
  maxSocialmedia = 4;
  mediaSub!: Subscription;
  public isMobile: boolean = false;
  attachedFiles: IAttachedModel[] = [];
  attachedFile: IAttachedModel = new AttachedModel();

  constructor(public mediaObserver: MediaObserver) {}

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
  selectedField(eventValue: any) {
    const { socialMedia } = eventValue;
    this.attachedFile = socialMedia;
  }
  add() {}
  submit() {}

  remove(item: IAttachedModel) {
    // const index = this.form.value.socialMedias.indexOf(item);
    // this.form.value.socialMedias.splice(index, 1);
  }
}
