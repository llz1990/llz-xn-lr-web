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
import { DragonbookStop } from './dragon_book_stop';
import { DragonbookChange } from './dragon_book_change';
import { ZhongdengRegister } from './zhongdeng_register';
import { SubFactoringRetreat } from './sub_factoring_retreat';
import { SubPlatformRetreat } from './sub_platform_check_retreat';
import { SubFactoringVerifyRetreat } from './sub_factoring_verify_retreat';


export interface IFlowCustom {
    /**./dragon_book_stop
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
            case 'sub_dragon_book_stop':
                return new DragonbookStop(xn, loading);
            case 'sub_dragon_book_change':
                return new DragonbookChange(xn, loading);
            case 'sub_zhongdeng_register':
                return new ZhongdengRegister(xn, loading);
            case 'sub_factoring_retreat':
                return new SubFactoringRetreat(xn, loading);
            case 'sub_platform_check_retreat':
                return new SubPlatformRetreat(xn, loading);
            case 'sub_factoring_verify_retreat':
                return new SubFactoringVerifyRetreat(xn, loading);
            default:
                return new DefaultFlow(xn, loading);
        }
    }
}
