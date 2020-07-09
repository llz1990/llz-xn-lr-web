/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：SupplierUploadInformationFlow
 * @summary：上传付确人工匹配
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 wangqing          增加功能1         2019-09-20
 * **********************************************************************
 */
import 'rxjs/add/observable/of';
import { XnService } from '../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import { LoadingService } from '../../../services/loading.service';
import { IFlowCustom } from './flow-custom';
import * as lodashall from 'lodash';

export class DragonPersonMatchVerify implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }
    afterSubmitandGettip(svrConfig: any) {
        if (svrConfig.procedure.procedureId === '@begin') {
            this.xn.msgBox.open(false, '提交成功！下一步请财务复核人在【首页 - 待办任务】中完成【复核】的待办任务。');
        } else if (svrConfig.procedure.procedureId === 'review' ) {
            this.xn.msgBox.open(false, '提交成功！');
        }
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId === '@begin') {
            let alert = '';
            let mainlist = JSON.parse(formValue.personList);
            let isOk = lodashall.some(mainlist, ['flag', 0]); // 判断文件是否存在
            let headquarters = svrConfig.checkers.filter(x => x.checkerId ==='headquarters');
            if (headquarters[0].value === '深圳市龙光控股有限公司') {
                alert = '此交易列表缺少《付款确认书（总部致保理商）》文件';
            }else if(headquarters[0].value === '万科企业股份有限公司'){
                alert = '此交易列表缺少《付款确认书》文件';
            }else if(headquarters[0].value === '雅居乐集团控股有限公司'){
                alert = '此交易列表缺少《付款确认书（总部致保理商）》文件';
            }
            if (isOk) {
                this.xn.msgBox.open(false, alert);
                return Observable.of({ action: 'stop' });
            } else {
                return Observable.of(null);
            }
        } else {
            return Observable.of(null);

        }
    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '人工匹配'
        };
    }
}
