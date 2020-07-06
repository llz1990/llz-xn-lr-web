/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：portal-union.component.ts
 * @summary：联盟企业
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          代码格式规范         2019-04-09
 * **********************************************************************
 */

import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {XnService} from '../../services/xn.service';
import {EnterpriseData} from '../../config/enterprise';
import {setTimeout} from 'core-js/library/web/timers';

declare const $: any;
declare var Swiper: any;

@Component({
    selector: 'portal-union',
    templateUrl: './portal-union.component.html',
    styleUrls: [
        './home.component.css',
        './portal-union.component.css'
    ],
})

export class PortalUnionComponent implements OnInit {

    public news: any;
    public items: any[] = [];
    private swiper: any;
    @ViewChild('swiperContainer') swiperContainer: ElementRef;

    constructor(private xn: XnService, private er: ElementRef) {
    }

    ngOnInit() {
        EnterpriseData.getEnterprise().subscribe(v => {
            this.items = $.extend(true, [], v); // 深拷贝
            setTimeout(() => {
                this.slickData();
            }, 0);
        });
    }

    /**
     * 轮播
     */
    private slickData() {
        this.swiper = new Swiper($('.swiper-container', this.er.nativeElement), {
            slidesPerView: 6,
            slidesPerColumn: 1,
            spaceBetween: 30,
            slidesPerGroup: 6,
            loop: true,
            speed: 4000,
            autoplay: {
                delay: 5000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
            },
            grabCursor: true,
            // loopFillGroupWithBlank: true,
            pagination: $('.swiper-pagination', this.er.nativeElement),
            paginationClickable: true,
            nextButton: $('.swiper-button-next', this.er.nativeElement),
            prevButton: $('.swiper-button-prev', this.er.nativeElement),
        });
    }

    /**
     *  停止播放
     */
    public stopPlay() {
        this.swiper.stopAutoplay();
    }

    /**
     *  开始播放
     */
    public goPlay() {
        this.swiper.startAutoplay();
    }
}
