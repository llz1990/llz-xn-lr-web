import {XnModalUtils} from './../../common/xn-modal-utils';
import {Component, OnInit, Input, ElementRef, ViewChild, ViewContainerRef} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
import {XnFormUtils} from '../../common/xn-form-utils';
import {XnUtils} from '../../common/xn-utils';
import {XnInputOptions} from './xn-input.options';
import {XnService} from '../../services/xn.service';
import {PdfSignModalComponent} from '../../public/modal/pdf-sign-modal.component';

@Component({
    selector: 'xn-fixedfile-input',
    templateUrl: './fixedfile-input.component.html',
    styles: []
})
export class FixedfileInputComponent implements OnInit {

    @Input() row: any;
    @Input() form: FormGroup;

    myClass = '';
    alert = '';
    moneyAlert = '';
    ctrl: AbstractControl;
    xnOptions: XnInputOptions;
    ctrlWith = false;
    ctrlWithTemp = false;
    items = {};

    constructor(private er: ElementRef, private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.ctrl = this.form.get(this.row.name);
        console.log('row: ', this.row);
        this.fromValue();
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    private fromValue() {
        this.items = XnUtils.parseObject(this.ctrl.value, {});
        console.log('fixedfile: ', this.items);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    private toValue() {
        if (!this.items['id']) {
            this.ctrl.setValue('');
        } else {
            console.log('fixedfileToValue: ', this.items);
            this.ctrl.setValue(JSON.stringify(this.items));
        }
        this.ctrl.markAsTouched();
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    showContract(id: string, secret: string, label: string) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, PdfSignModalComponent, {
            id: id,
            secret: secret,
            label: label,
            readonly: true
        }).subscribe(() => {
        });
    }
}


