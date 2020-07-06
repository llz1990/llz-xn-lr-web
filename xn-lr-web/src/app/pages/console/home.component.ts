import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { XnService } from '../../services/xn.service';
import { ActivatedRoute } from '@angular/router';
import { XnModalUtils } from '../../common/xn-modal-utils';
import { PromotionInformationModalComponent } from '../../avenger/factoring-business/promotion-information.modal.component';
import { ExpirationReminderModalComponent } from '../../avenger/factoring-business/expiration-reminder-modal.component';
import {
    SupplierExpirationReminderModalComponentComponent
} from '../../avenger/factoring-business/supplier-expiration-reminder-modal.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ApiService } from '../../services/api.service';
import { FactoringBusinessModel } from '../../avenger/factoring-business/factoring-business.model';
import { RecommendationLetterComponent } from '../../modules/bank_puhuitong/share/modal/recommendation-letter-modal.component';
declare const moment: any;
import { Isshow } from '../../config/hideOrshow';

@Component({
    templateUrl: './home.component.html',
    styles: [
        `.table {
            font-size: 13px;
        }`,
    ]
})
export class HomeComponent implements OnInit {
    public showPaymentMessage = false;
    public todoConfig: any; // 首页代办
    public msgConfig: any;  // 系统消息
    public payMsgConfig: any; // 备付通知
    public avengertodo: any; // 采购融资代办列表
    public dragonTodo: any;//龙光任务列表
    public defaultValue: string = 'B';
    public todoCount01: number;
    public todoCount02: number;
    public todoCount03: number;
    public fac: FactoringBusinessModel = new FactoringBusinessModel();
    public alertPromotion: boolean = false;
    public avengerShow: boolean;
    public isProduction: boolean;
    /**
     * 万科供应商保理业务模块显示
     *  summary  仅【客户管理】中【白名单状态】为【系统白名单】或【人工白名单】的企业可见此模块。
     */
    public factoringBusinessBoolean: boolean = false;

    constructor(public xn: XnService, private api: ApiService,
        public localStorageService: LocalStorageService, private route: ActivatedRoute, private vcr: ViewContainerRef) {
    }

    ngOnInit() {
        this.isProduction = this.xn.user.env === 'production' || this.xn.user.env === 'exp';
        if (this.isProduction) {
            Isshow.Avenger = false;
        }
        this.avengerShow = Isshow.Avenger;
        if (this.xn.user.orgType !== 3 && this.xn.user.orgType !== 99 && this.xn.user.orgType !== 102 && this.avengerShow) {
            this.xn.avenger.post('/sign_aggrement/bussiness_info/authority', { appId: this.xn.user.appId }).subscribe(x => {
                if (x.data) {
                    this.factoringBusinessBoolean = x.data.isAuthority;

                }
            });
            this.xn.avenger.post('/bankpush/list/remind', {}).subscribe(x => {
                if (x.ret === 0 && x.data && x.data.data.length > 0) {
                    XnModalUtils.openInViewContainer(this.xn, this.vcr, RecommendationLetterComponent,
                        { value: x.data.data[0] }).subscribe(x => {
                        });
                }
            });
            this.xn.avenger.post('/aprloan/prompt/supplierPrompt', {}).subscribe(x => {
                if (x.ret === 0) {
                    if (x.data.flag === 1) {
                        this.displayPromotion();
                        if (x.data.data.length > 0) {
                            XnModalUtils.openInViewContainer(this.xn,
                                this.vcr, SupplierExpirationReminderModalComponentComponent, x.data.data)
                                .subscribe(param => {
                                    if (param === null) {
                                        return;
                                    }
                                });
                        }
                    }
                }
            });
        }
        // 核心企业,供应商显示备付通知
        this.showPaymentMessage = this.xn.user.orgType === 2 || this.xn.user.orgType === 1;
        // todo 采购融资信息模块
        // this.factoringBusinessBoolean = this.xn.user.orgType === 1;
        // todo 只有满足显示条件和第一次进入控制台时


        // todo 业务到期提醒
        if (this.xn.user.orgType === 99 || this.xn.user.orgType === 3 && this.avengerShow) {
            if (moment().weekday(1).format('YYYYMMDD') === moment().startOf('day').format('YYYYMMDD')) {// 判断是周一
                this.displayRemind();
            }
        }

        // 如果当前用户还未审批通过，跳转到/user
        if (this.xn.user.status !== 2) {
            this.xn.msgBox.open(false, '您的机构注册还未审批通过，请等候', () => {
                this.xn.router.navigate(['/']);
            });
            return;
        }

        this.route.data.subscribe((config: any) => {

            this.todoConfig = config.todo;
            this.msgConfig = config.sysMsg;
            this.payMsgConfig = config.payMsg;
            this.avengertodo = config.avengertodo;
            this.dragonTodo = config.dragonTodo;
        });
        this.defaultValue = this.localStorageService.caCheMap.get('defaultValue') || this.defaultValue;
        this.initData(this.defaultValue, true);

        this.api.post('/user/todo_count', {}).subscribe((json) => {
            this.todoCount01 = json.data.count1;
            this.todoCount02 = json.data.count2;
            this.todoCount03 = json.data.count3;
        });
    }


