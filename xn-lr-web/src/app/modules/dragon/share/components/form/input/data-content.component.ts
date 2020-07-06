import { Component, ElementRef, Input, OnChanges, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DynamicForm } from '../../../../../../common/dynamic-form/dynamic.decorators';
import { XnInputOptions } from '../../../../../../public/form/xn-input.options';
import TableHeadConfig from '../../../../../../config/table-head-config';
import { XnService } from '../../../../../../services/xn.service';
import { PublicCommunicateService } from '../../../../../../services/public-communicate.service';
import { LocalStorageService } from '../../../../../../services/local-storage.service';
import { HwModeService } from '../../../../../../services/hw-mode.service';
import { XnFormUtils } from '../../../../../../common/xn-form-utils';
import { XnModalUtils } from '../../../../../../common/xn-modal-utils';
import { InvoiceDataViewModalComponent } from '../../../../../../public/modal/invoice-data-view-modal.component';
import { XnUtils } from '../../../../../../common/xn-utils';
import { isNullOrUndefined } from 'util';

/**
 *  保理预录入-应收账款保理计划表
 */
@Component({
    templateUrl: './data-content.component.html',
    styles: [`

        .table-display tr td {
            width: 200px;
            vertical-align: middle;
        }

        .height {
            overflow-x: hidden;
        }

        .table {
            table-layout: fixed;
            width: 3000px;
        }

        .table-height {
            max-height: 600px;
            overflow: scroll;
        }

        .head-height {
            position: relative;
            overflow: hidden;
        }

        .table-display {
            margin: 0;
        }

        .relative {
            position: relative
        }

        .red {
            color: #f20000
        }

        .table tbody tr td:nth-child(5) {
            word-wrap: break-word
        }
    `]
})
@DynamicForm({ type: 'data-content', formModule: 'dragon-input' })
export class DataContentComponent implements OnInit, OnChanges, OnDestroy {

    @Input() row: any;
    @Input() form: FormGroup;    // 获取的上传的excel文件内容
    public ctrl: AbstractControl;
    private xnOptions: XnInputOptions;
    // 表格匹配字段
    heads = TableHeadConfig.getConfig('龙光提单');
    // 应收账款保理计划表数据
    items: DebtOutputModel[] = [];
    alert = '';
    // 判断是否是excel格式
    isExcel = false;
    unfill = false;
    headLeft = 0;
    // 使用提单表格类型,默认''
    type = '';
    uploadCtr = true;

    constructor(private xn: XnService,
        private er: ElementRef,
        private publicCommunicateService: PublicCommunicateService,
        private localStorageService: LocalStorageService,
        private vcr: ViewContainerRef,
        public hwModeService: HwModeService) {
    }

    ngOnChanges() {
        this.publicCommunicateService.change.subscribe(type => {
            this.type = type; // 更改模板

            this.items = [];
            if (this.type === '') {
                this.alert = '请选择总部公司';
                this.uploadCtr = true;
                return;
            } else {
                this.alert = '';
                this.uploadCtr = false;
            }
        });
    }

    ngOnInit() {

        this.ctrl = this.form.get(this.row.name);
        // 暂存的总部公司
        this.type = this.localStorageService.caCheMap.get('headquarters') || '深圳市龙光控股有限公司';

        this.uploadCtr = this.type === '' || this.type === undefined;
        // 设置可上传的格式
        this.row.options = { excelext: 'xlsx,xls' };
        this.ctrl.statusChanges.subscribe(() => {
            this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
        });
        this.fromValue();
        this.xnOptions = new XnInputOptions(this.row, this.form, this.ctrl, this.er);
    }

    ngOnDestroy(): void {
        this.localStorageService.caCheMap.set('headquarters', null);
    }

    // 查看更多
    viewMore(item) {
        item = item.toString().split(',');
        XnModalUtils.openInViewContainer(
            this.xn,
            this.vcr,
            InvoiceDataViewModalComponent,
            item
        ).subscribe(() => {
        });
    }

    // 下载模板
    downloadTp() {
        const a = document.createElement('a');
        if (this.type === '') {
            this.xn.msgBox.open(false, '请先选择总部公司');
            return;
        }
        a.href = this.heads[this.type].excel_down_url;
        a.click();
    }

    // 滚动表头
    onScroll($event: Event) {
        this.headLeft = $event.srcElement.scrollLeft * -1;
        console.log(this.headLeft);
    }

