import {Component, OnInit} from '@angular/core';
import {XnService} from '../../services/xn.service';

@Component({
    templateUrl: './home.component.html',
    styles: []
})
export class HomeComponent implements OnInit {

    constructor(private xn: XnService) {
    }

    ngOnInit() {
    }

}
