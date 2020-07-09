import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { XnService } from '../../services/xn.service';
import { FormGroup } from '@angular/forms';
import { XnFormUtils } from '../../common/xn-form-utils';
import { XnUtils } from '../../common/xn-utils';
import { XnModalUtils } from '../../common/xn-modal-utils';
import { HtmlModalComponent } from '../../public/modal/html-modal.component';
import { ModalSize } from '../../common/modal/components/modal';
import { RegisterSubmitListModalComponent } from '../../public/modal/register-submit-list-modal.component';

@Component({
    templateUrl: './ca.component.html',
    styles: [
        `label {
            font-weight: normal;
        }`,
        `.box-body {
            padding-bottom: 30px;
        }`,
        `.control-label {
            font-size: 12px;
            font-weight: bold
        }`,
        `.control-desc {
            font-size: 12px;
            padding-top: 7px;
            margin-bottom: 0;
            color: #999
        }`,
        `.xn-block {
            display: block
        }
        .helpUl li{
            text-align:left
        }
        `
        ,
    ]
})
export class CaComponent implements OnInit {

    step = 0;
    steped = 0;

    step1: any[];
    checkboxs: boolean[] = [false, false, false];

    step2: any[];

    adminRows: any[];
    caRows: any[];
    user1Rows: any[];
    user2Rows: any[];
    notifierRows: any[];

    // lastAdminRole: string = '';
    // isShowUser1: boolean = null; // 先要设置为null
    // isShowUser2: boolean = null; // 先要设置为null

    step4: any[];
    step1Form: FormGroup;
    step2Form: FormGroup;
    step3Form: FormGroup;
    step4Form: FormGroup;

    params: any = {};

    constructor(private xn: XnService, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        // 判断是否有草稿
        let draftTime = window.localStorage.getItem('registerDraftTime');
        let orgName = window.localStorage.getItem('registerDraftOrgName');
        if (draftTime && orgName) {
            let draftTime2 = parseInt(draftTime, 0);
            if (Date.now() < draftTime2 + 86400000 * 3) {

                // 草稿有效
                this.xn.msgBox.open(true, '发现您之前保存有注册草稿，是否加载草稿？', () => {
                    // 选择了是
                    this.xn.api.post('/user/get_draft', {
                        orgName: orgName
                    }).subscribe(json => {
                        // 把草稿的内容赋值
                        if (json.data) {
                            this.params = XnUtils.parseObject(json.data, {});
                            this.step = 1;
                            this.steped = 4;
                            this.buildForm1();
                        } else {
                            this.step = 1;
                            this.steped = 1;
                            this.buildForm1();
                        }
                    });

                }, () => {
                    // 选择了否
                    this.step = 1;
                    this.steped = 1;
                    this.buildForm1();
                });

                return;
            } else {
                // 过期了，删除草稿的标记
                window.localStorage.removeItem('registerDraftTime');
                window.localStorage.removeItem('registerDraftOrgName');
            }
        }

        this.step = 1;
        this.steped = 1;
        this.buildForm1();
    }

    private assign(stepRows) {
        for (let row of stepRows) {
            if (row.checkerId in this.params) {
                row.value = this.params[row.checkerId];
            }
        }
    }

