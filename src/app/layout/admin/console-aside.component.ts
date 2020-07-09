/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：console-aside.component
 * @summary：系统平台侧边导航栏配置
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan             修改         2019-04-01
 * 1.1                 zhyuanan          删除无用导航     2019-05-18
 * **********************************************************************
 */

import { Component, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { XnService } from '../../services/xn.service';
import Menus from './menus/index';
import { PublicCommunicateService } from '../../services/public-communicate.service';
declare var $: any;
@Component({
    selector: 'console-aside',
    templateUrl: './console-aside.component.html',
    styles: [
        `.main-sidebar {
            position: fixed;
            height: 100%;
        }
        @keyframes fade {
            from {
                opacity: 1.0;
            }
            50% {
                opacity: 0.4;
            }
            to {
                opacity: 1.0;
            }
        }

        @-webkit-keyframes fade {
            from {
                opacity: 1.0;
            }
            50% {
                opacity: 0.4;
            }
            to {
                opacity: 1.0;
            }
        }
        .navLi {
            animation: fade 700ms 5;
            -webkit-animation: fade 700ms 5;
        }
        `
    ]
})
export class ConsoleAsideComponent implements OnInit {
    enterpriseMenuEnum = EnterpriseMenuEnum;
    showRegister = false;
    showProcess = false;
    showMenu = false;

    showTodo = false;
    factorViewPermission = true;
    todoCount: number = null;
    homeCss: string; // 首页的样式
    publishCss: string; // 推广列表的样式
    filterCompanys = ['金地（集团）股份有限公司'];
    loginUrl = ['/user/login'];
    showType: boolean = [1, 2, 3, 4, 99, 5, 66].indexOf(Number(this.xn.user.orgType)) > -1;
    currentUrl: string;

    /**
     *  供应商 orgType:1
     */
    SUPPLIER = Menus.SUPPLIER;

    /**
     *  核心企业 orgType:2
     */
    CORE = Menus.CORE;

    /**
     *  保理商 orgType:3
     */
    FACTORING = Menus.FACTORING;

    /**
     *  银行  orgType:4
     */
    BANK = Menus.BANK;

    /**
     *  平台 orgType:99
     */
    PLATFORM = Menus.PLATFORM;

    /**
     *  核心企业（下游采购商）orgType:5
     */
    COREDOWNBUYER = Menus.COREDOWNBUYER;

    /**
     *  风控平台 orgType:88
     */
    WINDCONTROL = Menus.WINDCONTROL;

    /**
     *  地产abs资产管理平台 orgType:77
     */
    ABS = Menus.ABS;

    /**
     * type66Menu  银行角色 （旧版hw模式） orgtype:66
     */
    BANKOLDHW = Menus.BANKOLDHW;

    /**
     * 金地模式、新万科下的中介角色  orgType:102
     */
    // GEMDALEINTERMEDIARY = Menus.GEMDALEINTERMEDIARY;
    INTERMEDIARY = Menus.INTERMEDIARY;

    // 我的工具
    toolsMenu = {
        label: '我的工具', css: 'fa-wrench',
        children: [
            { label: '利息计算器', url: '/console/tools/interest', notarget: true },
            { label: '智能风控', url: '/console/tools/risk', notarget: true },
            { label: '企业信用公示', url: 'http://www.gsxt.gov.cn' },
            { label: '查询失信企业', url: 'http://shixin.court.gov.cn' },
            { label: '查询发票状态', url: 'https://inv-veri.chinatax.gov.cn' },
            { label: '诉讼服务平台', url: 'http://ssfw.szcourt.gov.cn' },
        ]
    };
    // 侧边栏显示内容
    menus: any[] = [];
    constructor(public xn: XnService, private publicCommunicateService: PublicCommunicateService,
        private route: ActivatedRoute, private vcr: ViewContainerRef, private el: ElementRef) {
    }

    ngOnInit() {
        this.route.url.subscribe(v => {
            this.onEnter();
        });
        this.publicCommunicateService.change.subscribe(x => {
            if (x === 'recommendationModalClose') {
                if ($("[href='/console/bank-puhuitong/bank-extension']", this.el.nativeElement).length) {
                    $("[href='/console/bank-puhuitong/bank-extension']", this.el.nativeElement)
                        .closest("li").addClass('navLi');
                    setTimeout(() => {
                        $("[href='/console/bank-puhuitong/bank-extension']", this.el.nativeElement).closest("li").removeClass('navLi');
                    }, 5100);
                }
            }
        });
    }
    /**
     *  是否显示工具
     */
    isExpendToolMenu() {
        return this.toolsMenu.children.some(item => item.url === this.currentUrl) ? 'active menu-open' : '';
    }

    deepCopy(obj, c) {
        c = c || {};
        for (let i in obj) {
            if (typeof obj[i] === 'object') {
                c[i] = obj[i].constructor === Array ? [] : {};
                this.deepCopy(obj[i], c[i]);
            } else {
                c[i] = obj[i];
            }
        }
        return c;
    }
    /**
     *  加载菜单栏，导航改变时刷新
     */
    private onEnter() {
        this.showRegister = false;
        this.showProcess = false;
        this.showMenu = false;
        this.currentUrl = this.xn.router.url;
        this.homeCss = this.currentUrl === '/console' || this.currentUrl.indexOf('/console/record/todo') === 0
            ? 'active'
            : '';
        this.publishCss = this.currentUrl.includes('/console/bank-puhuitong/bank-extension')
            ? 'active'
            : '';

        // 注册
        const urls = ['/user/register'];
        if (urls.indexOf(this.currentUrl) >= 0) {
            this.showRegister = true;
            return;
        }

        this.xn.user.isLogin().subscribe(logined => {
            // 未登录时
            if (!logined) {
                this.xn.user.setRedirectUrl(this.xn.router.url);
                return;
            }

            // 审核中
            if (this.xn.user.status !== 2) {
                this.showProcess = true;
                return;
            }

            this.showMenu = true;
            if (this.xn.user.orgType === 1 && this.loginUrl.indexOf(this.currentUrl) === -1) {
                this.xn.dragon.post('/trade/get_trade_count', {}).subscribe(x => {
                    let newMenus = [];
                    this.deepCopy(Menus.SUPPLIER, newMenus);
                    if (x.ret === 0 && x.data && x.data.countList && x.data.countList.length === 0) {
                        newMenus.forEach(item => {
                            item.children = item.children.filter((element) => {
                                return element.url && element.url != "/machine-account" || !element.url;
                            });
                        });
                        this.SUPPLIER = newMenus;
                    }
                    this.buildMenu();
                });
            } else {
                this.buildMenu();
            }

        });
    }

    /**
     *  根据配置构建导航
     */
    private buildMenu() {
        this.showTodo = true;
        if (this.showTodo) {
            this.xn.user.todoCount$.subscribe(count => {
                this.todoCount = count;

            });
            if (this.loginUrl.indexOf(this.currentUrl) === -1) {
                this.xn.user.getTodoCount();
            }

        }

        // 是不是经办
        const isOperator = this.xn.user.roles.indexOf('operator') >= 0;

        this.menus = []; // 清空上次构建菜单
        // 根据角色类型显示导航
        // const menus = this[this.enterpriseMenuEnum[this.xn.user.orgType]];
        let menus = [];
        let resRoles = this.xn.user.roles.filter(function(item,index,array){
            return !(item === undefined || item === null || item === '');
        });
        if(this.xn.user.orgType === 3 && resRoles.length === 1 && resRoles[0] === "checkerLimit"){
            this.factorViewPermission = false;
            this.homeCss = '';
            menus = Menus.ViewPermission;
        }else{
            menus = this[this.enterpriseMenuEnum[this.xn.user.orgType]];
        }

        // 当前的url
        const url = this.xn.router.url;
        for (const menu of menus) {
            if (menu.isAdmin && !this.xn.user.isAdmin) {
                continue;
            }
            const tmp = {
                label: menu.label,
                css: menu.css,
                treeCss: '',
                children: []
            };
            for (const child of menu.children) {
                if (child.isOperator && !isOperator) {
                    continue;
                }
                if (child.isPlatformAdmin && !this.xn.user.isPlatformAdmin) {
                    continue;
                }
                if (child.isFactoringAdmin && (this.xn.user.orgType !== 3 || !this.xn.user.isAdmin)) {
                    continue;
                }
                if (child.filterCompany && (this.filterCompanys.indexOf(this.xn.user.orgName) === -1)) {
                    continue;
                }
                if (child.isSupply && (this.xn.user.appType && this.xn.user.appType.type !== 2)) {
                    continue;
                }
                // 如果核心企业 - 非项目公司(上传企业资料)
                if (child.isProject && !this.xn.user.enterpriseType.some(x => this.reverseStr(x).next === child.enterpriseType)) {
                    continue;
                }
                // 如果是地产，且是供应链
                /**
                 * appType{type:number,subType:number,dcType:number}
                 * type: 1=地产类 , 2=供应链类
                 * subType: 1=集团公司 ,2=城市公司 , 3=项目公司
                 * dcType:  [financing6 万科， financing14金地,financing52龙光]
                 */
                // 如果不是 金地模式,或者万科模式 核心企业 过滤掉
                if (child.isEstate && !this.xn.user.enterpriseType.length) {
                    continue;
                }
                // 所属保理商可见
                if(child.ofFactoring && !(child.ofFactoring.includes(this.xn.user.appId.toString()))){
                    continue;
                }
                // 根据公司机构模式，显示导航
                if (child.isEstate && this.xn.user.enterpriseType.length
                    && !this.xn.user.enterpriseType.some(x => this.reverseStr(x).pre === child.dcType)) {
                    continue;
                }

                for (const child2 of menu.children) {
                    if (child2.changeName && child.customFlow &&
                        !this.xn.user.customFlowIds.some(v => v.customFlowId === child.customFlow)) {
                        child2.label = '交易申请';
                    }
                }
                if (child.customFlow && !this.xn.user.customFlowIds.some(v => v.customFlowId === child.customFlow)) {
                    continue;
                }

                const liObj = {
                    label: child.label,
                    url: child.url,
                    treeCss: '',
                    children: []
                };
                const children = child.children || [];
                const childrenArr = [];
                if (children.length > 0) { // 3级筛选
                    for (const chil of children) {
                        if (chil.isWanke && (this.xn.user.appType && this.xn.user.appType.type === 1
                            && this.xn.user.appType.dcType && this.xn.user.appType.dcType !== '4')) {
                            continue;
                        }
                        if (chil.isJindi && (this.xn.user.appType && this.xn.user.appType.type === 1
                            && this.xn.user.appType.dcType && this.xn.user.appType.dcType !== '5')) {
                            continue;
                        }
                        // 如果是金地abs 或者是万科abs
                        // [financing6 万科， financing14金地] 金地abs  公司性质 xxxx_1 集团公司 ，xxxxx_3 项目公司
                        if (chil.isHeadQuarter && !this.xn.user.enterpriseType.some(x => x === chil.enterpriseType)) {
                            continue;
                        }
                        if (chil.isProject && !this.xn.user.enterpriseType.some(x => x === chil.enterpriseType)) {
                            continue;
                        }
                        if (this.isActiveMenu(url, chil.url) || this.isSomeGroup(url, chil) || !this.factorViewPermission) {
                            chil['treeCss'] = 'active';
                            child.treeCss = 'active menu-open';
                            liObj['treeCss'] = 'active';  // 兼容停留
                            tmp.treeCss = 'active menu-open';
                        } else {
                            chil['treeCss'] = '';
                        }
                        childrenArr.push(chil);
                    }
                }
                liObj['children'] = childrenArr;
                if (this.isActiveMenu(url, child.url) || this.isSomeGroup(url, child) || !this.factorViewPermission) {
                    liObj['treeCss'] = 'active';
                    tmp.treeCss = 'active menu-open';
                }
                tmp.children.push(liObj);
            }

            this.menus.push(tmp);
        }
        console.log(this.menus);
    }

    /**
     *  当前激活导航
     * @param current
     * @param child
     */
    private isActiveMenu(current: string, child: string) {
        return current === child || this.isSubMenu(current, child);
    }

    /**
     *  判断是否为子导航
     * @param current
     * @param child
     */
    private isSubMenu(current: string, child: string) {
        if (child) {
            if (current.indexOf('record') >= 0) {
                if (child.indexOf('record/record') >= 0) {
                    const type = this.route.snapshot.children[0].params.type || this.route.snapshot.children[0].params.id;
                    const childType = child.substring(child.lastIndexOf('\/') + 1);
                    return type === childType;
                }
            } else {
                const roles = ['/add', '/new', '/edit', '/view', '/detail'];
                if (!roles.some(item => current.indexOf(item) >= 0)) {
                    // manage/portal-manage/:id, survey/survey/:label
                    // 对于中登列表，点击时导航取消台账的active类
                    if (current.indexOf("zhongdeng-list") >= 0) {
                        return false;
                    }
                    return current.indexOf(child) >= 0;
                } else {
                    // bank-card/list => bank-card/edit/:cardCode
                    const prefix = child.substring(0, child.lastIndexOf('\/'));
                    return prefix.lastIndexOf('\/') > 0 && current.indexOf(prefix) === 0 && roles.some(item => current.indexOf(item) >= 0);
                }
            }
        }
        return false;
    }

    /**
     * 与默认 url 选中高亮等效的 urls
     */
    private isSomeGroup(current: string, item: any) {
        return item && item.activeGroups && [].concat(item.activeGroups).includes(current);
    }

    /**
     *  截取字符串
     * @param str
     */
    private reverseStr(str): { pre: string, next: number } {
        return {
            pre: str.toString().substring(0, str.lastIndexOf('_')),
            next: parseInt(str.toString().substring(str.lastIndexOf('_') + 1), 0)
        };
    }
}




/**
 *  企业类型枚举
 */
export enum EnterpriseMenuEnum {
    SUPPLIER = 1, // 供应商
    CORE = 2, // 核心企业
    FACTORING = 3, // 保理商
    BANK = 4, // 银行
    PLATFORM = 99, // 平台
    COREDOWNBUYER = 5, // 核心企业——下游采购商
    WINDCONTROL = 88, // 风控
    ABS = 77, // abs 资产管理
    BANKOLDHW = 66, // 银行角色——旧版hw
    // GEMDALEINTERMEDIARY = 102 // 金地模式-中介机构
    INTERMEDIARY = 102 // 中介机构-- 金地模式、新万科
}
