import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl } from '@angular/forms';
import { XnService } from '../../../../services/xn.service';
import { SelectOptions } from '../../../../config/select-options';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { PublicCommunicateService } from '../../../../services/public-communicate.service';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { MfilesViewModalComponent } from '../../share/modal/mfiles-view-modal.component';
import { InvoiceDataViewModalComponent } from '../../share/modal/invoice-data-view-modal.component';
import { isNullOrUndefined } from 'util';
import { LoadingPercentService } from '../../../../services/loading-percent.service';
import { SingleSearchListModalComponent } from '../../../dragon/share/modal/single-searchList-modal.component';
import { forkJoin } from 'rxjs/observable/forkJoin';
import * as _ from 'lodash';

@Component({
    templateUrl: './zhongdeng-record.component.html',
    styles: [`
        .button-group .btn {
            width: 100px;
            margin-right: 20px;
        }
        .clearfix:after {
            content: '.';
            height: 0;
            display: block;
            clear: both;
        }
        .clearfix {
            zoom: 1;
        }
    .desc{
        word-wrap: break-word;
        min-height: 100px;
        max-height: 200px;
        overflow-y: scroll;
    }

    .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: @g53;
    z-index: 10000;
}
    `]
})
export class ZhongdengRecordComponent implements OnInit {
    mainForm: FormGroup;
    info: any = {};

    pageTitle = '';
    flowTitle = '保理商中登登记';
    // 登记业务类型
    public type: any = SelectOptions.get('registerType');
    // 登记期限
    public days: any = SelectOptions.get('registerDays');
    public companyType: any[] = SelectOptions.get('zhongdengCompanyType');
    public registerType: number = 0;
    public registerDays: number = 0;
    public show: boolean = true;
    public manual: boolean = false;

    public handRegister: {};
    public isFinish: boolean = false;
    public isJudge: boolean = false;
    public registerNum: string = '';
    public modifiedCode: string = '';
    public registerFile = [];
    public memo: string;
    // 处理文件传输需要的参数
    public obj: any;
    public afiles: any;
    public rfiles: any[] = [];
    public checkId: string;
    public assetFileList = [];
    public asset = {};
    public showAlert: string = '请求正在进行中，是否跳转到台账列表';

    form1: FormGroup;
    form2: FormGroup;
    public ctrl1: AbstractControl;
    public formModule: string = 'dragon-input';
    public checker1 = [{
        title: '登记证明文件',
        checkerId: 'registerFile',
        type: 'dragonMfile',
        required: 1,
        checked: false,
        options: { 'fileext': 'jpg, jpeg, png, pdf', "picSize": "500" },
        value: ''
    }];
    public options = { 'fileext': 'pdf' };
    public files = [];
    public flags = []; // 主题一致性
    public debtUnits = []; // 收款单位
    public companyTypesValue = [];//
    public alert = [];

    public registerId: number = -1;
    public typeLabel: string;
    public daysLabel: string;
    public status: number = -1;
    public amountTotal: string;
    public contractIdStr: string;
    public zhondengStatus: number;
    public desc: string;
    public maskshow = true;
    selectValue = '';
    public isChangeFile: boolean = false;
    public factoringOrgNameList = [];

    constructor(private xn: XnService,
        private route: ActivatedRoute,
        private publicCommunicateService: PublicCommunicateService,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private loading: LoadingPercentService,
    ) {
    }

