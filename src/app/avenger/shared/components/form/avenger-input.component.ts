/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：avenger-input.component.ts
 * @summary：输入组件
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          增加功能1         2019-04-22
 * **********************************************************************
 */

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { XnService } from '../../../../services/xn.service';
import { JsonTransForm } from '../../../../public/pipe/xn-json.pipe';

@Component({
    selector: 'xn-avenger-input-component',
    templateUrl: './avenger-input.component.html'
})

export class AvengerInputComponent implements OnInit {
    // 当前行信息
    @Input() row: any;
    // 表单组
    @Input() form: FormGroup;
    // 主流程信息
    @Input() svrConfig: any;
    // 组件tips
    public memo: any;
    mainFlowId: string = '';

    isShowSwitchForm = false;

    constructor() {
    }

    ngOnInit() {
        const excludeArr = ['textarea', 'quantum', 'quantum1', 'text', 'assets', 'cash', 'profit', 'upload-table'];
        this.isShowSwitchForm = excludeArr.findIndex(x => x === this.row['type']) >= 0;

        this.memo = this.initMemo(this.row.options);
    }


    /**
     * 格式化输入组件提示信息
     * @param paramOptionConfig
     */
    private initMemo(paramOptionConfig) {
        if (!paramOptionConfig) {
            return '';
        } else {
            return JsonTransForm(paramOptionConfig).memo;

        }
    }
}
