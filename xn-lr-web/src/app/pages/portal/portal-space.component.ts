import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';

// import {PortalData} from "../../config/mock";

@Component({
    selector: 'portal-space',
    templateUrl: './portal-space.component.html',
    styleUrls: [
        './home.component.css',
        './portal-space.component.css'
    ],
})
export class PortalSpaceComponent implements OnInit {

    news: any;
    notifies: any;

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        this.xn.api.post('/portalsite/summary_list', {
            columnIds: [111, 112],
            length: 3,
        }).subscribe(json => {
            this.news = json.data.data['111'];
            if (this.news && this.news.length !== 0) {
                for (const row of this.news) {
                    if (row.coverPhoto !== '') {
                        row['fileId'] = JSON.parse(row.coverPhoto) && JSON.parse(row.coverPhoto).fileId;
                    }
                }
            }
            // // 降序排序
            // this.news.sort((a: any, b: any) => b.createTime - a.createTime);

            this.notifies = json.data.data['112'];
            if (this.notifies && this.notifies.length !== 0) {
                for (let row of this.notifies) {
                    if (row.coverPhoto !== '') {
                        row['fileId'] = JSON.parse(row.coverPhoto) && JSON.parse(row.coverPhoto).fileId;
                    }
                }
            }

        });
    }

    // 查看更多，跳转至平台新闻
    public viewMore() {
        this.xn.router.navigate(['/portal/column/11']);
    }

}
