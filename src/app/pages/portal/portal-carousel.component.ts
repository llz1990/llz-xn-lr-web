import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'portal-carousel',
    templateUrl: './portal-carousel.component.html',
    styles: [
        `.banner {background-position: center top; background-repeat: no-repeat; background-color: #999; height: 674px}`,
    ]
})
export class PortalCarouselComponent implements OnInit {

    items = [
        {url: 'assets/lr/img/banner-001.jpg', active: true},
    ];

    constructor() {
    }

    ngOnInit() {
    }

    getStyle(item) {
        return {
            'background-image': `url(${item.url})`
        };
    }
}
