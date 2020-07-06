import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';

// import {PortalData} from "../../config/mock";

@Component({
    selector: 'portal-news',
    templateUrl: './portal-news.component.html',
    styles: [
        `.xn-portal-box {height: 300px; overflow: hidden}`,
    ]
})
export class PortalNewsComponent implements OnInit {

    news: any;
    notifies: any;

    constructor(private xn: XnService) {
    }

    ngOnInit() {
    }

}
