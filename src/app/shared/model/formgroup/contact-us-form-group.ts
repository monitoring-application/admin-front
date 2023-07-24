import { AbstractControl, FormGroup } from '@angular/forms';
import { IContactUsModel } from '../interface/i-contact-us-model';

export interface ContactUsFormGroup extends FormGroup {
  value: IContactUsModel;
  controls: {
    first_name: AbstractControl;
    last_name: AbstractControl;
    email: AbstractControl;
    message: AbstractControl;
  };
}
