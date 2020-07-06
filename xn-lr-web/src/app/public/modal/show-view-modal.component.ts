/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：show-view-modal.component
 * @summary：查看文件,pdf，图片 缩放，查看
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan           修改            2019-03-27
 * **********************************************************************
 */

import {Component, ViewChild, ElementRef} from '@angular/core';
import {ModalComponent, ModalSize} from '../../common/modal/components/modal';
import {Observable} from 'rxjs/Observable';
import {XnUtils} from '../../common/xn-utils';
import {XnService} from '../../services/xn.service';
import {PdfViewService} from '../../services/pdf-view.service';

@Component({
    templateUrl: './show-view-modal.component.html',
    styles: [
            `.this-img {
            width: 60%;
            border: none;
            box-shadow: 8px 8px 15px #888888;
        }

        .pdf-container {
            width: 100%;
            min-height: 100%;
            border: 0;
            background: #E6E6E6;
        }

        .this-pdf {
            border: none;
            box-shadow: 8px 8px 15px #888888;
        }

        .img-container {
            width: 100%;
            min-height: 100%;
            background: #E6E6E6;
            border: 0;
            position: relative
        }

        .img-wrapper {
            transition: all 0.5s ease-in-out;
        }

        .button-group {
            padding: 20px 0 0 15px;
        }

        .display-content {
            height: calc(100vh - 280px);
            text-align: center;
            overflow-y: auto;
            background: #E6E6E6;
        }
        `,
    ],
    providers: [
        PdfViewService
    ]
})
export class ShowViewModalComponent {

    @ViewChild('modal') modal: ModalComponent;
    @ViewChild('innerImg') innerImg: ElementRef;
    @ViewChild('outerImg') outerImg: ElementRef;
    @ViewChild('imgContainer') imgContainer: ElementRef;

    private observer: any;
    public fileSrc: string;
    public fileType = '';
    // 默认文件显示角度
    public degree = 0;
    // 默认文件显示大小
    private currentScale: number = .6;
    // 需要平台，需要状态为审核机构创建， 且展示的位图片
    public showSaveBtn = false;

    constructor(private xn: XnService, private pdfViewService: PdfViewService) {
    }

    /**
     * 打开验证窗口
     * @param params
     * @returns {any}
     */

    open(params: any): Observable<any> {
        this.fileType = ((params && params.label || params).substr(-3).toLowerCase() === 'pdf') ? 'pdf' : 'img';
        this.showSaveBtn = this.xn.user.orgType === 99 && this.xn.user.status === 2 && this.fileType === 'img';
        if (this.fileType === 'img') {
            this.fileSrc = `${params.url}`;
        } else {
            setTimeout(() => {
                // 将pdf转成canvas
                let url = `${params.url}`;
                this.pdfViewService.pdfToCanvas(url);

            }, 0);
        }
        this.modal.open(ModalSize.XLarge);
        return Observable.create(observer => {
            this.observer = observer;
        });
    }

    public handleClose() {
        this.modal.close();
        this.observer.next({action: 'ok'});
        this.observer.complete();
    }

    /**
     *  文件旋转
     * @param direction 旋转方向 left:左转，right:右转
     */
    public rotateImg(direction: string) {
        if (this.innerImg && this.innerImg.nativeElement
            && this.outerImg && this.outerImg.nativeElement
            && this.imgContainer && this.imgContainer.nativeElement
        ) {
            this.degree = this.pdfViewService.rotateImg(direction, this.degree,
                this.innerImg.nativeElement, this.outerImg.nativeElement, this.imgContainer.nativeElement, this.currentScale);
        }
    }

    /**
     *  文件缩放
     * @param params 放大缩小  large:放大，small:缩小
     */
    public scaleImg(params: string) {
        if (this.innerImg && this.innerImg.nativeElement
            && this.outerImg && this.outerImg.nativeElement
            && this.imgContainer && this.imgContainer.nativeElement
        ) {
            this.currentScale = this.pdfViewService.scaleImg(params,
                this.innerImg.nativeElement, this.outerImg.nativeElement, this.imgContainer.nativeElement);
        }
    }

    /**
     *  保存选装后的图片
     */
    public handleSave() {
        if (this.degree === 0) {
            this.xn.msgBox.open(false, '请旋转后再保存图片。');
            return;
        }

        let key = XnUtils.parseUrl(this.fileSrc)['key'] || 0;
        this.xn.api.post('/attachment/image/rotate', {
            key: key,
            angle: this.degree
        }).subscribe(json => {
            this.xn.msgBox.open(false, '图片旋转保存成功。');
        });
    }
}
