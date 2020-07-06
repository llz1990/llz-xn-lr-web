/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：InfoComponent
 * @summary：企业资料修改
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          企业资料修改         2019-03-22
 * **********************************************************************
 */

import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {XnService} from '../../../services/xn.service';
import {XnModalUtils} from '../../../common/xn-modal-utils';
import {SelectOptions} from '../../../config/select-options';
import {forkJoin} from 'rxjs/observable/forkJoin';
import {EditInfoModalComponent} from '../../../public/component/edit-info-modal.component';
import {ModalSize} from '../../../common/modal/components/modal';
import {FileViewModalComponent} from '../../../public/modal/file-view-modal.component';
import {JsonTransForm} from '../../../public/pipe/xn-json.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './info.component.html',
    styles: [
            `.table {
            font-size: 13px;
        }

        .btn-right {
            float: right
        }

        .btn {
            padding: 4px 12px;
        }`
    ]
})
export class InfoComponent implements OnInit {

    pageTitle = '企业资料';
    pageDesc = '';
    tableTitle = '企业资料';
    invoiceInfo = '开票信息';
    certTitle = '数字证书管理员';
    notifier = '重要通知联系人';
    orgFile = '企业文件';

    showEnterprise = true;
    appData: any = {};
    invoiceData: any = {};
    extendInfo: any = {};
    certData: any = {};
    notifierData: any = {};
    orgFileData: any;
    isAdministrator = false;
    isPlatform = false;
    appId: string = '';
    postApi = {
        notifier: '/custom/app_info/app_info/update_notifier',
        cert: '/custom/app_info/app_info/update_cert',
        app: '/custom/app_info/app_info/update_app',
        invoice: '/custom/app_info/app_info/update_invoice',  // 更新接口
    };
    public orgTypeLists = SelectOptions.get('orgType');
    public taxingType = SelectOptions.get('taxingType');

    constructor(private xn: XnService, private vcr: ViewContainerRef, public route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(x => {
            this.appId = x.appId;
        });
        // this.isPlatform = this.xn.user.orgType === 99;
        if (this.appId === undefined ) {
            this.xn.user.isAdmin ? this.isAdministrator = true : this.isAdministrator = false;
            this.initData();
        } else {
            this.customerInitData();

        }
    }

    /**
     * 更新企业文件
     */
    public handleOrgFileUpdate() {
        this.xn.router.navigate([`/console/record/new/supplier_upload_information`]);
    }