    ngOnInit() {
        // console.log(this.route.snapshot.params['id']);
        this.registerId = this.route.snapshot.params['id'];
        this.zhondengStatus = this.route.snapshot.params['status'];
        this.xn.dragon.post('/zhongdeng/zd/getRegisterInfo', { registerId: this.registerId }).subscribe(json => {
            if (json.ret === 0) {
                this.info = json.data.zdInfo;
                console.log(this.info);
                this.buildTypeAndDays();
                this.status = this.info['status'];
                this.amountTotal = '' + this.info['amountTotal'];
                this.contractIdStr = this.info['contractIdStr'];
                this.desc = this.info['desc'];
                this.registerType = this.info['registerType'];
                this.registerDays = this.info['registerDays'];
                this.memo = this.info['memo'];
                this.modifiedCode = this.info['modifiedCode'];
                this.registerNum = this.info['registerNum'];
                this.checker1[0].value = this.info['registerFile'];
                // this.assetFileList
                // this.info.list = [{
                //     mainFlowId: "contract_20191216_28442_lg",
                //     assetFile: "",
                //     flag: 0,
                //     companyType: 1,
                //     headquarters: "深圳市龙光控股有限公司",
                //     projectCompany: "富德生命人寿保险股份有限公司",
                //     debtUnit: "深圳市新纶科技股份有限公司",
                //     receive: 8089.89,
                //     payConfirmId: "",
                //     invoiceNum: "01043775",
                //     factoringEndDate: "",
                //     changePrice: 8089.89,
                // }]
                for (let i = 0; i < this.info.list.length; i++) {
                    this.flags[i] = this.info.list[i].flag;
                    this.debtUnits[i] = this.info.list[i].debtUnit;
                    this.factoringOrgNameList[i] = this.info.list[i].factoringOrgName;
                    this.companyTypesValue[i] = this.info.list[i].companyType;
                    this.files[i] = {
                        mainFlowId: ''
                    };
                    this.files[i]['mainFlowId'] = this.info.list[i].mainFlowId;
                    this.alert[i] = '';
                    // if(this.info)
                    // let asset1 = {};
                    // asset1['mainFlowId'] = this.info.list[i].mainFlowId;
                    // asset1['assetFile'] = this.info.list[i].assetFile;
                    // asset1['flag'] = this.flags[i];
                    // asset1['companyType'] = this.companyTypesValue[i];
                    // this.assetFileList.push(asset1);
                }
                console.info('manaul==>', this.manual);
            }
        });
        XnFormUtils.buildSelectOptions(this.checker1);
        this.buildChecker(this.checker1);
        this.form1 = XnFormUtils.buildFormGroup(this.checker1);
        this.ctrl1 = this.form1.get('registerFile');
        this.ctrl1.valueChanges.subscribe(x => {
            if (x && this.judgeDataType(JSON.parse(x)) && JSON.parse(x).length > 0) {
                this.rfiles = JSON.parse(x);
            } else {
                this.rfiles = [];
            }
        });
    }

    ngAfterViewChecked() {
        if (this.isFinish && !this.isJudge) {
            this.judgeValue();
        }
    }
    getCompanytype(e, i: number, paramMainflowId) {
        this.companyTypesValue[i] = Number(e.target.value);
        for (let j = 0; j < this.debtUnits.length; j++) {
            if ((this.debtUnits[j] === this.debtUnits[i]) && (j !== i)) {
                this.companyTypesValue[j] = this.companyTypesValue[i];
            }
        }
    }
    public arrayLength(paramFileInfos: any) {
        if (!paramFileInfos) {
            return false;
        }
        const obj =
            typeof paramFileInfos === 'string'
                ? paramFileInfos.split(',')
                : [paramFileInfos];
        return obj;
    }

