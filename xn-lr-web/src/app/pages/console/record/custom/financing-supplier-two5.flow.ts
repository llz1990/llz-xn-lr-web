import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import {Contract} from '../../../../config/contract';

export class FinancingSupplierTwo5Flow implements IFlowCustom {

    constructor(private xn: XnService) {
    }

    preShow(): Observable<any> {
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

        let contracts = JSON.parse(svrConfig.actions[0].contracts);
        const contractFiltersName: any[] = Contract.getNames();

        console.log('contracts: ', contracts);
        for (let i = 0; i < contractFiltersName.length; i++) {
            contracts = contracts.filter(v => v && v.label !== contractFiltersName[i]);
        }
        console.log('contractsAfter: ', contracts);

        let params: any = {
            flowId: 'financing_supplier_two5',
        };
        if (contracts.length === 1) {
            params.attachment2Id = contracts[0].id;
            params.attachment2Secret = contracts[0].secret;
        }

        console.log('params: ', params);
        return Observable.of({
            action: 'modal',
            modal: FinancingFactoringModalComponent,
            params: params
        });
    }

    getTitleConfig(): any {
        return null;
    }

}
