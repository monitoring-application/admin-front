import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IAttachedModel } from '../../model/interface/i-attached-model';

@Component({
  selector: 'app-attachments-fields',
  templateUrl: './attachments-fields.component.html',
  styleUrls: ['./attachments-fields.component.css'],
})
export class AttachmentsFieldsComponent implements OnInit {
  @Input() label = '';
  @Output() selectedField = new EventEmitter<any>();

  socialMediaControl = new FormControl();
  attachedFiles: IAttachedModel[] = [
    {
      id: '1',
      code: 'Yt',
      name: 'Youtube',
      avatar: 'assets/Images/icons/Black/youtube-icon.png',
    },
    {
      id: '2',
      code: 'Fb',
      name: 'Facebook',
      avatar: 'assets/Images/icons/Black/facebook-icon.png',
    },
    {
      id: '3',
      code: 'Tok',
      name: 'Tiktok',
      avatar: 'assets/Images/icons/Black/tiktok-icon.png',
    },
    {
      id: '4',
      code: 'Ig',
      name: 'Instagram',
      avatar: 'assets/Images/icons/Black/instagram-icon.png',
    },
    {
      id: '5',
      code: 'Tw',
      name: 'Twitter',
      avatar: 'assets/Images/icons/Black/twitter-icon.png',
    },
    {
      id: '6',
      code: 'Li',
      name: 'Linkedin',
      avatar: 'assets/Images/icons/Black/linkedin-icon.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  fetchData() {
    // this.signatoryService.findAll();
    // this.signatoryService.signatories.subscribe(signatories => {
    //   this.signatories = signatories;
    // });
  }

  selectOption(event: any) {
    this.selectedField.emit({
      fieldName: this.label,
      socialMedia: event,
    });
  }
}
