import {IFlowCustom} from '../flow.custom';
import {XnService} from '../../../../services/xn.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {FinancingFactoringModalComponent} from '../../../../public/modal/financing-factoring-modal.component';

export class FinancingSupplier1Flow implements IFlowCustom {

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

        const contracts = JSON.parse(svrConfig.actions[0].contracts);
        let params: any = {
            flowId: 'financing_supplier1',
        };
        if (contracts.length === 1) {
            params.attachment1Id = contracts[0].id;
            params.attachment1Secret = contracts[0].secret;
        } else if (contracts.length === 2) {
            params.mainId = contracts[0].id;
            params.mainSecret = contracts[0].secret;
            params.mainDone = contracts[0].done;
            params.attachment1Id = contracts[1].id;
            params.attachment1Secret = contracts[1].secret;
        } else if (contracts.length === 3) {
            params.mainId = contracts[0].id;
            params.mainSecret = contracts[0].secret;
            params.mainDone = contracts[0].done;
            params.attachment1Id = contracts[1].id;
            params.attachment1Secret = contracts[1].secret;
            params.attachment10Id = contracts[2].id;
            params.attachment10Secret = contracts[2].secret;
        }

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
