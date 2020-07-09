import {Component, OnInit, ElementRef} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {XnService} from '../../services/xn.service';
import {PortalData} from '../../config/mock';
import {NavService} from '../../services/nav.service';

declare let $: any;

@Component({
    templateUrl: './detail.component.html',
    styles: [
        `.min-container { min-height: 690px }`,
        `section { margin: 36px 50px; border: 3px solid #d2d2d2; width: 75%; margin-left: auto; margin-right: auto;}`,
        `h2 { font-size: 24px; line-height: 35px; padding-bottom: 5px; text-align: center; color: #0b3c61; }`,
        `.con-block { padding-left: 30px; padding-right: 30px}`,
        `.con-date {text-align: right; margin-bottom: 20px; border-bottom: 1px solid #e6e6e6; padding: 30px 30px 10px 0px}`,
        `.con-data {min-height: 400px; padding: 30px 50px;}`,
        `.con-attachment {margin-top: 20px; border-top: 1px solid #e6e6e6; padding: 30px 30px; }`,
        `.cover-img { max-width: 100%; text-align: center }`,
        `.cover-img img { max-width: 100% }`
    ]
})
export class DetailComponent implements OnInit {

    aid: string;
    data: any;
    article: any;
    fileArr: any[] = [];

    localDomain: string;
    localUrls: string[]; // 以这几个url开头的链接用routerLink
    localUrlsAccurate: string[]; // 精确匹配
    navbar: any;

    constructor(private route: ActivatedRoute,
                private er: ElementRef, private xn: XnService, private nav: NavService) {
        this.localDomain = this.calcDomain(window.location.href);
        this.localUrls = [];
        this.localUrlsAccurate = [];
        this.localUrlsAccurate.push(this.localDomain + '/');
        this.localUrls.push(this.localDomain + '/portal');
        this.localUrls.push(this.localDomain + '/console');
        this.localUrls.push(this.localDomain + '/user');
    }

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.aid = params['id'];
            let articleArr: any[] = [];

            this.xn.api.post('/portalsite/article_info', {
                id: this.aid,
            }).subscribe(json => {
                console.log('article');
                console.log(json);
                this.article = json.data.data;
                this.article.createTime = new Date(parseInt(this.article.createTime, 0)).toLocaleDateString();
                this.article.createTime = this.article.createTime.split('/').join('-');

                if (json.data.data.coverPhoto && json.data.data.coverPhoto !== '') {
                    this.article['fileId'] = JSON.parse(json.data.data.coverPhoto).fileId;
                }

                if (!!this.article.attachments) {
                    this.article.attachments = JSON.parse(this.article.attachments);
                    for (let i = 0; i < this.article.attachments.length; i++) {
                        articleArr.push({
                            url: '/api/attachment/view?key=' + this.article.attachments[i].fileId,
                            label: this.article.attachments[i].fileName
                        });
                    }
                }
                console.log(articleArr);
                this.fileArr = articleArr;

                let div = $('.con-data', this.er.nativeElement);
                console.log(div);
                div.html(this.article.content);

                // 把文章内容内的链接改为routerLink
                for (let link of $('a', div)) {
                    if (this.isLocalUrl(link.href)) {
                        $(link).on('click', () => {
                            let newUrl = link.href.substring(link.href.indexOf(this.localDomain) + this.localDomain.length);
                            this.xn.router.navigate([newUrl]);
                            return false; // 不在触发href
                        });
                    }
                }

                PortalData.getColumn(this.article.columnId).subscribe(v => {
                    this.data = v;
                    console.log(v);

                    this.navOn(this.data && this.data.nav);
                });

            });


        });
    }

    private isLocalUrl(href: string): boolean {
        for (let url of this.localUrls) {
            if (href.indexOf(url) === 0) {
                return true;
            }
        }
        if (this.localUrlsAccurate[0] === href) {
            return true;
        }
        return false;
    }

    /**
     * 计算href所包含的域名
     * @param href
     * @returns {any}
     */
    private calcDomain(href: string): string {
        href = href.trim();
        let pos = href.indexOf('://');
        if (pos < 0) {
            return '';
        }
        pos += 3;
        pos = href.indexOf('/', pos);
        if (pos < 0) {
            console.log('return', href.substring(0));
            return href.substring(0);
        } else {
            console.log('return', href.substring(0, pos));
            return href.substring(0, pos);
        }
    }

    navOn(nav) {
        if (!nav) {
            return;
        }
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
