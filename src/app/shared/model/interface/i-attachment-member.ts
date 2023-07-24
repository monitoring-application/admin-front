import { IAttachedModel } from './i-attached-model';

export interface IAttachmentMemberModel {
  id: string;
  member_id: string;
  member_code: string;

  attachedFiles: IAttachedModel[];
}
