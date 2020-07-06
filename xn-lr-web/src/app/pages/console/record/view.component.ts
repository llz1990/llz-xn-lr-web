import {Component, OnInit} from '@angular/core';
import {Params, ActivatedRoute} from '@angular/router';
import {XnService} from '../../../services/xn.service';
import {XnUtils} from '../../../common/xn-utils';
import XnFlowUtils from '../../../common/xn-flow-utils';
import {LoadingService} from '../../../services/loading.service';
import {HwModeService} from '../../../services/hw-mode.service';

// import {configData} from '../../../config/svrConfig'; // 引入测试数据

@Component({
    templateUrl: './view.component.html',
    styles: [
            `.box-title {
            font-size: 14px;
        }`,
            `.xn-panel-sm {
            margin-bottom: 10px;
        }`,
            `.xn-panel-sm .panel-heading {
            padding: 5px 15px;
        }`,
            `.xn-panel-sm .panel-heading .panel-title {
            font-size: 14px
        }`,
            `.tipsDataRow {
            max-height: 450px;
            overflow: auto
        }`,
            `.app-flow-process {
            border: 1px solid #ddd;
            padding: 4px;
            margin-bottom: 10px;
            border-radius: 3px;
            background-color: #fff;
        }`,
    ]
})
export class ViewComponent implements OnInit {

    private recordId: string;

    svrConfig: any;

    pageTitle = '查看流程记录';
    pageDesc = '';

    baseInfo: any[] = [];
    contracts: any[] = [];

    flowProcess = {
        show: false,
        proxy: 0,
        steped: 0
    };
    newSvrConfig: any;

    constructor(private xn: XnService,
                private route: ActivatedRoute,
                private loading: LoadingService,
                public hwModeService: HwModeService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.recordId = params['id'];
            this.xn.api.post('/record/record?method=view', {
                recordId: this.recordId
            })
                .subscribe(json => {
                    json.data.actions = json.data.actions.filter(action => action.operatorId !== '' && action.operatorName !== '');
                    this.svrConfig = json.data;
                    this.flowProcess = XnFlowUtils.calcFlowProcess(this.svrConfig.flow.flowId);
                    this.svrConfig = XnFlowUtils.handleSvrConfig(this.svrConfig);

                    // 拷贝对象
                    this.newSvrConfig = JSON.parse(JSON.stringify(this.svrConfig));
                    this.buildRows();
                });
        });
    }

    collapse(item) {
        const items = this.newSvrConfig.actions;
        if (!item['collapse'] || item['collapse'] === false) {
            items.forEach(x => x['collapse'] = false); // 所有都至false
            item['collapse'] = true;
        } else if (item['collapse'] = true) {
            item['collapse'] = false;
        }
    }

    // 把svrConfig.checkers转换为rows对象，方便模板输出
    private buildRows(): void {
        this.baseInfo.push({
            type: 'text',
            title: '流程记录ID',
            data: this.svrConfig.record.recordId
        });

        if (!XnUtils.isEmpty(this.svrConfig.record.bcOrderId)) {
            this.baseInfo.push({
                type: 'text',
                title: '区块链账本ID',
                data: this.svrConfig.record.bcLedgerId
            });
            this.baseInfo.push({
                type: 'text',
                title: '区块链记录ID',
                data: this.svrConfig.record.bcOrderId
            });
        }

        if (!XnUtils.isEmpty(this.svrConfig.record.contracts)) {
            this.contracts = JSON.parse(this.svrConfig.record.contracts);
            // console.log(this.contracts, 'contracts');
        } else {
            this.contracts = [];
        }
    }

    onCancel() {
        this.xn.user.navigateBack();
    }

    panelCssClass(action) {
        if (action.operator === 1) {
            return 'panel panel-info xn-panel-sm';
        }
        else if (action.operator === 2 || action.operator === 3) {
            return 'panel panel-warning xn-panel-sm';
        }
        else {
            console.log('@@ else operator', action.operator);
            return '';
        }
    }

    onSubmit() {
    }

    download() {
        console.log('this.svrConfig: ', this.svrConfig);
        let files: any = [];
        // let fileArr: any = [];
        let temp: any = [];

        let procedureIdArr = [];
        let proceIdArr = [];

        // 测试数据
        // this.svrConfig = configData.data;
        // console.log("this.svrConfigAfter: ", this.svrConfig);

        for (let action of this.svrConfig.actions) {
            if (action.procedureId !== '') {
                // 找出所有的流程ID
                if (procedureIdArr.indexOf(action.procedureId) === -1) {
                    procedureIdArr.push(action.procedureId);
                }
            }
        }


        for (let proceId of procedureIdArr) {
            let arr: any = [];
            for (let action of this.svrConfig.actions) {
                if (action.procedureId === proceId) {
                    // 构建一个数组，选出最后一个流程id
                    arr.push(action);
                }
            }
            files = this.selectFiles(arr[arr.length - 1], files);
        }
        if (files.length) {
            console.log("files list",files);
            // 拼接文件名
            let appId = this.xn.user.appId;
            let orgName = this.xn.user.orgName;
            let time = new Date().getTime();
            let filename = appId + '-' + orgName + '-' + time + '.zip';

            XnUtils.checkLoading(this);
            this.xn.api.download('/file/down_file', {
                files: files
            }).subscribe((v: any) => {
                this.loading.close();
                this.xn.api.save(v._body, filename);
            });
        } else {
            this.xn.msgBox.open(false, '无可下载项');
        }
    }

    selectFiles(action, fileArr) {
        let newFileArrId: any = [];

        for (let checker of action.checkers) {
            if (checker.data) {
                if (checker.type === 'file') {
                    fileArr.push(checker && checker.data && JSON.parse(checker.data));
                }
                if (checker.type === 'mfile' || checker.type === 'honour' || checker.type === 'invoice-vanke') {
                    for (let file of JSON.parse(checker.data)) {
                        fileArr.push(file);
                    }
                }
                if (checker.type === 'invoice') {
                    for (let file of JSON.parse(checker.data)) {
                        if (file.fileId) {
                            fileArr.push(file);
                        }
                    }
                }
                if (checker.type === 'contract') {
                    for (let row of JSON.parse(checker.data)) {
                        for (let file of row.files) {
                            fileArr.push(file);
                        }
                    }
                }
                if (checker.type === 'contract-office' || checker.type === 'contract-vanke') {
                    for (let row of JSON.parse(checker.data)) {
                        for (let file of row.files.img) {
                            fileArr.push(file);
                        }
                    }
                }
            }
        }

        // 添加合同
        if (action.contracts !== '') {
            for (let contract of JSON.parse(action.contracts)) {
                if (contract.hide !== true) {
                    fileArr.push(contract);
                }
            }
        }

        // 数组去重复
        fileArr = XnUtils.uniqueBoth(fileArr);

        return fileArr;
    }
}
