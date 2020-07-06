import {Component, OnInit, ElementRef} from '@angular/core';

@Component({
    templateUrl: './index.component.html',
    styles: []
})
export class IndexComponent implements OnInit {

    constructor(private er: ElementRef) {
    }

    ngOnInit() {
        this.er.nativeElement.ownerDocument.body.style.backgroundColor = '#ecf0f5';
    }
}