    private buildChecker(stepRows) {
        for (let row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }

    private buildForm1() {
        this.step1 = [
            {
                title: '机构名称', checkerId: 'orgName', memo: '请填写与营业执照一致的名称',
                validators: {
                    insName: true
                }
            },
            {
                title: '管理员手机号码', checkerId: 'accountId', memo: '即为管理员登录帐号',
                validators: {
                    mobile: true
                }
            },
            // {
            //     title: '管理员手机号码', checkerId: 'accountId', memo: '即为管理员登录帐号', type: 'card'
            // },
            // {
            //     title: '金额', checkerId: 'accountId', memo: '即为管理员登录帐号', type: 'money'
            // },
            // {
            //     title: '证件类型测试checkbox', checkerId: 'accountId', type: 'checkbox', options: {ref: 'orgCodeType'}
            // },
            {
                title: '短信验证码', checkerId: 'code', type: 'sms',
                validators: {
                    minlength: 6,
                    maxlength: 6,
                    number: true,
                    sms: {
                        name: 'accountId',
                        error: '请先填写正确的管理员手机号码'
                    }
                },
                options: {
                    smsType: 1
                }
            }
        ];
        XnFormUtils.buildSelectOptions(this.step1);
        this.assign(this.step1);
        this.buildChecker(this.step1);
        this.step1Form = XnFormUtils.buildFormGroup(this.step1);
    }

    private buildForm2() {
        this.step2 = [
            {
                title: '机构名称', checkerId: 'orgName', options: { readonly: true }
            },
            {
                title: '证件类型', checkerId: 'orgCodeType', type: 'radio', options: { readonly: true, ref: 'orgCodeType' }
            },
            {
                title: '机构证件号码',
                checkerId: 'orgCodeNo',
                options: { readonly: true, titleLink: ['orgCodeType', 'orgCodeType'] }
            },
            {
                title: '组织机构代码', checkerId: 'orgCodeNo2', options: { showWhen: ['orgCodeType', '营业执照号'] }
            },
            {
                title: '纳税人识别号', checkerId: 'orgTaxpayerId'
            },
            {
                title: '法人代表姓名', checkerId: 'orgLegalPerson', options: { readonly: true }
            },
            {
                title: '注册地址', checkerId: 'orgRegisterAddress', options: { readonly: true }
            },
            {
                title: '联系地址', checkerId: 'orgAddress', memo: '要件邮寄地址（包括但不限于数字证书）',
                validators: {
                    insAddr: true
                }
            },
            {
                title: '邮政编码', checkerId: 'orgPostCode',
                validators: {
                    zip: true
                },
            },
            {
                title: '开票类型', checkerId: 'taxingType', type: 'radio-billingType', options: { ref: 'taxingType' },
                memo: '仅用于数字证书申请费用发票。普票申请后直接发送优先，专票申请后两个月内邮寄发送',
            },
            // 增加的
            {
                title: '开户银行名称', checkerId: 'taxBankName', options: { showWhen: ['taxingType', '2'] }
            },
            {
                title: '银行账号', checkerId: 'taxBankAccount', options: { showWhen: ['taxingType', '2'] }
            },
            {
                title: '公司固定电话', checkerId: 'taxTelephone', options: { showWhen: ['taxingType', '2'] }
            },
            // {
            //     title: '税务信息地址', checkerId: 'taxAddress'
            // },

            // {
            //     title: '收件人', checkerId: 'receiver'
            // },
            // {
            //     title: '收件人联系方式', checkerId: 'receiverPhoneNum'
            // },

            {
                title: '介绍企业名称', checkerId: 'orgIntroduce', memo: '填写真实有效公司', required: false
            },
            {
                title: '与介绍企业关系', checkerId: 'orgRelation', type: 'select', required: false,
                options: { ref: 'enterpriseRelationType' }
            },

        ];

        XnFormUtils.buildSelectOptions(this.step2);
        this.assign(this.step2);
        this.buildChecker(this.step2);
        this.step2Form = XnFormUtils.buildFormGroup(this.step2);
    }

    private buildForm3() {
        this.adminRows = [
            {
                title: '管理员姓名', checkerId: 'adminName', memo: '机构账户管理人',
                validators: {
                    cnName: true
                }
            },
            {
                title: '管理员手机号', checkerId: 'adminMobile', options: { readonly: true }, memo: '该角色登录号'
            },
            {
                title: '证件类型', checkerId: 'adminCardType', type: 'select', options: { ref: 'cardType' }, value: '身份证'
            },
            {
                title: '证件号码', checkerId: 'adminCardNo',
                validators: {
                    card: {
                        name: 'adminCardType'
                    }
                }
            },
            {
                title: '电子邮箱', checkerId: 'adminEmail',
                validators: {
                    email: true
                },
                memo: '该邮箱为之后保理费电子发票发送地址'
            }
        ];

        this.caRows = [
            {
                title: '请选择', checkerId: 'certUserMode', type: 'select', options: { ref: 'certUserMode' }, value: '同系统管理员'
            },
            {
                title: '姓名', checkerId: 'certUserName', memo: '即为数字证书申领经办人',
                options: {
                    showWhen: ['certUserMode', '新用户']
                },
                validators: {
                    cnName: true
                }
            },
            {
                title: '手机号', checkerId: 'certUserMobile', memo: '数字证书申领相关事项确认',
                options: {
                    showWhen: ['certUserMode', '新用户']
                },
                validators: {
                    mobile: true
                }
            },
            {
                title: '证件类型', checkerId: 'certUserCardType', type: 'select', value: '身份证',
                options: {
                    ref: 'cardType',
                    showWhen: ['certUserMode', '新用户']
                }
            },
            {
                title: '证件号码', checkerId: 'certUserCardNo', type: 'text',
                options: {
                    showWhen: ['certUserMode', '新用户']
                },
                validators: {
                    card: {
                        name: 'certUserCardType'
                    }
                }
            },
            {
                title: '电子邮箱', checkerId: 'certUserEmail', options: { showWhen: ['certUserMode', '新用户'] },
                validators: {
                    email: true
                }
            }
        ];

        this.user1Rows = [
            {
                title: '请选择', checkerId: 'user1Mode', type: 'select', options: { ref: 'user1Mode' }, value: '同系统管理员'
            },
            {
                title: '姓名', checkerId: 'user1Name', memo: '业务发起人', options: { showWhen: ['user1Mode', '新用户'] },
                validators: {
                    cnName: true
                }
            },
            {
                title: '手机号', checkerId: 'user1Mobile', memo: '该角色登录号', options: { showWhen: ['user1Mode', '新用户'] },
                validators: {
                    mobile: true
                }
            },
            {
                title: '证件类型', checkerId: 'user1CardType', type: 'select', value: '身份证',
                options: {
                    ref: 'cardType',
                    showWhen: ['user1Mode', '新用户']
                }
            },
            {
                title: '证件号码', checkerId: 'user1CardNo', options: { showWhen: ['user1Mode', '新用户'] },
                validators: {
                    card: {
                        name: 'user1CardType'
                    }
                }
            },
            {
                title: '电子邮箱', checkerId: 'user1Email', options: { showWhen: ['user1Mode', '新用户'] },
                validators: {
                    email: true
                }
            }
        ];

        this.user2Rows = [
            {
                title: '请选择', checkerId: 'user2Mode', type: 'select', options: { ref: 'user2Mode' }, value: '同系统管理员'
            },
            {
                title: '姓名', checkerId: 'user2Name', memo: '业务复核人', options: { showWhen: ['user2Mode', '新用户'] },
                validators: {
                    cnName: true
                }
            },
            {
                title: '手机号', checkerId: 'user2Mobile', memo: '该角色登录号', options: { showWhen: ['user2Mode', '新用户'] },
                validators: {
                    mobile: true
                }
            },
            {
                title: '证件类型', checkerId: 'user2CardType', type: 'select', value: '身份证',
                options: {
                    ref: 'cardType',
                    showWhen: ['user2Mode', '新用户']
                }
            },
            {
                title: '证件号码', checkerId: 'user2CardNo', options: { showWhen: ['user2Mode', '新用户'] },
                validators: {
                    card: {
                        name: 'user2CardType'
                    }
                }
            },
            {
                title: '电子邮箱', checkerId: 'user2Email', options: { showWhen: ['user2Mode', '新用户'] },
                validators: {
                    email: true
                }
            }
        ];

        this.notifierRows = [
            {
                title: '请选择', checkerId: 'notifierMode', type: 'select', options: { ref: 'notifierMode' }, value: '同系统管理员'
            },
            {
                title: '姓名', checkerId: 'notifierName', memo: '重要通知联系人', options: { showWhen: ['notifierMode', '新用户'] },
                validators: {
                    cnName: true
                }
            },
            {
                title: '手机号', checkerId: 'notifierMobile', memo: '该角色登录号', options: { showWhen: ['notifierMode', '新用户'] },
                validators: {
                    mobile: true
                }
            },
            {
                title: '证件类型', checkerId: 'notifierCardType', type: 'select', value: '身份证',
                options: {
                    ref: 'cardType',
                    showWhen: ['notifierMode', '新用户']
                }
            },
            {
                title: '证件号码', checkerId: 'notifierCardNo', options: { showWhen: ['notifierMode', '新用户'] },
                validators: {
                    card: {
                        name: 'notifierCardType'
                    }
                }
            },
            {
                title: '电子邮箱', checkerId: 'notifierEmail', options: { showWhen: ['notifierMode', '新用户'] },
                validators: {
                    email: true
                }
            }
        ];

        // 重置参数
        // this.lastAdminRole = '';
        // this.isShowUser1 = null; // 先要设置为null
        // this.isShowUser2 = null; // 先要设置为null

        XnFormUtils.buildSelectOptions(this.adminRows);
        XnFormUtils.buildSelectOptions(this.caRows);
        XnFormUtils.buildSelectOptions(this.user1Rows);
        XnFormUtils.buildSelectOptions(this.user2Rows);
        XnFormUtils.buildSelectOptions(this.notifierRows);
        this.assign(this.adminRows);
        this.assign(this.caRows);
        this.assign(this.user1Rows);
        this.assign(this.user2Rows);
        this.assign(this.notifierRows);
        this.buildChecker(this.adminRows);
        this.buildChecker(this.caRows);
        this.buildChecker(this.user1Rows);
        this.buildChecker(this.user2Rows);
        this.buildChecker(this.notifierRows);
        // .concat(this.caRows, this.user1Rows, this.user2Rows, this.notifierRows);
        const rows = this.adminRows.concat(this.caRows, this.user1Rows, this.user2Rows, this.notifierRows);
        this.step3Form = XnFormUtils.buildFormGroup(rows);

        // this.step3Form.get('adminRole').valueChanges.subscribe(v => {
        //     this.handleAdminRole(v);
        // });
        //
        // // 如果adminRole有值了，就要调用下handleAdminRole
        // if (!XnUtils.isEmpty(this.step3Form.value.adminRole)) {
        //     this.handleAdminRole(this.step3Form.value.adminRole);
        // }
    }

    private buildForm4() {
        this.step4 = [
            {
                title: '营业执照', checkerId: 'businessLicenseFile', type: 'file',
                options: {
                    filename: '营业执照',
                    fileext: 'jpg, jpeg, png',
                    picSize: '300'
                }
            },
            {
                title: '其他文件', checkerId: 'applicationFormFile', type: 'mfile',
                options: {
                    filename: '数字证书申请表',
                    fileext: 'jpg, jpeg, png',
                    picSize: '300'
                }, memo: '上传所有文件'
            }
        ];

        if (this.params.orgCodeType === '统一社会信用代码') {
            this.step4 = this.step4.filter(v => v.checkerId !== 'orgCodeCertFile');
        }

        // 是否存在父企业
        if (!this.params.parentOrgName) {
            this.step4 = this.step4.filter(v => v.checkerId !== 'parentGuaranteeLetterFile');
        }

        XnFormUtils.buildSelectOptions(this.step4);
        this.assign(this.step4);
        this.buildChecker(this.step4);
        this.step4Form = XnFormUtils.buildFormGroup(this.step4);
    }

    cssClass(step): string {
        if (step === this.steped) {
            return 'current';
        }
        if (step > this.steped) {
            return 'disabled';
        } else {
            return 'success';
        }
    }

    onNext() {
        let values = this[`step${this.step}Form`].value;
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                this.params[key] = values[key];
            }
        }

