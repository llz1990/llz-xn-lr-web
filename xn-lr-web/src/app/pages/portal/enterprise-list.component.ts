import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {XnUtils} from '../../common/xn-utils';
import {XnService} from '../../services/xn.service';
import {PortalData} from '../../config/mock';
import {EnterpriseData} from '../../config/enterprise';

@Component({
    templateUrl: './enterprise-list.component.html',
    styles: [
        `.min-container { min-height: 690px }`,
        `.xn-portal-box {height: auto; overflow: hidden}`,
        `.box-header .box-title { font-size: 20px; }`,
        `.box-header.with-border { border-bottom: 1px solid #dedede; }`,
        `.xn-portal-box ul li a { border-bottom-color: #dedede;}`,
        `.xn-portal-box ul { margin-bottom: 0px; }`,
        `.box { box-shadow: none; border-left: 1px solid #dedede; border-right: 1px solid #dedede; border-bottom: 1px solid #dedede; margin-bottom: 40px;}`,
        `.box-body { padding-top: 0px; padding-bottom: 0px; }`,
        `.message { margin: 15px 15px 10px; overflow: hidden }`,
        `.message img { width: 100%!important }`
    ]
})
export class EnterpriseListComponent implements OnInit {

    cid: string;
    data: any;
    ids: number[] = [];
    title: string[] = [];
    titles: number[] = [];
    articleArray: any = [];
    page: number;
    total = 0;
    pageSize = 10;
    articleTitle: any;
    articleMessage: any;
    articleOneOrNot = false; // false不显示
    articleInNav = false; // 点击菜单的人才招聘不显示页码切换
    directiveArr: any[] = []; // 直接展示的文章数组
    directiveNav: any[] = []; // 含有直接显示文章的标题
    logining = false;
    subTitle = '联盟企业';

    @ViewChild('artMessage') artMessage: ElementRef;


    constructor(private route: ActivatedRoute, private xn: XnService, private er: ElementRef) {
    }

    ngOnInit() {
        EnterpriseData.getEnterprise().subscribe(v => {
            console.log('enterprise: ', v);
            this.articleArray = v;
        });
    }

}
