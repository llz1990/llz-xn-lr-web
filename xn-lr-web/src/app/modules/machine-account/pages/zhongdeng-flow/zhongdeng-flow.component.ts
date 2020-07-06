import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { XnService } from '../../../../services/xn.service';
import { XnUtils } from '../../../../common/xn-utils';
import { ZhongdengComponent } from './zhongdeng.component';

@Component({
    templateUrl: './zhongdeng-flow.component.html',
    styles: [`
        .clearfix:after {
            content: '.';
            height: 0;
            display: block;
            clear: both;
        }
        .clearfix {
            zoom: 1;
        }
    `]
})
export class ZhongdengFlowComponent implements OnInit {
    mainForm: FormGroup;
    infos: any[] = [];

    flowTitle = '保理商中登登记';
    isGet = false;
    @ViewChild(ZhongdengComponent)
    private Zhongdeng: ZhongdengComponent;
    constructor(private xn: XnService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (XnUtils.isEmptyObject(params)) {
                return;
            }
            this.xn.dragon.post('/zhongdeng/zd/registerList', { mainIds: params.relateValue }).subscribe(json => {
                if (json.ret === 0) {
                    this.infos = json.data.zdList;
                    this.isGet = true;
                }
            });
        });
    }

    /**
     *  取消并返回
     */
    public onCancel() {
        this.Zhongdeng.returnBack();
    }

    /**
     * 点击完成跳转到列表页面
     */
    // public onFinish() {
    //     this.xn.router.navigate(['machine-account/zhongdeng-list']);
    // }
}