import {Observable} from 'rxjs';
import {IFlowCustom} from '../../../../../../src/app/pages/console/record/flow.custom';
import {XnUtils} from '../../../../../../src/app/common/xn-utils';
import {XnService} from '../../../../../../src/app/services/xn.service';
import {ModalSize} from '../../../../../../src/app/common/modal/components/modal';

export class CoreFinancingFlow implements IFlowCustom {

    constructor(private xn: XnService) {
    }

    preShow(): Observable<any> {
        return Observable.of(null);
    }

    postShow(svrConfig: any): Observable<any> {
        return Observable.of(null);
    }

    private getDataByCheckerId(data, checkerId) {
        for (let checker of data.checkers) {
            if (checker.checkerId === checkerId) {
                return checker.data;
            }
        }
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        // console.log('preSubmit', svrConfig);
        const beginData = svrConfig.actions[0];

        if (svrConfig.procedure.procedureId !== 'operate') {
            return Observable.of(null);
        }

        let params = {
            supplierAppId: JSON.parse(this.getDataByCheckerId(beginData, 'supplier')).value,
            factoringAppId: JSON.parse(this.getDataByCheckerId(beginData, 'other')).value
        };

        return this.xn.api.post('/record/record?method=query_relation', params)
            .map(json => {
                // console.log(json, 'pre_core_financing');
                return {
                    action: 'tips',
                    tipsType: 'yesno',
                    tipsTitle: '请确认',
                    tipsData: this.buildContract(json.data, svrConfig, formValue),
                    tipsSize: ModalSize.Large
                };
            });
    }

    private buildContract(json: any, svrConfig: any, formValue: any): string {
        // console.log('buildContract', json);

        let nowTimeStamp = new Date().getTime();
        let date = XnUtils.formatDateZh(nowTimeStamp);
        const contract1NO = 'QRH-' + svrConfig.record.recordId;

        const beginData = svrConfig.actions[0];
        const contract3NO = 'ZRTZ-' + this.getDataByCheckerId(beginData, 'recordId');
        const c02 = this.getDataByCheckerId(beginData, 'c02');
        const c03 = this.getDataByCheckerId(beginData, 'c03');
        const c04 = this.getDataByCheckerId(beginData, 'c04');
        const c05 = this.getDataByCheckerId(beginData, 'c05');
        const c06 = this.getDataByCheckerId(beginData, 'c06');

        // 商业保理申请书
        let contract1 = `<h3 class="text-center">应收账款转让通知书之买方确认函</h3>
<p class="text-right">编号：【${contract1NO}】</p>
<p>致：<u>${json.supplier.orgName}</u></p>
<p class="xn-text-indent">本公司已收到编号为<u>${contract3NO}</u>的《应收账款转让通知书》，知晓下表所列应收账款债权已转让予${json.factoring.orgName}（简称“保理商”）的事实。本公司承诺将予以支付到前述《应收账款转让通知书》中保理商指定的银行账户：</p>
<p class="xn-text-indent"><strong>账户名：${json.factoring.orgName}</strong></p>
<p class="xn-text-indent"><strong>账号：${json.factoring.bankNo}</strong></p>
<p class="xn-text-indent"><strong>开户行：${json.factoring.bank}</strong></p>
<p class="xn-text-indent">本公司确认，所转让的应收账款债权主要信息如下：</p>
<ul class="xn-ul">
    <li>供应商名称：${json.supplier.orgName}</li>
    <li>债务人名称：${json.enterprise.orgName}</li>
    <li>基础交易合同名称：${c02}</li>
    <li>基础交易合同编号：${c03}</li>
    <li>发票号：${c04}</li>
    <li>发票金额：${c05}</li>
    <li>发票开具日：${c06}</li>
</ul>
<p class="xn-text-indent">本公司在此确认，上述表格所列的应收账款债权真实、合法、有效，且债权人已完全适当履行了该等应收账款债权对应的基础交易合同项下的义务，我公司对该等应收账款负有付款义务，同意在账款到期日将相应应付账款付至保理商或保理商指定的上述收款账户，且我公司就该等应收账款不存在商业纠纷抗辩理由，不享有任何商业纠纷抗辩权，不以任何理由抗辩。</p>
<p class="xn-text-indent">本回执一式叁份，我司、供应商、保理商各执壹份。</p>
<p class="text-right">债务人：${json.enterprise.orgName}</p>
<p class="text-right">${date}</p>
`;
        svrConfig.contracts = [
            {
                label: '应收账款转让通知书之买方确认函',
                value: contract1
            }
        ];
        return contract1;
    }

    getTitleConfig(): any {
        return null;
    }

    postGetSvrConfig(svrConfig: any): void {
    }
}
