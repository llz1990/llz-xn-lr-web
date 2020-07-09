import {AbstractControl, ValidatorFn} from '@angular/forms';
import {XnUtils} from '../../common/xn-utils';

/**
 * @constructor
 */
export function MustOneValidator(fields: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let root = control.root;
        if (!root) {
            return {'mustOne': '请至少填写一项'};
        }

        if (!!control && control.valid && !XnUtils.isEmpty(control.value)) {
            for (let field of fields) {
                let ctrl = root.get(field);
                if (ctrl && !ctrl.valid) {
                    ctrl.updateValueAndValidity();
                }
            }
            return null;
        }

        for (let field of fields) {
            let ctrl = root.get(field);
            if (!!ctrl && ctrl.valid && !XnUtils.isEmpty(ctrl.value)) {

                for (let field2 of fields) {
                    if (field2 !== field) {
                        let ctrl2 = root.get(field2);
                        if (ctrl2 && !ctrl2.valid) {
                            ctrl2.updateValueAndValidity();
                        }
                    }
                }

                return null;
            }
        }

        return {'mustOne': '请至少填写一项'};
    };
}
