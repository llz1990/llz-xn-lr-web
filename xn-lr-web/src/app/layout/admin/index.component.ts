import {Component, OnInit, ElementRef} from '@angular/core';
import {XnService} from '../../services/xn.service';

@Component({
    templateUrl: 'index.component.html'
})
export class IndexComponent implements OnInit {

    constructor(public xn: XnService, private er: ElementRef) {
    }

    ngOnInit() {
        this.er.nativeElement.ownerDocument.body.style.backgroundColor = '#ecf0f5';
    }
}