    public viewMore(param) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, InvoiceDataViewModalComponent, param).subscribe(() => {
        });
    }

    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
        }
    }

    public buildTypeAndDays() {
        const obj1 = [].concat(this.type).find(x => x.value.toString() === this.info['registerType'].toString());
        const obj2 = [].concat(this.days).find(x => x.value.toString() === this.info['registerDays'].toString());
        this.typeLabel = obj1 ? obj1.label : '';
        this.daysLabel = obj2 ? obj2.label : '';
    }
    // 登记业务类型查询
    public changeType(val) {
        this.registerType = parseInt(val);
        this.info['registerType'] = this.registerType;
    }

    // 登记期限查询
    public changeDays(val) {
        this.registerDays = parseInt(val);
        this.info['registerDays'] = this.registerDays;
    }

    public isNotShow() {
        this.show = false;
    }

    public isShow() {
        this.show = true;
    }
    changeFile() {
        this.isChangeFile = true;
        this.info.status = 1;
        this.isFinish = false;
        this.manualRegister();
    }

    public manualRegister() {
        if (!this.isChangeFile) {
            document.getElementsByClassName('registerNum')[0].removeAttribute('disabled');
            document.getElementsByClassName('modifiedCode')[0].removeAttribute('disabled');
        }

        this.isFinish = true;

        this.manual = true;
        this.ctrl1.setValue(this.info['registerFile']);
        for (let i = 0; i < this.info.list.length; i++) {
            this.flags[i] = this.info.list[i].flag;
            this.debtUnits[i] = this.info.list[i].debtUnit;
            this.companyTypesValue[i] = this.info.list[i].companyType;
            this.files[i] = {
                mainFlowId: ''
            };
            this.files[i]['mainFlowId'] = this.info.list[i].mainFlowId;
            if (this.info.list[i].assetFile !== '') {
                this.files[i].file = JSON.parse(this.info.list[i].assetFile)[0];

            }
            this.assetFileList = this.info.list.map(item => {
                const {
                    flag,
                    mainFlowId,
                    companyType,
                    assetFile
                } = item;
                return {
                    flag,
                    mainFlowId,
                    companyType,
                    assetFile
                };
            });

            this.alert[i] = '';
        }
    }

    public manualRegisterFinish() {
        // this.buildAssetFileList();
        this.buildRegisterFile();

        this.info['modifiedCode'] = this.modifiedCode;
        this.info['registerNum'] = this.registerNum;
        this.info['memo'] = this.memo ? this.memo : '';
        this.assetFileList.map((asset, index) => {
            asset['companyType'] = this.companyTypesValue[index];
        });
        this.handRegister = {
            registerId: this.registerId,
            registerType: this.registerType,
            registerDays: this.registerDays,
            contractIdStr: this.contractIdStr,
            amountTotal: parseFloat(this.amountTotal),
            desc: this.desc,
            registerNum: this.registerNum,
            modifiedCode: this.modifiedCode,
            registerFile: JSON.stringify(this.registerFile),
            memo: this.memo ? this.memo : '',
            assetFileList: this.assetFileList
        };
        this.xn.dragon
            .post('/zhongdeng/zd/handRegister', this.handRegister)
            .subscribe(x => {
                if (x.ret === 0) {
                    this.isJudge = true;
                    this.info.status = 3;
                    this.manual = false;
                    this.info['registerType'] = this.registerType;
                    this.info['registerDays'] = this.registerDays;
                    this.assetFileList.forEach((x, i) => {
                        this.info.list[i].assetFile = this.assetFileList[i].assetFile;

                    });
                    // this.info.list[i].assetFile = this.assetFileList[i];
                    // 人工登记完成，人工登记、取消登记按钮不可用
                    this.registerFinish();
                    this.buildTypeAndDays();
                    this.cdr.markForCheck();
                    this.xn.msgBox.open(true, "已完成登记,是否跳转到台账列表", () => {
                        this.xn.router.navigate([`/machine-account`]);
                    });
                }
            });
    }

    public onBeforeUpload(e, i) {
        if (this.files[i]['file']) {
            e.preventDefault();
            this.xn.msgBox.open(false, '请先删除已上传的文件，才能上传新文件');
            return;
        }
    }

    viewPersonInfo(type: number) {
        let companylist = [];
        if (type === 1) {
            companylist = _.sortedUniq(this.debtUnits);
        } else {
            companylist = _.sortedUniq(this.factoringOrgNameList);
        }
        // this.debtUnits = _.sortedUniq(this.debtUnits);
        const mainFlowIds$ = companylist.map(temp =>
            this.xn.api.post('/custom/dragon/verify_business_file/get_seller_info',
                {
                    orgName: temp,
                }));
        forkJoin(mainFlowIds$).subscribe(async (x: any) => {
            let dataInfo = x.map(x => x.data);
            let params = {
                get_url: '',
                get_type: '',
                multiple: false,
                label: '出让人信息',
                heads: [
                    { label: '注册资本', value: 'registCapi', type: 'text' },
                    { label: '组织机构代码', value: 'orgNo', type: 'text' },
                    { label: '工商注册号', value: 'no', type: 'text' },
                    { label: '法定代表人', value: 'operName', type: 'text' },
                    { label: '所属行业', value: 'econKind', type: 'text' },
                    { label: '注册地址', value: 'address', type: 'text' },


                    // { label: '发票文件', value: 'invoiceFile',type: 'file' },
                ],
                searches: [],
                key: '',
                data: dataInfo || [],
                total: dataInfo.length || 0,
                inputParam: {
                },
            };
            if (type === 1) {
                params.heads.unshift({ label: '收款单位', value: 'orgName', type: 'text' });
            } else {
                params.heads.unshift({ label: '单位', value: 'orgName', type: 'text' });

            }
            XnModalUtils.openInViewContainer(this.xn, this.vcr, SingleSearchListModalComponent, params).subscribe(v => {
                if (v === null) {
                    return;
                }
            });
        });
    }

    public onUploadFile(e, id, i, companyType) {
        if (e.target.files.length === 0) {
            return;
        }
        let err = this.validateFileExt(e.target.files[0].name);
        if (err.length > 0) {
            this.alert[i] = err;

            // 把file input的值置为空，这样下次选择同一个文件还能触发这个请求
            $(e.target).val('');
            return;
        } else {
            this.alert[i] = '';
        }
        if (e.target.files[0].size / (1024 * 1024) > 80) {
            this.xn.msgBox.open(false, '很抱歉，您允许上传的图片不能超过80M，谢谢');
            return;
        }

        const fd = new FormData();
        fd.append('file_data', e.target.files[0], e.target.files[0].name);
        this.loading.open(1, 0);
        this.xn.dragon.upload('/file/pdfWk', fd).subscribe(v => {
            if (v.type === 'complete') {
                if (v.data.ret === 0) {
                    this.files[i]['file'] = {
                        fileName: v.data.data.fileName,
                        fileId: v.data.data.fileId,
                        filePath: v.data.data.filePath,
                    };
                    if (v.data.data.orgName === this.debtUnits[i]) {
                        this.flags[i] = 1;
                    } else {
                        this.flags[i] = 2;
                    }
                    this.pushAsset(i, id);
                    this.showAsset(i);
                    this.loading.close();
                }
            }
        });
    }

    systemRegister() {
        this.xn.msgBox.open(true, this.showAlert, () => {
            this.xn.router.navigate([`/machine-account`]);
        });
        let infos = [];
        this.info.list.forEach((x, index) => {
            infos.push({ 'mainFlowId': x.mainFlowId, companyType: this.companyTypesValue[index] });

        });
        this.buildRegisterFile();
        this.info['modifiedCode'] = this.modifiedCode;
        this.info['registerNum'] = this.registerNum;

        this.handRegister = {
            registerId: this.registerId,
            registerType: this.registerType,
            registerDays: this.registerDays,
            assetFileList: infos
        };
        //this.xn.loading.open();
        this.xn.avenger.post2('/sub_system/zd/system_register', this.handRegister).subscribe(x => {
            //this.xn.loading.close();
            if (x.ret === 0) {
                this.modifiedCode = x.data['modifiedCode'];
                this.registerNum = x.data['registerNum'];
                this.info.registerNum = x.data['registerNum'];
                this.info.modifiedCode = x.data['registerNum'];
                this.info.status = 3;
                this.manual = false;
                this.info['registerType'] = this.registerType;
                this.info['registerDays'] = this.registerDays;
                this.buildTypeAndDays();
                this.info.registerFile = x.data['registerFile'];
                for (let i = 0; i < x.data.assetList.length; i++) {
                    this.files[i] = {
                        mainFlowId: ''
                    };
                    this.files[i]['mainFlowId'] = x.data.assetList[i].mainFlowId;
                    this.alert[i] = '';
                    this.files[i].file = x.data.assetList[i].assetFile;
                    this.info.list[i].assetFile = x.data.assetList[i].assetFile;
                }
                this.cdr.markForCheck();
                $('.xn-msgbox-msg span').text('已完成系统中等登记，是否跳转到台账列表');

            } else {
                $('.xn-msgbox-msg span').text(`${x.msg}，是否跳转到台账列表`);
            }
        });
        //this.maskshow = false;
    }

    /**
     * 上传的文件将其放入到assetFileList
     * @param {*} i
     * @param {*} id
     */
    public pushAsset(i, id) {
        let asset1 = {};
        let array = [];
        array.push(this.files[i]['file']);
        asset1['mainFlowId'] = id;
        asset1['assetFile'] = JSON.stringify(array);
        asset1['flag'] = this.flags[i];
        asset1['companyType'] = this.companyTypesValue[i];
        this.assetFileList.push(asset1);
    }

    /**
     * 如果有相同收款单位那么查询证明文件相同，也同步显示
     * @param {*} i
     */
    public showAsset(i) {
        for (let j = 0; j < this.debtUnits.length; j++) {
            if ((this.debtUnits[j] === this.debtUnits[i]) && (j !== i)) {
                this.flags[j] = this.flags[i];
                this.companyTypesValue[j] = this.companyTypesValue[i];
                this.files[j]['file'] = this.files[i]['file'];
                this.pushAsset(j, this.files[j]['mainFlowId']);
            }
        }
    }

    public onRemove(id, j) {
        delete this.files[j]['file'];
        this.flags[j] = 0;
        const div = document.getElementsByClassName('asset')[j];
        const input = div.getElementsByTagName('input')[0];
        input.value = '';
        for (let i = 0; i < this.assetFileList.length; i++) {
            if (this.assetFileList[i]['mainFlowId'] === id) {
                this.assetFileList.splice(i, 1);
            }
        }
        // 有相同的收款单位时，查询证明文件删除那么其余也同步
        for (let z = 0; z < this.debtUnits.length; z++) {
            if ((this.debtUnits[z] === this.debtUnits[j]) && (z !== j)) {
                delete this.files[z]['file'];
                this.flags[z] = 0;
                const div = document.getElementsByClassName('asset')[z];
                const input = div.getElementsByTagName('input')[0];
                input.value = '';
                for (let i = 0; i < this.assetFileList.length; i++) {
                    if (this.assetFileList[i]['mainFlowId'] === this.files[z]['mainFlowId']) {
                        this.assetFileList.splice(i, 1);
                    }
                }
            }
        }
    }

    /**
     *  验证所选文件格式，根据文件后缀
     * @param s 文件全名
     */
    private validateFileExt(s: string) {
        if (isNullOrUndefined(this.options)) {
            return '';
        }
        if ('fileext' in this.options) {
            const exts = this.options.fileext
                .replace(/,/g, '|')
                .replace(/\s+/g, ''); // 删除所有空格
            if (s.match(new RegExp('\\.(' + exts + ')$', 'i'))) {
                return '';
            } else {
                return `只支持以下文件格式: ${this.options.fileext}`;
            }
        } else {
            return '';
        }
    }

    public buildRegisterFile() {
        this.registerFile = [];
        for (let i = 0; i < this.rfiles.length; i++) {
            let file = {};
            file['fileId'] = this.rfiles[i].fileId;
            file['fileName'] = this.rfiles[i].fileName;
            file['filePath'] = this.rfiles[i].filePath;
            this.registerFile.push(file);
        }
        this.info['registerFile'] = this.registerFile.length > 0 ? JSON.stringify(this.registerFile) : '';
    }

    public cancelRegister() {
        this.xn.dragon
            .post('/zhongdeng/zd/cancelRegister', { registerId: this.info['registerId'] })
            .subscribe(x => {
                if (x.ret === 0) {
                    console.log("取消登记完成");
                    this.onCancel();
                }
            });
    }

    public registerFinish() {
        if (!this.isChangeFile) {
            document.getElementsByClassName('handRe')[0].setAttribute('disabled', 'disabled');
            document.getElementsByClassName('cancelRe')[0].setAttribute('disabled', 'disabled');
        }
        // let cancel = document.getElementsByClassName('pull-left')[0];
        // if (!cancel.hasAttribute('disabled')) {
        //     cancel.setAttribute('disabled', 'disabled');
        // }
    }

    /**
     *  取消并返回
     */
    public onCancel() {
        if (Number(this.zhondengStatus) === 1) {
            let list = [];
            this.buildRegisterFile();
            this.info['modifiedCode'] = this.modifiedCode;
            this.info['registerNum'] = this.registerNum;
            this.info['memo'] = this.memo ? this.memo : '';
            this.handRegister = {
                registerId: this.registerId,
                registerType: this.registerType,
                registerDays: this.registerDays,
                contractIdStr: this.contractIdStr,
                amountTotal: parseFloat(this.amountTotal),
                desc: this.desc,
                registerNum: this.registerNum,
                modifiedCode: this.modifiedCode,
                registerFile: JSON.stringify(this.registerFile),
                memo: this.memo ? this.memo : '',
                assetFileList: this.assetFileList
            }
            list.push(this.handRegister);
            this.xn.dragon
                .post('/zhongdeng/zd/save_register', { list: list })
                .subscribe(x => {
                    if (x.ret === 0) {
                        this.xn.user.navigateBack();
                    }
                });
        } else {
            this.xn.user.navigateBack();
        }




    }

    /**
     *  判断数据类型
     * @param paramValue
     */
    public judgeDataType(paramValue: any): boolean {
        if (typeof Array.isArray === 'function') {
            return Array.isArray(paramValue);
        } else {
            return Object.prototype.toString.call(paramValue) === '[object Array]';
        }
    }

    /**
     * 点击完成跳转到列表页面
     */
    // public onFinish() {
    //     this.xn.router.navigate(['machine-account/zhongdeng-list']);
    // }

    // 判断是否填完人工登记所需要的值
    public judgeValue() {
        if (this.registerType !== 0 && this.registerDays !== 0 && this.registerNum.length !== 0 &&
            this.modifiedCode.length !== 0 && (this.rfiles && this.rfiles.length !== 0) &&
            this.desc.length !== 0 && this.amountTotal.length !== 0) {
            this.files.every(file => {
                if (file['file']) {
                    document.getElementsByClassName('handRe')[0].removeAttribute('disabled');
                    return true;
                } else {
                    document.getElementsByClassName('handRe')[0].setAttribute('disabled', 'disabled');
                }
            });

        } else {
            document.getElementsByClassName('handRe')[0].setAttribute('disabled', 'disabled');
        }
    }

    /**
     *  查看文件信息
     * @param paramFile
     */
    public viewFiles(paramFile) {
        let array = [];
        if (paramFile !== '' && typeof paramFile === 'string') {
            // 如果是json转为js
            let param = JSON.parse(paramFile);
            // 转换后验证是否为对象，如果是放进数组里
            if (!Array.isArray(param)) {
                array.push(param);
            } else {
                array = param;
            }
        } else {
            array.push(paramFile);
        }
        console.log(array);
        XnModalUtils.openInViewContainer(this.xn, this.vcr, MfilesViewModalComponent, array).subscribe();
    }
}
