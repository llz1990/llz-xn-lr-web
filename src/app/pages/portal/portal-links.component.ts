import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'portal-links',
    templateUrl: './portal-links.component.html',
    styles: [
        `.fl{float:left;}`,
        `.links {margin-top: 50px; margin-bottom: 30px;}`,
        `.links_list {list-style-type: none; padding-left: 10px; margin-top: 50px; margin-bottom: 30px; }`,
        `.links_list li{ position:relative; float:left; padding:0 10px;}`,
        `.links_list li a{ font-size:12px; color:#888;}`,
        `.links_list li s {top: 5px;right: 0;width: 0;height: 12px;border-left: 1px solid #cfcfcf;overflow: hidden; position:absolute;}`,
    ]
})
export class PortalLinksComponent implements OnInit {

    items = [
        { title: '中国人民银行', url: 'http://www.pbc.gov.cn/' },
        { title: '征信中心', url: 'http://www.pbccrc.org.cn/' },
        { title: '中征登记公司', url: 'http://www.zzdengji.com/' },
        { title: '中征应收账款融资服务平台', url: 'http://www.crcrfsp.com' },
        { title: '中国租赁业协会', url: 'http://www.clba.org.cn/' },
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
