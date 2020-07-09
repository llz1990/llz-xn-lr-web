import {AbstractControl, ValidatorFn} from '@angular/forms';

export function EmailValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const re: RegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const ok = re.test(control.value);
        return ok ? null : {'email': true};
    };
}
