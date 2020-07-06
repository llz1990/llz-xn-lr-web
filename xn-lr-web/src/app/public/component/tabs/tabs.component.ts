import { Component, OnInit } from '@angular/core';
import { XnService } from '../../../services/xn.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'xn-tabs',
    templateUrl: './tabs.component.html',
    styles: []
})
export class XnTabsComponent implements OnInit {

    activeLinkIndex = 0;

    title = '';

    tabs = [];

    constructor(private xn: XnService, private activatedRoute: ActivatedRoute) {
        this.title = this.activatedRoute.snapshot.data.title;
        this.tabs = this.activatedRoute.snapshot.data.tabs;
    }

    ngOnInit() {
        this.activatedRoute.url.subscribe((res) => {
            const currentUrl = this.xn.router.url.split('?')[0];
            const link = this.tabs.find(tab => currentUrl.endsWith(tab.link));
            this.activeLinkIndex = link.index;
        });
    }

}
