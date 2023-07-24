import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAttachedModel } from '../../model/interface/i-attached-model';

@Component({
  selector: 'app-attachments-list',
  templateUrl: './attachments-list.component.html',
  styleUrls: ['./attachments-list.component.css'],
})
export class AttachmentsListComponent implements OnInit {
  @Output() deleteSignatory = new EventEmitter<any>();
  @Input() socialmedias: IAttachedModel[] = [];
  @Input() maxSocialmedia = 4;

  constructor() {
    console.log(this.socialmedias);
  }

  ngOnInit(): void {}
  remove(item: IAttachedModel) {
    this.deleteSignatory.emit(item);
  }
}
