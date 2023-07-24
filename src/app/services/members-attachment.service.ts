import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { FormBuilder } from '@angular/forms';
import { IAttachedModel } from '../shared/model/interface/i-attached-model';
import { AttachmentMemberFormGroup } from '../shared/model/formgroup/attachment-form-group';

@Injectable({
  providedIn: 'root',
})
export class AttachmentService {
  form = this.fb.group({
    id: '',
    member_id: '',
    member_code: '',
    attachedFiles: [[] as IAttachedModel[]],
  }) as AttachmentMemberFormGroup;
  constructor(private authService: AuthService, private fb: FormBuilder) {}
}