        this.step = this.step + 1;
        this.steped = Math.max(this.steped, this.step);

        // 重新创建表单
        this[`buildForm${this.step}`]();
    }

    onPrev() {
        this.step = this.step - 1;

        // 重新创建表单
        this[`buildForm${this.step}`]();
    }

    onStep1Submit() {
        if (this.step1Form.value.orgName !== this.params.orgName) {
            // 第一次时去查询机构信息
            this.xn.api.post('/user/check_reg', {
                mobile: this.step1Form.value.accountId,
                code: this.step1Form.value.code,
                orgName: this.step1Form.value.orgName
            }).subscribe(json => {
                console.log('查询到的公司信息', json);
                if (this.step1Form.value.orgName === '徐州市建设工程检测中心') {
                    this.params.orgCodeType = '营业执照号';
                    this.params.orgCodeNo = '123203001363893770';
                    this.params.orgLegalPerson = '朱岳兴';
                    this.params.orgRegisterAddress = '徐州市和平新村10号楼';
                    this.params.adminMobile = this.step1Form.value.accountId;
                    this.onNext();
                } else {
                    // 查询白名单信息
                    let orgName = this.step1Form.value.orgName;

                    this.xn.api.post('/white_list/find', {
                        orgName: orgName
                    }).subscribe(v => {
                        this.params.parentOrgName = v.data.parentOrgName || false;
                    });

                    // 判断是否有草稿
                    if (json.data && json.data.draft) {
                        console.log('draft: ', json.data.draft);
                        this.params = XnUtils.parseObject(json.data.draft, {});
                    } else {
                        this.params.orgCodeType = json.data.orgCodeType;
                        this.params.orgCodeNo = json.data.orgCodeNo;
                        this.params.orgLegalPerson = json.data.orgLegalPerson;
                        this.params.orgRegisterAddress = json.data.orgRegisterAddress;
                        this.params.qichachaData = json.data.qichachaData;
                    }
                    this.params.adminMobile = this.step1Form.value.accountId;
                    this.onNext();
                }
            });
        } else {
            this.onNext();
        }
    }

    onCheckBox(index, event) {
        this.checkboxs[index - 1] = event.target.checked;
    }

    onRead(index, regOrgType?: number) {
        let url, title;
        switch (index) {
            case 1:
                title = '链融科技供应链服务平台守则';
                url = '/assets/lr/html/shou-ze.html';
                break;
            case 2:
                title = '链融科技供应链服务平台用户承诺';
                if (regOrgType !== 2 && regOrgType !== 3) {
                    regOrgType = 1;
                }
                url = `/assets/lr/html/cheng-nuo-${regOrgType}.html`;
                break;
            case 3:
                title = '电子认证服务协议';
                url = '/assets/lr/html/ca.html';
                break;
        }

        this.xn.api.assets(url + '?r=' + Math.random()).subscribe((rsp: any) => {
            let html = rsp._body;
            html = html.replace(/\{\{orgName\}\}/g, this.step1Form.value.orgName);
            XnModalUtils.openInViewContainer(this.xn, this.vcr, HtmlModalComponent,
                {
                    type: 'ok',
                    title: title,
                    html: html,
                    size: ModalSize.Large
                }).subscribe(() => {
                });
        });
    }

    onRead2() {
        const orgName = this.step1Form.value.orgName;
        if (XnUtils.isEmpty(orgName)) {
            this.xn.msgBox.open(false, '请填写机构名称后再点击阅读');
            return;
        }

        this.xn.api.post('/white_list/find', {
            orgName: orgName
        }).subscribe(v => {
            console.log(v);
            if (v.data && v.data.orgType) {
                this.onRead(2, parseInt(v.data.orgType, 0));
            } else {
                this.onRead(2, 1);
            }
        });
    }

    onStep1Valid() {
        return this.step1Form.valid && this.checkboxs.indexOf(false) < 0;
    }

    onSubmit() {
        let values = this[`step${this.step}Form`].value;
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                this.params[key] = values[key];
            }
        }
        this.params.regOrgType = '1';  // TODO
        this.handleParams();
        ///
        if (values.applicationFormFile && values.businessLicenseFile) {
            let businessFile = [];
            const LicenseFileLen = JSON.parse(values.businessLicenseFile);
            businessFile.push(LicenseFileLen);
            const otherFileLen = JSON.parse(values.applicationFormFile).length;
            if (!((this.params.taxingType === '1' && otherFileLen && LicenseFileLen && (otherFileLen + businessFile.length) >= 8) ||
                (this.params.taxingType === '2' && otherFileLen && LicenseFileLen && (otherFileLen + businessFile.length) >= 9))) {
                this.xn.msgBox.open(false, `缺少资料(${this.params.taxingType === '1' ? '应上传资料为8张' : '应上传资料为9张'})，请您再次对照资料清单，确认是否齐全。`);
                return;
            }
        }
        const modalparams = Object.assign({}, this.params);
        XnModalUtils.openInViewContainer(this.xn, this.vcr, RegisterSubmitListModalComponent, modalparams
        ).subscribe(v => {
            if (v === 'ok') {
                this.xn.loading.open();
                this.xn.api.post('/user/register', this.params).subscribe(json => {
                    if (json && json.ret === 0) {
                        // 删除草稿的标记
                        window.localStorage.removeItem('registerDraftTime');
                        window.localStorage.removeItem('registerDraftOrgName');
                        this.xn.loading.close();
                        console.log(json.data);
                        this.xn.msgBox.open(false, '注册资料已提交，请留意证书申领结果', () => {
                            this.xn.router.navigate(['/user/login']);
                        });
                    }
                });
            }
        });

        ///
        // console.log('提交参数值', this.params);
        // // 删除草稿的标记
        // window.localStorage.removeItem('registerDraftTime');
        // window.localStorage.removeItem('registerDraftOrgName');
        // this.xn.loading.close();
        // const log_01 = '请确认是否已上传以下证明材料清单: 1、链融科技供应链服务平台数字证书申请表（一式三联）2、电子认证服务协议 3、法定代表人授权委托书 4、汇款回执 5、身份证复印件 6、营业执照复印件';
        // const log_02 = '请确认是否已上传以下证明材料清单: 1、链融科技供应链服务平台数字证书申请表（一式三联）2、电子认证服务协议 3、法定代表人授权委托书 4、汇款回执 5、身份证复印件 6、营业执照复印件 7、增值税信息采集表';
        // const taxingType = this.params.taxingType;
        // let logMsg = parseInt(taxingType, 10) === 1 ? log_01 : log_02;
        // this.xn.msgBox.open(true, logMsg , () => {
        //     this.xn.api.post('/user/register', this.params).subscribe(json => {
        //         if (json && json.ret === 0) {
        //             console.log(json.data);
        //             this.xn.msgBox.open(false, '注册资料已提交，请留意证书申领结果', () => {
        //                 this.xn.router.navigate(['/user/login']);
        //             });
        //         }
        //     });
        // });
    }

    handleParams() {
        if (this.params.certUserMode !== '新用户') {
            delete this.params.certUserName;
            delete this.params.certUserMobile;
            delete this.params.certUserCardType;
            delete this.params.certUserCardNo;
        }

        if (this.params.user1Mode !== '新用户') {
            delete this.params.user1Name;
            delete this.params.user1Mobile;
            delete this.params.user1CardType;
            delete this.params.user1CardNo;
        }

        if (this.params.user2Mode !== '新用户') {
            delete this.params.user2Name;
            delete this.params.user2Mobile;
            delete this.params.user2CardType;
            delete this.params.user2CardNo;
        }

        if (this.params.notifierMode !== '新用户') {
            delete this.params.notifierName;
            delete this.params.notifierMobile;
            delete this.params.notifierCardType;
            delete this.params.notifierCardNo;
        }
    }

    onOk() {
        this.xn.router.navigate(['/console']);
    }

    // private enableCtrl(name: string) {
    //     let ctrl = this.step3Form.get(name);
    //     ctrl.enable({onlySelf: false, emitEvent: true});
    //     ctrl.updateValueAndValidity();
    // }
    //
    // private disableCtrl(name: string) {
    //     let ctrl = this.step3Form.get(name);
    //     ctrl.disable();
    // }
    //
    // private handleAdminRole(adminRole: string) {
    //     if (adminRole === this.lastAdminRole) return;
    //     this.lastAdminRole = adminRole;
    //
    //     const role = parseInt(adminRole);
    //     const isShowUser1: boolean = (role !== 1 && role !== 3);
    //     const isShowUser2: boolean = (role !== 2 && role !== 3);
    //
    //     if (isShowUser1 !== this.isShowUser1) {
    //         this.isShowUser1 = isShowUser1;
    //         if (isShowUser1) {
    //             this.enableCtrl(`user1Mobile`);
    //             this.enableCtrl(`user1Name`);
    //             this.enableCtrl(`user1CardType`);
    //             this.enableCtrl(`user1CardNo`);
    //             this.enableCtrl(`user1Email`);
    //         }
    //         else {
    //             this.disableCtrl(`user1Mobile`);
    //             this.disableCtrl(`user1Name`);
    //             this.disableCtrl(`user1CardType`);
    //             this.disableCtrl(`user1CardNo`);
    //             this.disableCtrl(`user1Email`);
    //         }
    //     }
    //
    //     if (isShowUser2 !== this.isShowUser2) {
    //         this.isShowUser2 = isShowUser2;
    //         if (isShowUser2) {
    //             this.enableCtrl(`user2Mobile`);
    //             this.enableCtrl(`user2Name`);
    //             this.enableCtrl(`user2CardType`);
    //             this.enableCtrl(`user2CardNo`);
    //             this.enableCtrl(`user2Email`);
    //         }
    //         else {
    //             this.disableCtrl(`user2Mobile`);
    //             this.disableCtrl(`user2Name`);
    //             this.disableCtrl(`user2CardType`);
    //             this.disableCtrl(`user2CardNo`);
    //             this.disableCtrl(`user2Email`);
    //         }
    //     }
    // }
    downloadAll() {
        this.download();

    }

    download() {
        let url, params, filename;
        const now = new Date();
        url = '/pdf/contract';
        params = {
            flag: 8,
            orgName: this.params.orgName,
            orgCodeNo: this.params.orgCodeNo,
            orgRegisterAddress: this.params.orgRegisterAddress,
            orgEmail: this.params.certUserMode === '新用户' ? this.params.certUserEmail : this.params.adminEmail,
            orgCodeNo2: this.params.orgCodeType === '营业执照号' ? this.params.orgCodeNo2 : '',
            orgTaxpayerId: this.params.orgTaxpayerId,
            orgAddress: this.params.orgAddress,
            orgPostCode: this.params.orgPostCode,
            certUserName: this.params.certUserMode === '新用户' ? this.params.certUserName : this.params.adminName,
            certUserMobile: this.params.certUserMode === '新用户' ? this.params.certUserMobile : this.params.adminMobile,
            certUserCardNo: this.params.certUserMode === '新用户' ? this.params.certUserCardNo : this.params.adminCardNo,
            taxTelephone: this.params.taxTelephone,
            legalPerson: this.params.orgLegalPerson,
            entrustedCompany: this.params.orgName, // 委托单位
            mandatary: this.params.certUserMode === '新用户' ? this.params.certUserName : this.params.adminName,
            idCode: this.params.certUserMode === '新用户' ? this.params.certUserCardNo : this.params.adminCardNo, // 被委托人人身份证编号
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            day: now.getDate(),
            taxBankName: this.params.taxBankName,
            taxBankAccount: this.params.taxBankAccount
        };
        if (parseInt(this.params.taxingType, 10) === 1) {
            params.flag = 88;
        }
        filename = 'CA认证资料清单.pdf';
        this.xn.api.download(url, params).subscribe((v: any) => {
            console.log('download subscribe');
            this.xn.api.save(v._body, filename);
        });
    }

    /**
     * 保存草稿
     */
    onSaveDraft() {
        // 保存当前页面的文件到草稿
        this.saveFileDraft();
        // 保存到db
        this.xn.api.post('/user/save_draft', {
            orgName: this.params.orgName,
            draft: JSON.stringify(this.params),
        }).subscribe(() => {
            // 在localstorage里写个标记
            window.localStorage.setItem('registerDraftTime', Date.now().toString(10));
            window.localStorage.setItem('registerDraftOrgName', this.params.orgName);

            this.xn.msgBox.open(false, '注册信息已成功保存草稿（三天内有效），您下次注册时会自动加载草稿信息！');
        });
    }

    // 保存当前页面的文件到草稿，不保存申请表和法人授权书
    saveFileDraft() {
        let values = this[`step${this.step}Form`].value;
        for (const key in values) {
            if (key === 'applicationFormFile' || key === 'letterOfAttorneyFile') {
                continue;
            }
            this.params[key] = values[key];
        }
    }
}
