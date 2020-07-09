import {Component, OnInit, ElementRef} from '@angular/core';
import {XnService} from '../../services/xn.service';

declare let $: any;

@Component({
    templateUrl: 'index.component.html',
    styles: [
        `.wrapper {background-color: #ffffff; min-height: 600px;}`
    ]
})
export class IndexComponent implements OnInit {

    constructor(private xn: XnService,
                private er: ElementRef) {
    }

    ngOnInit() {
        this.er.nativeElement.ownerDocument.body.style.backgroundColor = '#ffffff';
    }
}
