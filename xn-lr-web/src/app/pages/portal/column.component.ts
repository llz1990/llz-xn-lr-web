import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {XnService} from '../../services/xn.service';
import {PortalData} from '../../config/mock';
import {NavService} from '../../services/nav.service';

@Component({
    templateUrl: './column.component.html',
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
export class ColumnComponent implements OnInit {

    cid: string;
    data: any;
    ids: number[] = [];
    title: string[] = [];
    titles: number[] = [];
    articleArray: any[] = [];
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
    navbar: any;

    @ViewChild('artMessage') artMessage: ElementRef;


    constructor(private route: ActivatedRoute, private xn: XnService, private er: ElementRef, private nav: NavService) {
    }

    ngOnInit() {

        this.start();

        // 检查登录态
        this.xn.user.checkLogin().subscribe(logined => {
            logined ? this.logining = true : this.logining = false;
        });
    }

    start() {
        this.route.params.subscribe((params: Params) => {
            let articlesObj: any = {};
            let articles: any[] = [];
            let titles: any[] = [];
            let artArr: any[] = [];

            this.cid = params['id'];
            this.articleOneOrNot = true;
            PortalData.getColumn(this.cid).subscribe(v => {
                let idsTemp: number[] = [];
                let titleTemp: string[] = [];
                // this.data = XnUtils.portalCheckLogin(json, v);
                this.data = v;
                console.log('getColum: ', v);

                let lists: any[] = v.lists;

                // 拼接ids
                if (!!lists) {
                    for (let list of lists) {
                        idsTemp.push(list.id);
                        titleTemp.push(list.title);
                    }
                }

                // console.log("this.ids: ", idsTemp);
                // console.log("this.title: ", titleTemp);
                // 用临时变量来过渡一下，才不会成为全局变量
                this.ids = idsTemp;
                this.title = titleTemp;

                // console.log("directive: ",PortalData.getDirectiveColumn(this.cid));

                // 直接显示的文章数组,0表示非直接展示，1表示为直接展示
                let directiveArrTemp = PortalData.getDirectiveColumn(this.cid);
                this.directiveArr = directiveArrTemp;
                // console.log("this.directiveArr: ", this.directiveArr);

                // 点的时候具体的某一条文章，且该文章不是直接展示
                if (this.ids.length === 1 && this.directiveArr.length === 0) {
                    this.articleOneOrNot = true;
                    let articleInNavTemp = true;
                    this.articleInNav = articleInNavTemp;
                    this.xn.api.post('/portalsite/detail_list', {
                        columnId: this.ids,
                        start: (this.page - 1) * this.pageSize,
                        length: this.pageSize
                    }).subscribe(json => {
                        // console.log("this.id:", json)
                        this.total = json.data.recordsTotal;

                        for (let row of json.data.data) {
                            row.createTime = new Date(parseInt(row.createTime, 0)).toLocaleDateString();
                            row.createTime = row.createTime.split('/').join('-');
                        }
                        for (let i in json.data.data) {
                            articles.push(json.data.data[i]);
                        }

                        articlesObj = {
                            id: this.cid,
                            title: this.title,
                            rows: articles
                        };
                        artArr.push(articlesObj);
                        // console.log(artArr);
                        this.articleArray = artArr;
                        console.log('articleArray: ', this.articleArray);
                    });
                }
                // 点的是具体的某一条文章，且该文章是直接展示（平台介绍、内设机构、联系我们）
                else if (this.ids.length === 1 && this.directiveArr.length === 1) {
                    this.articleOneOrNot = false;

                    // console.log("articleId: ", this.directiveArr[0].articleId)
                    this.xn.api.post('/portalsite/article_info', {
                        id: this.directiveArr[0].articleId,
                    }).subscribe(json => {
                        // console.log('articleinfo', json);
                        this.articleTitle = json.data.data.title;
                        // console.log(this.article)
                        this.articleMessage = json.data.data.content;
                    });
                }
                // 点的是菜单栏目的一级，传递的是多个id
                else {
                    // 当为直接展示的时候，不显示该直接展示的title
                    let directiveNavTemp = PortalData.getDirectiveNav();
                    this.directiveNav = directiveNavTemp; // 不直接显示title的数组

                    this.articleOneOrNot = true;
                    this.xn.api.post('/portalsite/summary_list', {
                        columnIds: this.ids,
                    }).subscribe(json => {
                        console.log('list: ', json);
                        let keyId: string = '';
                        let title: string = '';
                        let keyIdArr: any = [];
                        let titleArr: any = [];

                        // 构建id
                        for (let key in json.data.data) {
                            keyIdArr.push(key);

                        }
                        console.log('keyId: ', keyIdArr);

                        // 构建title
                        for (let i = 0; i < keyIdArr.length; i++) {
                            titleArr.push(PortalData.getTitle(keyIdArr[i]));
                        }
                        console.log('titleArr: ', titleArr);

                        for (let i in json.data.data) {
                            for (let row of json.data.data[i]) {
                                row.createTime = new Date(parseInt(row.createTime, 0)).toLocaleDateString();
                                row.createTime = row.createTime.split('/').join('-');
                            }
                            articles.push(json.data.data[i]);
                        }
                        console.log('articles: ', articles);
                        for (let i = 0; i < articles.length; i++) {
                            articlesObj = {
                                id: keyIdArr[i],
                                title: titleArr[i],
                                rows: articles[i]
                            };
                            artArr.push(articlesObj);
                        }

                        this.articleArray = artArr;
                        console.log('articleArrays: ', this.articleArray);
                    });
                }

            });

        });

    }

    isActive(child): string {
        return (child.id === this.cid) ? 'active' : '';
    }

    navOn(nav) {
        if (this.navbar === nav[0].title) {
            return;
        }
        this.navbar = nav[0].title;
        const titles = PortalData.getTitles();
        const navIndex = titles.indexOf(nav[0].title);
        const index = navIndex >= 0 ? navIndex + 1 : 0;
        const data = {
            navIndex: index.toString()
        };
        // 设置菜单第几项
        this.xn.nav.setNavIndex(data);
    }
}