    beforeUpload(e) {
    }

    // 上传excel
    uploadExcel(e) {
        if (this.uploadCtr) {
            this.alert = '请选择总部公司';
            this.uploadCtr = true;
            return;
        }
        if (e.target.files.length === 0) {
            return;
        }

        const err = this.validateExcelExt(e.target.files[0].name);
        if (!XnUtils.isEmpty(err)) {
            this.alert = err;
            $(e.target).val('');
            return;
        }

        const fd = new FormData();
        fd.append('checkerId', this.row.checkerId);
        fd.append('headquarters', this.type);
        fd.append('file_data', e.target.files[0], e.target.files[0].name);
        /**
         *  应收款保理计划表上传
         */
        this.xn.api.dragon.upload(this.heads[this.type].excel_up_url, fd).subscribe(json => {
            if (json.type === 'complete') {
                if (json.data.ret === 0) {
                    if (json.data.data.length > 0) {
                        this.items = json.data.data;
                    }
                    this.isExcel = true;

                    this.toValue();
                } else {
                    let msg = json.data.msg;
                    if (msg.indexOf(';') !== -1) {
                        let msgs = msg.split('; ');
                        for (let i=0; i<msgs.length-1; i++) {
                            msgs[i] += '\n';
                        }
                        this.xn.msgBox.open(false, msgs);
                    } else {
                        this.xn.msgBox.open(false, json.data.msg);
                    }
                }
                $(e.target).val('');
                this.ctrl.markAsDirty();
                this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
            }
        });
    }

    // 验证是否是excel
    private validateExcelExt(s: string): string {
        if (isNullOrUndefined(this.row.options)) {
            return '';
        }
        if ('excelext' in this.row.options) {
            const exts = this.row.options.excelext.replace(/,/g, '|').replace(/\s+/g, ''); // 删除所有空格
            if (s.match(new RegExp('\\.(' + exts + ')$', 'i'))) {
                return '';
            } else {
                return `只支持以下文件格式: ${this.row.options.excelext}`;
            }
        } else {
            return '';
        }
    }

    private fromValue() {
        this.items = XnUtils.parseObject(this.ctrl.value, []);
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

    // 上传完后取回值
    private toValue() {
        if (this.items.length === 0) {
            this.ctrl.setValue('');
        } else {
            this.ctrl.setValue(JSON.stringify(this.items));
        }

        this.ctrl.markAsTouched();
        this.alert = XnFormUtils.buildValidatorErrorString(this.ctrl);
    }

}

// 字段模型
export class DebtOutputModel {
    public num?: string; // 应付账款序号
    public projectCompany: string; // 申请付款单位
    public paymenNotice: string; // 付款通知
    public contractId?: string; // 合同号
    public invoiceNum?: string; // 发票号
    public invoiceAmount?: number; // 发票金额
    public receivable?: number; // 应付账款金额
    public debtUnit?: string; //  债权人
    public debtAccount?: string; // 收款单位账号
    public debtBank?: string; // 收款单位开户行
    public projectProvince: string; // 收款单位省份
    public debtUser?: string; // 债务人
    public debtUserMobile?: string; // 联系人手机号
    public debtOwner?: string; // 付款单位;
    public factoringBeginDate?: string; // 保理融资起起始日;
    public receivableAssignee?: string; // 应收账款受让方
    public assigneePrice?: number; // 受让价格
    public originalSingleEencoding?: string; // 核心企业付款确认书编号
    public confirmationIssuanceTime?: string; // 确认书出具日期
    public confirmationExpiryTime?: string; // 确认书到期日期
    public factoringUser?: string;	     // 保理商联系人
    public factoringUserMobile?: string; //  手机号
    public raPaybackAccount?: string; //  应收账款受让方回款账号
    public raPaybackAccountBankName?: string; //  应收账款受让方回款账号开户行
    public yearRatesUser?: string; //  年化保理使用费率
    public yearRatesService?: string; //  年化保理服务费率
    public monthRatesService?: string; //  月化平台服务费率
    public platformServiceMonths?: string; //  平台服务月数
    public factoringEndDate?: string; //  保理到期日
    public registered?: boolean; //  是否注册
    public payConfirmId?: string; // 付款确认书编号
    public extension?: any; // 补充信息
    public correct?: any; // 是否需要更正
}
