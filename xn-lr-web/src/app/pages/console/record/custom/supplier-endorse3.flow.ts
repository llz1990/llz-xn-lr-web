import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
// import {Observable} from 'rxjs';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';
import {Contract} from '../../../../config/contract';
import {Observable} from '../../../../../../node_modules/rxjs';

export class SupplierEndorse3Flow implements IFlowCustom {

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

        let params: any = {
            flowId: 'supplier_endorse3',
        };

        if (contracts.length === 1) {
            params.attachment2Id = contracts[0].id;
            params.attachment2Secret = contracts[0].secret;
        } else if (contracts.length === 2) {
            params.attachment2Id = contracts[0].id;
            params.attachment2Secret = contracts[0].secret;
            params.attachment3Id = contracts[1].id;
            params.attachment3Secret = contracts[1].secret;
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
