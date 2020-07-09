import 'rxjs/add/observable/of';
import { XnService } from '../../../services/xn.service';
import { Observable } from 'rxjs/Observable';
import { IFlowCustom } from '../flow-custom';
import { LoadingService } from '../../../services/loading.service';
import XnFlowUtils from '../../../common/xn-flow-utils';
import { XnUtils } from '../../../common/xn-utils';
import { AvengerFinancingContractModalComponent } from '../../shared/components/modal/avenger-asign-contract.modal';

export class SubSupplierSign implements IFlowCustom {
    constructor(private xn: XnService, private loading: LoadingService) {
    }

    preShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    postGetSvrConfig(svrConfig: any): void {
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        if (svrConfig.procedure.procedureId !== 'review') {
            return Observable.of(null);
        }

        let beginInfo = svrConfig.actions;
        let bankInfo = beginInfo.filter(x =>
            x.procedureId === 'operate'
        );
        let compareInfo = JSON.parse(bankInfo[bankInfo.length - 1].checkers.filter(x => x.checkerId === 'debtCompare')[0].data);

        if (compareInfo.old.receiveOrg !== compareInfo.new.receiveOrg || compareInfo.old.receiveAccount !== compareInfo.new.receiveAccount) {
            const params: any = {
                flowId: svrConfig.flow.flowId,
                procedureId: svrConfig.procedure.procedureId,
                recordId: svrConfig.record && svrConfig.record.recordId || '',  // 重复同意时会有recordId，此时后台就不要新生成recordId了
                title: formValue.title,
                memo: formValue.memo,
                checkers: XnFlowUtils.buildSubmitCheckers(svrConfig.checkers, formValue)
            };

            XnUtils.checkLoading(this);
            return this.xn.avenger.post('/flow/preSubmit', params)
                .map(json => {
                    json.data.flowId = 'sub_financing_sign_520'; // 万科供应商签署合同
                    const contracts = json.data;
                    contracts.forEach(element => {
                        if (!element['config']) {
                            element['config'] = {
                                text: ''
                            };
                        }
                    });
                    contracts.forEach(x => {
                        if (x.label === '国内有追索权商业保理合同') {
                            x['config']['text'] = '乙方（保理商）数字签名';
                        } else if (x.label === '安心账户（应收账款资金）托管协议（三方）' || x.label === '委托开户通知书') {
                            x['config']['text'] = '乙方（电子签章、数字签名）';
                        } else if (x.label === '托管指令授权书') {
                            x['config']['text'] = '乙方（公章）';
                        } else if (x.label === '国内商业保理合同(三方协议)') {
                            x['config']['text'] = '丙方(电子签章、数字签名)';
                        } else {
                            x['config']['text'] = '（盖章）';
                        }
                    });
                    return {
                        action: 'modal',
                        modal: AvengerFinancingContractModalComponent,
                        params: contracts
                    };
                });
        } else {
            return Observable.of(null);
        }

    }

    getTitleConfig(): any {
        return {
            hideTitle: true,
            titleName: '流程标题',
            def: '供应商签署说明书'
        };
    }
}
