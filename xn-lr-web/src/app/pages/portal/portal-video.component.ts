import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';
import {EnterpriseData} from '../../config/enterprise';

@Component({
    selector: 'portal-video',
    templateUrl: './portal-video.component.html',
    styles: [
        `.inner { width: 1200px; margin: 0 auto;}
        .video {padding: 0px 200px;
            background: #000;
            margin-bottom: 30px;}
        video {width: 100%;}`
    ]
})
export class PortalVideoComponent implements OnInit {

    enterprises1: any;
    enterprises2: any;

    constructor(private xn: XnService) {
    }

    ngOnInit() {
        // EnterpriseData.getEnterprise().subscribe(v => {
        //     console.log('enterprises: ', v);
        //     this.enterprises1 = v.slice(0, 10);
        // });
    }
}
