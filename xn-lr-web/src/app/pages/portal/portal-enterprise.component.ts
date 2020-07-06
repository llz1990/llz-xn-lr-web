import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';
import {EnterpriseData} from '../../config/enterprise';

@Component({
    selector: 'portal-enterprise',
    templateUrl: './portal-enterprise.component.html',
    styles: [
        `.xn-portal-box {height: 300px; overflow: hidden}`,
        `.xn-portal-box ul li:nth-child(9) a {border-bottom: 0;}`,
        `.xn-portal-box ul li:nth-child(10) a {border-bottom: 0;}`,
        `.fr { float: right }`,
        `.leftTitle { color: #000 }`
    ]
})
export class PortalEnterpriseComponent implements OnInit {

    enterprises1: any;
    enterprises2: any;

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        EnterpriseData.getEnterprise().subscribe(v => {
            console.log('enterprises: ', v);
            this.enterprises1 = v.slice(0, 10);
        });
    }
}
