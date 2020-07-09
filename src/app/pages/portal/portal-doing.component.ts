import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';

// import {PortalData} from "../../config/mock";

@Component({
    selector: 'portal-doing',
    templateUrl: './portal-doing.component.html',
    styleUrls: [
        './home.component.css',
        './portal-doing.component.css'
    ],
})
export class PortalDoingComponent implements OnInit {

    news: any;
    notifies: any;

    constructor(private xn: XnService) {
    }

    ngOnInit() {
    }

}