    /**
     *  查看文件
     * @param paramFile
     */
    public viewFile(paramFile) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, FileViewModalComponent, paramFile).subscribe();
    }

    /**
     *  查看资料
     * @param item
     * @param type {notifier:'重要通知联系人',cert:'数字证书管理员',app:'企业资料'}
     */
    public onViewEdit(item: any, type: string) {
        const params = this[`${type}ViewEdit`](item);
        XnModalUtils.openInViewContainer(this.xn, this.vcr, EditInfoModalComponent, params).subscribe(v => {
            if (v) {
                const postParams = {
                    notifier: {
                        notifierName: v.userName || '',
                        notifierMobile: v.mobile || '',
                        notifierCardType: v.cardType || '',
                        notifierCardNo: v.cardNo || '',
                        notifierEmail: v.email || ''
                    },
                    invoice: {
                        orgTaxpayerId: v.orgTaxpayerId || '',
                        taxBankName: v.taxBankName || '',
                        taxBankAccount: v.taxBankAccount || '',
                        taxAddress: v.taxAddress || '',
                        taxTelephone: v.taxTelephone || '',
                        receiver: v.receiver || '',
                        receiverPhoneNum: v.receiverPhoneNum || '',
                        taxingType: Number(v.taxingType),
                        email: v.email || '',
                    },
                    cert: {
                        certUserName: v.userName || '',
                        certUserMobile: v.mobile || '',
                        certUserCardType: v.cardType || '',
                        certUserCardNo: v.cardNo || '',
                        certUserEmail: v.email || ''
                    },
                    app: {
                        appName: v.appName || '',
                        orgAddress: v.orgAddress || '',
                        orgPostCode: v.orgPostCode || ''
                    }
                };
                this.xn.api.post(this.postApi[type], postParams[type]).subscribe(() => {
                    this.initData();
                });
            }
        });
    }

    /**
     * 重要通知联系人
     * @param item
     */
    private notifierViewEdit(item) {
        const params = {
            title: '更新重要通知联系人',
            size: ModalSize.Large,
            checker: [
                {
                    checkerId: 'userName',
                    required: true,
                    type: 'text',
                    title: '姓名',
                    validators: {
                        cnName: true
                    },
                    value: item.notifierName,
                },
                {
                    checkerId: 'mobile',
                    required: true,
                    type: 'text',
                    title: '手机号',
                    validators: {
                        mobile: true
                    },
                    value: item.notifierMobile
                }, {
                    checkerId: 'cardType',
                    required: true,
                    type: 'select',
                    title: '证件类型',
                    options: {ref: 'cardType'},
                    value: item.notifierCardType,
                },
                {
                    checkerId: 'cardNo',
                    required: true,
                    type: 'text',
                    title: '证件号码',
                    validators: {
                        card: {
                            name: 'cardType'
                        }
                    },
                    value: item.notifierCardNo
                },
                {
                    checkerId: 'email',
                    required: true,
                    type: 'text',
                    title: '邮件',
                    validators: {
                        email: true
                    },
                    value: item.notifierEmail
                }
            ]
        };
        return params;
    }

    /**
     * 企业资料
     * @param item
     */
    private appViewEdit(item) {
        const params = {
            title: '更新企业资料',
            size: ModalSize.Large,
            options: {tips: '点击“确定”后将自动更新法人信息'},
            checker: [
                {
                    checkerId: 'appName',
                    required: true,
                    type: 'text',
                    title: '企业名称',
                    validators: {
                        cnName: true
                    },
                    value: item.appName,
                },
                {
                    checkerId: 'orgAddress',
                    required: true,
                    type: 'text',
                    title: '联系地址',
                    value: item.orgAddress
                }, {
                    checkerId: 'orgPostCode',
                    required: true,
                    type: 'text',
                    title: '邮政编码',
                    validators: {
                        zip: true
                    },
                    value: this.extendInfo.orgPostCode,
                }
            ]
        };
        return params;

    }
    /**
     * 开票信息
     * @param item
     */
    private invoiceViewEdit(item) {
        const params = {
            title: '更新开票信息',
            size: ModalSize.Large,
            checker: [{
                title: '纳税识别号',
                checkerId: 'orgTaxpayerId',
                type: 'text',
                required: true,
                validators: {
                    taxNumber: true
                },
                value: item.orgTaxpayerId,
            },{
                title: '开户银行名称',
                checkerId: 'taxBankName',
                type: 'text',
                required: true,
                validators: {
                    cnName: true
                },
                value: item.taxBankName,
            },{
                title: '银行账号',
                checkerId: 'taxBankAccount',
                type: 'text',
                required: true,
                validators: {
                    number: true
                },
                value: item.taxBankAccount,
            },{
                title: '税务信息地址',
                checkerId: 'taxAddress',
                type: 'text',
                required: true,
                value: item.taxAddress,
            },{
                title: '税务信息电话 ',
                checkerId: 'taxTelephone',
                type: 'text',
                required: true,
                validators: {
                    mobileTel: true
                },
                value: item.taxTelephone,
            },{
                title: '收件人',
                checkerId: 'receiver',
                type: 'text',
                required: true,
                value: item.receiver,
            },{
                title: '收件人电话',
                checkerId: 'receiverPhoneNum',
                type: 'text',
                required: true,
                validators: {
                    mobile: true
                },
                value: item.receiverPhoneNum,
            },{
                checkerId: 'taxingType',
                required: true,
                type: 'radio',
                title: '开票类型',
                options: {ref: 'taxingType'},
                value: item.taxingType,
            },{
                title: '邮箱',
                checkerId: 'email',
                type: 'text',
                required: true,
                validators: {
                    email: true
                },
                value: item.email,
            }]
        };
        return params;
    }
    /**
     * 数字证书
     * @param item
     */
    private certViewEdit(item) {
        const params = {
            title: '更新数据证书管理员',
            size: ModalSize.Large,
            checker: [
                {
                    checkerId: 'userName',
                    required: true,
                    type: 'text',
                    title: '姓名',
                    validators: {
                        cnName: true
                    },
                    value: item.certUserName,
                },
                {
                    checkerId: 'mobile',
                    required: true,
                    type: 'text',
                    title: '手机号',
                    validators: {
                        mobile: true
                    },
                    value: item.certUserMobile
                }, {
                    checkerId: 'cardType',
                    required: true,
                    type: 'select',
                    title: '证件类型',
                    options: {ref: 'cardType'},
                    value: item.certUserCardType,
                },
                {
                    checkerId: 'cardNo',
                    required: true,
                    type: 'text',
                    title: '证件号码',
                    validators: {
                        card: {
                            name: 'cardType'
                        }
                    },
                    value: item.certUserCardNo
                },
                {
                    checkerId: 'email',
                    required: true,
                    type: 'text',
                    title: '邮件',
                    validators: {
                        email: true
                    },
                    value: item.certUserEmail
                }
            ]
        };
        return params;
    }

    private initData() {
        this.xn.loading.open();
        forkJoin(
            this.xn.api.post('/app_info/getapp', {}),
            this.xn.api.post('/app_info/get_tax_info', {}),   // 获取开票信息
            this.xn.api.post('/cert_info/get_cert_info', {}),
            this.xn.api.post('/notifier_info/get_notifier_info', {}),
            this.xn.api.post('/custom/avenger/customer_manager/get_app_file', {})
        ).subscribe(([app, taxInfo, cert, notifier, org]) => {
            this.appData = app.data;
            this.extendInfo = JSON.parse(app.data.extendInfo);
            this.invoiceData = taxInfo.data;
            this.certData = cert.data;
            this.notifierData = notifier.data;
            this.orgFileData = this.formValue(org.data);
        }, () => {
        }, () => {
            this.xn.loading.close();
        });
    }


    private customerInitData() {
        this.xn.loading.open();
            this.xn.api.post('/custom/avenger/customer_manager/org_file', {
                appId: this.appId
            }).subscribe(data => {
            console.log("/custom/avenger/customer_manager/org_file==",data);
            this.appData = data.data.appInfo;
            this.extendInfo = JSON.parse(this.appData.extendInfo);
            this.certData = data.data.certInfo;
            this.notifierData = data.data.notifierInfo;
            this.orgFileData = this.formValue(data.data.fileInfo);
        }, () => {
            this.xn.loading.close();
        });
    }

    /**
     *  格式化特定数据json
     * @param paramInfo
     */
    private formValue(paramInfo) {
        ['businessLicenseFile', 'certUserAuthorize', 'certUserCard', 'orgLegalCard', 'orgLegalCert', 'companyDecision', 'authorizationFile']
            .map(key => paramInfo[key] = JsonTransForm(paramInfo[key]));
        return paramInfo;
    }
}
