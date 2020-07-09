import { Component, OnInit } from '@angular/core';
declare const moment: any;

@Component({
    selector: 'portal-footer',
    templateUrl: './portal-footer.component.html',
    styleUrls: [
        './style.css',
        './portal-footer.component.css'
    ],
})
export class PortalFooterComponent implements OnInit {
    public Version: string = '';
    constructor() {
    }

    ngOnInit() {
        this.Version = moment().format('YYYY-MM-DD HH:mm:ss');
    }

}
