import { Component, OnInit, Input, AfterViewChecked, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { SelectOptions } from '../../../../config/select-options';
import { XnService } from '../../../../services/xn.service';
import { PublicCommunicateService } from '../../../../services/public-communicate.service';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { XnModalUtils } from '../../../../common/xn-modal-utils';
import { InvoiceDataViewModalComponent } from '../../share/modal/invoice-data-view-modal.component';
import { isNullOrUndefined } from 'util';
import { MfilesViewModalComponent } from '../../share/modal/mfiles-view-modal.component';
import { reject } from 'q';
import { LoadingPercentService } from '../../../../services/loading-percent.service';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { SingleSearchListModalComponent } from '../../../dragon/share/modal/single-searchList-modal.component';
declare var $: any;
import * as _ from 'lodash';
/**
 *  中登流程check项
 */
@Component({
    selector: 'zhongdeng-info',
    templateUrl: './zhongdeng.component.html',
    styles: [`
        .btn {
            width: 100px;
            margin-right: 20px;
        }
        .desc{
            word-wrap: break-word;
            min-height: 100px;
            max-height: 200px;
            overflow-y: scroll;
        }
    `]
})

export class ZhongdengComponent implements OnInit, AfterViewChecked {
    // 登记业务类型
    public type: any = SelectOptions.get('registerType');
    // 登记期限
    public days: any = SelectOptions.get('registerDays');
    public registerType: number = 0;
    public registerDays: number = 0;
    public show = [];
    public manual = [];
    public isFinish = [];
    public isJudge = [];

    @Input() row: any;
    public ctrl1: AbstractControl;

    public infos: any;
    public handRegister: {};
    public registerNum: string = '';
    public modifiedCode: string = '';
    public registerFile = [];
    public memo: string;
    public files = [];
    public flags = []; // 主题一致性
    public debtUnits = []; // 收款单位
    public alert = [];
    // 处理文件传输需要的参数
    public obj: any;
    public afiles: any;
    public rfiles: any[] = [];
    public checkId: string;
    public assetFileList = [];
    public asset = {};
    public isEmpty: boolean = true;
    public index: number = -1;
    public amountTotals = [];
    public contractIdStrs = [];
    public descs = [];
    public invParam = [];

    public companyType: any[] = SelectOptions.get('zhongdengCompanyType');
    public companyTypesValue = []; //
    public showAlert: string = '请求正在进行中，是否跳转到台账列表';
    public factoringOrgNameList = [];


    form1: FormGroup;
    form2: FormGroup;
    public formModule: string = 'dragon-input';
    public checker1 = [
        {
            title: '登记证明文件',
            checkerId: 'registerFile',
            type: 'dragonMfile',
            required: 1,
            checked: false,
            options: { 'fileext': 'jpg, jpeg, png, pdf', "picSize": "500" }
        }
    ]
    public options = { 'fileext': 'pdf' };

    constructor(private xn: XnService,
        private vcr: ViewContainerRef,
        private cdr: ChangeDetectorRef,
        private loading: LoadingPercentService,
        private publicCommunicateService: PublicCommunicateService) {
    }

    ngOnInit() {
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

        this.infos = this.row;
        for (let i = 0; i < this.infos.length; i++) {
            this.show[i] = true;
            this.manual[i] = false;
            this.isFinish[i] = false;
            this.isJudge[i] = false;
            let amountTotal1 = '' + this.infos[i].amountTotal;
            this.amountTotals.push(amountTotal1);
            let contractIdStr1 = this.infos[i].contractIdStr;
            this.contractIdStrs.push(contractIdStr1);
            let desc1 = this.infos[i].desc;
            this.descs.push(desc1);
        }
        // 若收款单位相同，上传文件相同的初始设置
        for (let info of this.infos) {
            for (let i = 0; i < info.list.length; i++) {
                this.flags[i] = info.list[i].flag;
                this.debtUnits[i] = info.list[i].debtUnit;
                this.factoringOrgNameList[i] = info.list[i].factoringOrgName;

                this.companyTypesValue[i] = info.list[i].companyType;
                this.files[i] = {
                    mainFlowId: ''
                };
                this.files[i]['mainFlowId'] = info.list[i].mainFlowId;
                this.alert[i] = '';
            }
        }
    }

    ngAfterViewChecked() {
        if (this.index !== -1 && this.isFinish[this.index] && !this.isJudge[this.index]) {
            this.judgeValue(this.index);
        }
    }

    private buildChecker(stepRows) {
        for (const row of stepRows) {
            XnFormUtils.convertChecker(row);
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

    public viewMore(param) {
        XnModalUtils.openInViewContainer(this.xn, this.vcr, InvoiceDataViewModalComponent, param).subscribe(() => {
        });
    }
    getCompanytype(e, i: number) {
        this.companyTypesValue[i] = Number(e.target.value);
        for (let j = 0; j < this.debtUnits.length; j++) {
            if ((this.debtUnits[j] === this.debtUnits[i]) && (j !== i)) {
                this.companyTypesValue[j] = this.companyTypesValue[i];
            }
        }
    }
    // 登记业务类型查询
    public changeType(val, i) {
        this.registerType = Number(val);
        this.infos[i].registerType = this.registerType;
        // this.judgeValue(i);
    }

    // 登记期限查询
    public changeDays(val, i) {
        this.registerDays = Number(val);
        this.infos[i].registerDays = this.registerDays;
        // this.judgeValue(i);
    }

    public isNotShow(i) {
        this.show[i] = false;
    }

    public isShow(i) {
        this.show[i] = true;
    }

    public manualRegister(i) {
        this.index = i;
        this.manual[i] = true;
        document.getElementsByClassName('registerNum')[i].removeAttribute('disabled');
        document.getElementsByClassName('modifiedCode')[i].removeAttribute('disabled');
        this.isFinish[i] = true;
    }

    public manualRegisterFinish(idx) {
        this.buildRegisterFile(idx);

        this.infos[idx].modifiedCode = this.modifiedCode;
        this.infos[idx].registerNum = this.registerNum;
        this.infos[idx].memo = this.memo ? this.memo : '';
        this.assetFileList.map((asset, index) => {
            asset['companyType'] = this.companyTypesValue[index];
        });
        this.handRegister = {
            registerId: this.infos[idx].registerId,
            registerType: this.registerType,
            registerDays: this.registerDays,
            contractIdStr: this.contractIdStrs[idx],
            amountTotal: parseFloat(this.amountTotals[idx]),
            desc: this.descs[idx],
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
                    this.isJudge[idx] = true;
                    this.infos[idx].contractIdStr = this.contractIdStrs[idx];
                    this.infos[idx].amountTotal = this.amountTotals[idx];
                    this.infos[idx].desc = this.descs[idx];
                    this.infos[idx].registerFile = JSON.stringify(this.registerFile);
                    this.manual[idx] = false;
                    this.infos.status = 3;
                    // 人工登记完成，人工登记、取消登记按钮不可用
                    this.registerFinish(idx);
                    this.cdr.markForCheck();
                    this.xn.msgBox.open(true, "中登登记序号" + parseInt(idx + 1) + "已完成登记,是否跳转到台账列表", () => {
                        this.xn.router.navigate([`/machine-account`]);
                    });
                }
            });
    }

    systemRegister(paramIndex) {
        this.xn.msgBox.open(true, this.showAlert, () => {
            this.xn.router.navigate([`/machine-account`]);
        });
        let infos = [];
        this.infos[paramIndex].list.forEach((x, index) => {
            infos.push({ 'mainFlowId': x.mainFlowId, companyType: this.companyTypesValue[index] });

        });
        this.infos['modifiedCode'] = this.modifiedCode;
        this.infos['registerNum'] = this.registerNum;

        this.handRegister = {
            registerId: this.infos[paramIndex].registerId,
            registerType: this.registerType,
            registerDays: this.registerDays,
            assetFileList: infos
        };
        //this.xn.loading.open();
        this.xn.avenger.post2('/sub_system/zd/system_register', this.handRegister).subscribe(x => {
            //this.xn.loading.close();
            if (x.ret === 0) {
                $('.xn-msgbox-msg span').text('已完成系统中等登记，是否跳转到台账列表');
                this.modifiedCode = x.data['modifiedCode'];
                this.registerNum = x.data['registerNum'];
                this.infos.status = 3;
                this.infos[paramIndex].contractIdStr = this.contractIdStrs[paramIndex];
                this.infos[paramIndex].amountTotal = this.amountTotals[paramIndex];
                this.infos[paramIndex].desc = this.descs[paramIndex];
                this.manual[paramIndex] = false;
                // this.infos[paramIndex].status = 3;
                this.infos[paramIndex].registerFile = x.data['registerFile'];
                for (let i = 0; i < x.data.assetList.length; i++) {
                    this.files[i] = {
                        mainFlowId: ''
                    };
                    this.files[i]['mainFlowId'] = x.data.assetList[i].mainFlowId;
                    this.alert[i] = '';
                    this.files[i].file = x.data.assetList[i].assetFile;
                }
                this.cdr.markForCheck();
            } else {
                $('.xn-msgbox-msg span').text(`${x.msg}，是否跳转到台账列表`);
            }
        });
        //this.maskshow = false;
    }
    public onBeforeUpload(e, i) {
        if (this.files[i]['file']) {
            e.preventDefault();
            this.xn.msgBox.open(false, '请先删除已上传的文件，才能上传新文件');
            return;
        }
    }

    public onUploadFile(e, id, i, index) {
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
                    } else this.flags[i] = 2;
                    this.pushAsset(i, id, index);
                    this.showAsset(i, index);
                    this.loading.close();
                }
            }
        });
    }

    /**
     * 上传的文件将其放入到assetFileList
     * @param {*} i
     * @param {*} id
     */
    public pushAsset(i, id, index) {
        let asset1 = {};
        let array = [];
        array.push(this.files[i]['file']);
        asset1['mainFlowId'] = id;
        asset1['assetFile'] = JSON.stringify(array);
        asset1['flag'] = this.flags[i];
        asset1['companyType'] = this.companyTypesValue[i];
        this.assetFileList.push(asset1);
        this.infos[index].assetFileList = this.assetFileList;
    }

    /**
     * 如果有相同收款单位那么查询证明文件相同，也同步显示
     * @param {*} i
     */
    public showAsset(i, index) {
        for (let j = 0; j < this.debtUnits.length; j++) {
            if ((this.debtUnits[j] === this.debtUnits[i]) && (j !== i)) {
                this.flags[j] = this.flags[i];
                this.files[j]['file'] = this.files[i]['file'];
                this.pushAsset(j, this.files[j]['mainFlowId'], index);
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

    public buildRegisterFile(idx) {
        this.registerFile = [];
        for (let i = 0; i < this.rfiles.length; i++) {
            let file = {};
            file['fileId'] = this.rfiles[i].fileId;
            file['fileName'] = this.rfiles[i].fileName;
            file['filePath'] = this.rfiles[i].filePath;
            this.registerFile.push(file);
        }
        this.infos[idx].registerFile = this.registerFile.length > 0 ? JSON.stringify(this.registerFile) : '';
    }

    public cancelRegister(i) {
        this.xn.dragon
            .post('/zhongdeng/zd/cancelRegister', { registerId: this.infos[i].registerId })
            .subscribe(x => {
                if (x.ret === 0) {
                    console.log('取消登记完成');
                    this.manual[i] = false;
                    // 取消登记成功后如果中登序号只有1那么返回台账页面，如果有个多个中登序号则删除取消的模块
                    if (i === 0) {
                        this.xn.router.navigate([`/machine-account`]);
                    } else {
                        this.infos.splice(i, 1);
                    }
                }
            });
    }

    public registerFinish(i) {
        document.getElementsByClassName('handRe')[i].setAttribute('disabled', 'disabled');
        document.getElementsByClassName('cancelRe')[i].setAttribute('disabled', 'disabled');
    }

    // 判断是否填完人工登记所需要的值
    public judgeValue(i) {
        if (this.registerType !== 0 && this.registerDays !== 0 && this.registerNum.length !== 0 &&
            this.modifiedCode.length !== 0 && (this.rfiles && this.rfiles.length !== 0) &&
            this.amountTotals[i].length !== 0 && this.descs[i].length !== 0) {
            this.files.every(file => {
                if (file['file']) {
                    document.getElementsByClassName('handRe')[i].removeAttribute('disabled');
                    return true;
                } else {
                    document.getElementsByClassName('handRe')[i].setAttribute('disabled', 'disabled');
                }
            });
        } else {
            document.getElementsByClassName('handRe')[i].setAttribute('disabled', 'disabled');
        }
    }

    /**
     *  查看文件
     * @param paramFile
     */
    public onView(paramFile: { fileId: string, fileName: string }) {
        let paramFiles = [];
        const fileType: string = paramFile.fileName.substring(paramFile.fileName.lastIndexOf('.') + 1);
        paramFiles.push(paramFile);
        XnModalUtils.openInViewContainer(this.xn, this.vcr, MfilesViewModalComponent, paramFiles).subscribe(() => {
        });
    }
    returnBack() {
        let list = [];
        this.infos.forEach((x, idx) => {
            this.buildRegisterFile(idx);
            x.modifiedCode = this.modifiedCode;
            x.registerNum = this.registerNum;
            x.memo = this.memo ? this.memo : '';
            this.handRegister = {
                registerId: x.registerId,
                registerType: x.registerType,
                registerDays: x.registerDays,
                contractIdStr: this.contractIdStrs[idx],
                amountTotal: parseFloat(this.amountTotals[idx]),
                desc: this.descs[idx],
                registerNum: x.registerNum,
                modifiedCode: x.modifiedCode,
                registerFile: x.registerFile ? x.registerFile : '',
                memo: this.memo ? this.memo : '',
                assetFileList: x.assetFileList
            };
            list.push(this.handRegister);
        });
        console.info('list==>', list);
        this.xn.dragon
            .post('/zhongdeng/zd/save_register', { list: list })
            .subscribe(x => {
                if (x.ret === 0) {
                    this.xn.user.navigateBack();
                }
            });



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
