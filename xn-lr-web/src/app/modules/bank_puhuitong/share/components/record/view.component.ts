/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：view.component.component.ts
 * @summary：查看流程
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          增加功能1         2019-08-28
 * **********************************************************************
 */

import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { XnService } from '../../../../../services/xn.service';
import { LoadingService } from '../../../../../services/loading.service';
import { HwModeService } from '../../../../../services/hw-mode.service';
import XnFlowUtils from '../../../../../common/xn-flow-utils';
import { XnUtils } from '../../../../../common/xn-utils';
import { FormGroup } from '@angular/forms';


@Component({
    templateUrl: './view.component.html',
    styles: [
        `.box-title {
            font-size: 14px;
        }

        .xn-panel-sm {
            margin-bottom: 10px;
        }

        .xn-panel-sm .panel-heading {
            padding: 5px 15px;
        }

        .xn-panel-sm .panel-heading .panel-title {
            font-size: 14px
        }

        .tipsDataRow {
            max-height: 450px;
            overflow: auto
        }

        .app-flow-process {
            border: 1px solid #ddd;
            padding: 4px;
            margin-bottom: 10px;
            border-radius: 3px;
            background-color: #fff;
        }`,
    ]
})
export class BankViewComponent implements OnInit {

    private recordId: string;

    svrConfig: any;
    mainForm: FormGroup;

    pageTitle = '查看流程记录';
    pageDesc = '';

    baseInfo: any[] = [];
    contracts: any[] = [];
    newSvrConfig: any;
    flowId: string = '';
    public mainFlowId: string = this.svrConfig && this.svrConfig.record && this.svrConfig.record.mainFlowId || '';
    isshowProgress: boolean; // 是否显示导航进度条

    constructor(private xn: XnService,
        private route: ActivatedRoute,
        private loading: LoadingService,
        public hwModeService: HwModeService) {
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.recordId = params['id'];
            this.xn.api.avenger.post('/record/record/view', {
                recordId: this.recordId
            })
                .subscribe(json => {
                    json.data.actions = json.data.actions.filter(action => action.operatorId !== '' && action.operatorName !== '');
                    this.svrConfig = json.data;
                    this.svrConfig = XnFlowUtils.handleSvrConfig(this.svrConfig);
                    this.mainFlowId = this.svrConfig.record.mainFlowId;
                    this.flowId = this.svrConfig.flow.flowId;
                    // 拷贝对象
                    this.newSvrConfig = JSON.parse(JSON.stringify(this.svrConfig));
                    this.buildRows();
                    this.isshowProgress = this.flowId.startsWith('sub');
                });
        });


    }

    /**
     *  合并面板
     * @param paramItem
     */
    public collapse(paramItem) {
        const items = this.newSvrConfig.actions;
        if (!paramItem['collapse'] || paramItem['collapse'] === false) {
            items.forEach(x => x['collapse'] = false); // 所有都至false
            paramItem['collapse'] = true;
        } else if (paramItem['collapse'] === true) {
            paramItem['collapse'] = false;
        }
    }


    public onCancel() {
        this.xn.user.navigateBack();
    }

    public panelCssClass(action) {
        if (action.operator === 1) {
            return 'panel panel-info xn-panel-sm';
        } else if (action.operator === 2 || action.operator === 3) {
            return 'panel panel-warning xn-panel-sm';
        } else {
            console.log('@@ else operator', action.operator);
            return '';
        }
    }

    /**
     *  下载附件
     */
    public download() {
        let files: any = [];
        let procedureIdArr = [];
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
            // 拼接文件名
            let appId = this.xn.user.appId;
            let orgName = this.xn.user.orgName;
            let time = new Date().getTime();
            let filename = appId + '-' + orgName + '-' + time + '.zip';

            XnUtils.checkLoading(this);
            this.xn.api.avenger.download(
                files,
                null,
            ).subscribe((v: any) => {
                this.loading.close();
                this.xn.api.avenger.save(v._body, filename);
            });
        } else {
            this.xn.msgBox.open(false, '无可下载项');
        }
    }

    private selectFiles(action, fileArr) {
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

    /**
     * 把svrConfig.checkers转换为rows对象，方便模板输出
     */
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
        } else {
            this.contracts = [];
        }
    }
}
