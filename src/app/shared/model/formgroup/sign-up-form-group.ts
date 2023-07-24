import { AbstractControl, FormGroup } from '@angular/forms';
import { ISignUpModel } from '../interface/i-sign-up-model';

export interface SignUpFormGroup extends FormGroup {
  value: ISignUpModel;
  controls: {
    id: AbstractControl;
    member_code: AbstractControl;
    first_name: AbstractControl;
    last_name: AbstractControl;
    email: AbstractControl;
    referal_code: AbstractControl;
    mobile_number: AbstractControl;
    downline: AbstractControl;
    status: AbstractControl;
  };
}