    initData(type: string, init?: boolean) {
        if (this.defaultValue === type && !init) {
            return;
        } else {
            this.defaultValue = type;
        }
        this.localStorageService.setCacheValue('defaultValue', this.defaultValue);
    }

    /**
  * 判断是否显示推介涵
  * 如果该企业的【白名单状态】为【系统白名单】或【人工白名单】，且【过会情况】为【准入】，
  * 且未签署合作协议时，该在客户登录后，直接以弹窗的形式展示在首页，【产品推介函】。
  */
    // 首页弹出推介函
    private displayPromotion() {
        this.xn.avenger.post('/sign_aggrement/bussiness_info/readLetter', { appId: this.xn.user.appId }).subscribe(x => {
            if (x.data) {
                this.alertPromotion = x.data.isAuthority || false;
                if (this.alertPromotion === true) {
                    this.getDetail();
                }
            }
        });



    }

    /**
     *  平台 ，保理商业务提醒
     */
    private displayRemind() {
        this.xn.avenger.post('/aprloan/prompt/selfPrompt', {}).subscribe(x => {
            if (x.ret === 0) {
                if (x.data.data.length > 0) {
                    if (x.data.flag === 1) {
                        XnModalUtils.openInViewContainer(this.xn, this.vcr, ExpirationReminderModalComponent, x.data.data)
                            .subscribe(param => {
                                if (param === null) {
                                    return;
                                }
                            });
                    }
                }
            }
        });
    }

    // 获取推介函信息
    public getDetail() {
        this.xn.avenger.post('/sign_aggrement/bussiness_info/info', { appId: this.xn.user.appId }).subscribe(x => {
            if (x.data) {
                this.fac.allAmount = x.data.allAmount;
                this.fac.allLeftAoumnt = x.data.allLeftAoumnt;
                this.fac.backAmount = x.data.backAmount;
                this.fac.factoringServiceFLV = x.data.factoringServiceFLV;
                this.fac.factoringUseFLV = x.data.factoringUseFLV;
                this.fac.leftAmount = x.data.leftAmount;
                this.fac.maxAmount = x.data.maxAmount;
                this.fac.nowlimit = x.data.nowlimit;
                this.fac.useAmount = x.data.useAmount;
                this.fac.platformServiceFLV = x.data.platformServiceFLV;
                this.fac.oldReceive = x.data.oldReceive;
                this.fac.totalFLV = x.data.totalFLV;
            }
            XnModalUtils.openInViewContainer(this.xn, this.vcr, PromotionInformationModalComponent, this.fac)
                .subscribe(param => {
                    if (param === null) {
                        return;
                    }
                });

        });
    }

}
