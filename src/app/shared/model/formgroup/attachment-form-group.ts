import { AbstractControl, FormGroup } from '@angular/forms';
import { IAttachmentMemberModel } from '../interface/i-attachment-member';
import { IAttachedModel } from '../interface/i-attached-model';

export interface AttachmentMemberFormGroup extends FormGroup {
  value: IAttachmentMemberModel;
  controls: {
    id: AbstractControl;
    member_id: AbstractControl;
    member_code: AbstractControl;
    attachedFiles: AbstractControl<IAttachedModel[]>;
  };
}
