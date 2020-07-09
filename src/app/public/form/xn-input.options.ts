import {isNullOrUndefined} from 'util';
import {XnUtils} from '../../common/xn-utils';
import {FormGroup, AbstractControl} from '@angular/forms';
import {ElementRef} from '@angular/core';
import {SelectOptions} from '../../config/select-options';

declare let $: any;

export class XnInputOptions {

    constructor(private row: any,
                private form: FormGroup,
                private ctrl: AbstractControl,
                private er: ElementRef) {
        this.handleOptions();
    }

    private handleOptions(): void {
        if (isNullOrUndefined(this.row.options)) {
            return;
        }

        this.handleShowWhen(this.row.options);
        this.handleMemoLink(this.row.options);
        this.handleTitleLink(this.row.options);
    }

    private handleShowWhen(json: any): void {
        if (isNullOrUndefined(json.showWhen)) {
            return;
        }

        this.form.get(json.showWhen[0]).valueChanges.subscribe(v => {
            this.handleShowWhenAction(json);
        });

        // 避免Angular 2 Expression Changed After It Has Been Checked Exception的问题
        setTimeout(() => this.handleShowWhenAction(json), 0);
    }

    private handleShowWhenAction(json) {
        const v = this.form.get(json.showWhen[0]).value;
        if (XnUtils.isEmpty(v)) {
            this.hideRow();
            return;
        }

        // 数组只有1个元素时, 只要有值就显示
        if (json.showWhen.length === 1) {
            this.showRow();
            return;
        }

        if (v === json.showWhen[1]) {
            this.showRow();
        } else {
            this.hideRow();
        }

        //特殊处理-复选框"[{"value":"isReceive","checked":true},{"value":"isChangePrice","checked":true}]"
        if(typeof v === 'string' && v.includes('[')){
            const isOk = JSON.parse(v).some(obj=>json.showWhen[1]===obj.value && obj.checked);
            if(isOk){
                this.showRow();
            }else{
                this.hideRow();
            }
            //单选 待定
        }
    }

    private showRow(): void {
        $(this.er.nativeElement).parents('.form-group').show();
        if (!this.row.options.readonly) {
            this.ctrl.enable({onlySelf: false, emitEvent: true});
            this.ctrl.updateValueAndValidity();
        }
    }

    private hideRow(): void {
        $(this.er.nativeElement).parents('.form-group').hide();
        if (!this.row.options.readonly) {
            this.ctrl.disable();
        }
    }

    private handleMemoLink(json: any): void {
        if (isNullOrUndefined(json.memoLink)) {
            return;
        }

        this.row.originMemo = this.row.memo;
        this.form.get(json.memoLink[0]).valueChanges.subscribe(v => {
            this.handleMemoLinkAction(json);
        });

        // 避免Angular 2 Expression Changed After It Has Been Checked Exception的问题
        setTimeout(() => this.handleMemoLinkAction(json), 0);
    }

    private handleMemoLinkAction(json) {
        const v = this.form.get(json.memoLink[0]).value;
        if (XnUtils.isEmpty(v)) {
            this.showMemo(this.row.originMemo);
            return;
        }

        let options = SelectOptions.get(json.memoLink[1]);
        for (let option of options) {
            if (option.value === v) {
                this.showMemo(option.label);
                return;
            }
        }

        this.showMemo(this.row.originMemo);
    }

    private showMemo(s: string): void {
        this.row.memo = s;
    }

    private handleTitleLink(json: any): void {
        if (isNullOrUndefined(json.titleLink)) {
            return;
        }

        this.row.originTitle = this.row.title;
        this.form.get(json.titleLink[0]).valueChanges.subscribe(v => {
            this.handleTitleLinkAction(json);
        });

        // 避免Angular 2 Expression Changed After It Has Been Checked Exception的问题
        setTimeout(() => this.handleTitleLinkAction(json), 0);
    }

    private handleTitleLinkAction(json: any): void {
        const v = this.form.get(json.titleLink[0]).value;
        if (XnUtils.isEmpty(v)) {
            this.showTitle(this.row.originTitle);
            return;
        }

        let options = SelectOptions.get(json.titleLink[1]);
        for (let option of options) {
            if (option.value === v) {
                this.showTitle(option.label);
                return;
            }
        }

        this.showTitle(this.row.originTitle);
    }

    private showTitle(s: string): void {
        this.row.title = s;
    }

}
