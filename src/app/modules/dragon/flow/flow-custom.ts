/**
 * 定义流程的个性化信息
 */
import { ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { XnService } from '../../../services/xn.service';
import { LoadingService } from '../../../services/loading.service';
import { PublicCommunicateService } from '../../../services/public-communicate.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { DragonSupplierSign } from './dragon_supplier_sign';
import { DragonPlatformVerify } from './dragon-platform_verify';
import { DragonFinancingPre } from './dragon_financing_pre';
import { DragonFinancing } from './dragon_financing';
import { DragonPersonMatchVerify } from './person_match_qrs';
import { DragonSystemMatchVerify } from './sub_system_match_qrs';
import { DragonReplaceQrs } from './replace_qrs';
import { SubChangeStart } from './sub_change_start';
import { SubChangeDate } from './sub_change_date';
import { SubSupplierAdd } from './sub_supplier_add';
import { SubProjectAdd } from './sub_project_add';
import { SubChangeCapital } from './sub_change_capital';
import { VankeFinancingPre } from './vanke_financing_pre';
import { VankeFinancing } from './vanke_financing';
import { VankeFinancingSign } from './vanke_financing_sign';
import { VankePlatformVerify } from './vanke_platform_verify';
import { VankeFactoringPassback } from './vanke_factoring_passback';
import { VankeFactoringRisk } from './vanke_factoring_risk';
import { SubSpecialStart } from './sub_special_start';
import { DragonNuonuocsBlue } from './sub_nuonuocs_blue';
import { DragonNuonuocsRed } from './sub_nuonuocs_red';
import { DragonIntermediaryAdd } from './sub_intermediary_add';
import { DragonIntermediaryModify } from './sub_intermediary_modify';
import { DragonIntermediaryDelete } from './sub_intermediary_delete';
import { SubSpecialVerfication } from './sub_special_verification';
import { SubVankeChange} from './sub_vanke_change';
import { SubChangeVerification} from './sub_change_verification';
import { SubChangeVerificationShort } from './sub_change_verification_short';
import { DragonOnceContractGroupAdd } from './sub_first_contract_add';
import { DragonOnceContractGroupModify } from './sub_first_contract_modify';
import { DragonOnceContractGroupDelete } from './sub_first_contract_delete';
import { DragonOnceContractTemplateAdd } from './once_contract_template_add';

export interface IFlowCustom {
    /**
     * 显示界面之前的调用函数
     * @return { action: 'navigate-back|const-params' } or null
     */
    preShow(svrConfig: any): Observable<any>;

    /**
     * 显示完成后的调用函数
     * @param svrConfig
     * @return { action: 'navigate-back|const-params' } or null
     */
    postShow(svrConfig: any, mainForm: FormGroup): Observable<any>;

    /**
     * 收到服务器返回的svrConfig时做的额外处理工作
     * @param svrConfig
     */
    postGetSvrConfig(svrConfig: any): void;
    afterSubmitandGettip(svrConfig: any): void;

    /**
     * 显示时返回流程标题的配置信息
     * @return { hideTitle: false, def: '', titleName: '项目名称' }
     */
    getTitleConfig(): any;

    /**
     * 新建/提交流程之前的调用函数
     * @param svrConfig
     * @param formValue
     * @return { action: 'navigate-back|const-params' } or null
     */
    preSubmit(svrConfig: any, formValue: any): Observable<any>;
}

class DefaultFlow implements IFlowCustom {
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

    getTitleConfig(): any {
        return {
            hideTitle: false,
            titleName: '流程标题',
            def: ''
        };
    }

    preSubmit(svrConfig: any, formValue: any): Observable<any> {
        return Observable.of(null);
    }

    afterSubmitandGettip(svrConfig: any) {


    }
}

/**
 *  定义流程的个性化信息
 */
export class FlowCustom {

    static build(
        name: string,
        xn: XnService,
        vcr: ViewContainerRef,
        loading: LoadingService,
        communicate: PublicCommunicateService,
        localservice: LocalStorageService,
    ): IFlowCustom {

        switch (name) {
            case 'dragon_financing_pre':
                return new DragonFinancingPre(xn, loading);
            case 'dragon_financing':
                return new DragonFinancing(xn, loading);
            case 'dragon_platform_verify':
                return new DragonPlatformVerify(xn, loading);
            case 'dragon_supplier_sign':
                return new DragonSupplierSign(xn, loading);
            case 'sub_person_match_qrs':
                return new DragonPersonMatchVerify(xn, loading);
            case 'sub_system_match_qrs':
                return new DragonSystemMatchVerify(xn, loading);
            case 'sub_replace_qrs':
                return new DragonReplaceQrs(xn, loading);
            case 'sub_change_start':
                return new SubChangeStart(xn, loading);
            case 'sub_change_date':
                return new SubChangeDate(xn, loading);
            case 'sub_supplier_add':
                return new SubSupplierAdd(xn, loading);
            case 'sub_project_add':
                return new SubProjectAdd(xn, loading);
            case 'sub_change_capital':
                return new SubChangeCapital(xn, loading);
            case 'vanke_financing_pre':
                return new VankeFinancingPre(xn, loading);
            case 'vanke_financing':
                return new VankeFinancing(xn, loading);
            case 'vanke_platform_verify':
                return new VankePlatformVerify(xn, loading);
            case 'vanke_factoring_risk':
                return new VankeFactoringRisk(xn, loading);
            case 'vanke_financing_sign':
                return new VankeFinancingSign(xn, loading);
            case 'vanke_factoring_passback':
                return new VankeFactoringPassback(xn, loading);
            case 'sub_special_start':
                return new SubSpecialStart(xn, loading);
            //开票管理流程
            case 'sub_nuonuocs_blue':
                return new DragonNuonuocsBlue(xn, loading);
            case 'sub_nuonuocs_red':
                return new DragonNuonuocsRed(xn, loading);
            //中介机构
            case 'sub_special_verification':
                return new SubSpecialVerfication(xn, loading);
            case 'sub_intermediary_add':
                return new DragonIntermediaryAdd(xn, loading);
            case 'sub_intermediary_modify':
                return new DragonIntermediaryModify(xn, loading);
            case 'sub_intermediary_delete':
                return new DragonIntermediaryDelete(xn, loading);
            case 'sub_vanke_change' :
                return new SubVankeChange(xn, loading);
            case 'sub_change_verification' :
                return new SubChangeVerification(xn, loading);
            case 'sub_change_verification_short' :
                return new SubChangeVerificationShort(xn, loading);
            //一次转让合同管理
            case 'sub_first_contract_add':
                return new DragonOnceContractGroupAdd(xn, loading);
            case 'sub_first_contract_modify':
                return new DragonOnceContractGroupModify(xn, loading);
            case 'sub_first_contract_delete':
                return new DragonOnceContractGroupDelete(xn, loading);
            case 'once_contract_template_add':
                return new DragonOnceContractTemplateAdd(xn, loading);
            default:
                return new DefaultFlow(xn, loading);
        }
    }
}
