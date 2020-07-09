import {Component, OnInit} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {FormGroup} from '@angular/forms';
import {XnFormUtils} from '../../../common/xn-form-utils';

// 修改模式组件
@Component({
    selector: 'app-mode-modification',
    templateUrl: './mode-modification.component.html',
})
export class ModeModificationComponent implements OnInit {
    // 页面标题
    public pageTitle = '模式修改';
    // 输入内容
    public inputValue: string;
    // 初始对象
    public formModel: InputModel = new InputModel();
    mainForm: FormGroup;
    // checkers
    shows = [
        {
            checkerId: 'appName',
            memo: '',
            options: {readonly: true},
            required: 1,
            sortOrder: 2,
            title: '企业名称',
            type: 'text',
            validators: ''
        },
        {
            checkerId: 'orgType',
            memo: '',
            options: {ref: 'orgType', change: 'pattern', readonly: true},
            required: 1,
            sortOrder: 2,
            title: '该机构的类型',
            type: 'mselect',
            validators: ''
        },
        {
            checkerId: 'pattern',
            memo: '',
            required: 1,
            sortOrder: 3,
            title: '该机构的模式',
            type: 'dcheckbox',
            validators: ''
        },
        {
            checkerId: 'otherOrgType',
            memo: '',
            options: {ref: 'orgType', change: 'otherPattern', readonly: false},
            required: 0,
            sortOrder: 4,
            title: '其他类型',
            type: 'mselect',
            validators: ''
        },
        {
            checkerId: 'otherPattern',
            memo: '',
            required: 0,
            sortOrder: 5,
            title: '其他类型对应的模式',
            type: 'dcheckbox',
            validators: ''
        }
    ];

    public constructor(private xn: XnService) {
        //
    }

    public ngOnInit() {
    }

    // 点击搜索 - 输入弹出
    public searchResult(val) {
        // 去除空白格
        const value = val.replace(/\s+/g, '');
        if (value === this.formModel.appName) {
            // 输入内容相同，不做任何操作
        } else {
            if (value !== undefined && value.length > 0) {
                this.xn.api.post('/jzn/product/get', {appName: value}).subscribe(x => {
                    if (!!x.data) {
                        this.formModel = x.data;
                        this.shows.forEach(checker => {
                            checker['value'] = x.data[checker['checkerId']];
                            if (checker.checkerId === 'pattern') {
                                checker['value'] = JSON.stringify(x.data['custom']);
                            }
                        });
                        this.buildForm();
                    } else {
                        this.mainForm = null;
                    }
                });
            }

        }
    }

    //  保存修改模式
    public save() {
        console.log('......', this.mainForm.value);
        const value = this.mainForm.value;
        const params = {
            appId: this.formModel.appId,
            orgType: this.formModel.orgType,
            custom: value.pattern,
            otherOrgType: value.otherOrgType,
            otherPattern: value.otherPattern,
        };
        this.xn.api.post('/jzn/product/set', params).subscribe(() => {
            this.xn.msgBox.open(false, '保存成功');
        });
    }

    // 构建
    private buildForm() {
        XnFormUtils.buildSelectOptions(this.shows);
        this.buildChecker(this.shows);
        this.mainForm = XnFormUtils.buildFormGroup(this.shows);
    }

    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }
}

// 修改模型组件提交类
export class InputModel {
    // 企业名称
    public appName?: string;
    // 企业id
    public appId?: string;
    // 企业类型
    public orgType?: number;
    // 产品id
    public custom?: string[];
}
