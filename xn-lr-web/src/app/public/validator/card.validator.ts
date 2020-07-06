import { AbstractControl, ValidatorFn } from '@angular/forms';

export function CardValidator(name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let ok = false;
        let root = control.root;
        if (root) {
            let ctrl = root.get(name);
            if (!!ctrl && !!(ctrl.value === '身份证')) {
                var re = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 两个以上中文姓名，外国翻译过来的中文姓名很长，而且有个·
                const ok = re.test(control.value);
                return ok ? null : { 'card': '请输入合法的身份证号码' };

            }
            else if (!!ctrl && !!(ctrl.value === '护照')) {
                // const re: RegExp = /(^[PSED]{1}\d{7}$)|(^[GS]{1}\d{8}$)/;
                // const value = control.value.toUpperCase();
                // const ok = re.test(value);
                // return ok ? null : {'card': '请输入合法的护照号码'};
                return null;
            };
        }
    };
}
