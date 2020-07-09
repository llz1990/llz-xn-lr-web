/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：RegisterCompany
 * @summary：平台注册公司
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          列表增加筛选项      2019-04-01
 * **********************************************************************
 */

import CommBase from '../public/component/comm-base';
import {XnService} from '../services/xn.service';
import {ActivatedRoute, Params} from '@angular/router';

export default class RegisterCompany {
    static readonly showName = '注册公司';

    static readonly showPage = true;
    static readonly canDo = true;
    static readonly apiUrlBase = '/app';
    static readonly apiUrlDetail = '/flow/main/detail'; // 详情api

    static readonly webUrlBase = '/console/data/register-company'; // 路由

    static readonly keys = ['mainFlowId'];  // 根据这个数组来匹配
    // constructor( private xn:XnService, private route: ActivatedRoute) {
    //     // this.xn=xn;
    //     // this.route=route;
    // }
    /**
     * 【重要】字段默认会在new/edit/detail/list出现
     * _inList/_inNew/_inDetail/_inEdit为false表示不在new/detail/edit里出现，为object表示追加属性
     */
    static readonly fields = [
        {
            title: '企业Id', checkerId: 'appId', memo: '',
            _inSearch: {
                number: 1
            },
            _inList: {
                sort: true,
                search: true
            },
            _inEdit: {
                options: {
                    readonly: true
                }
            }
        },
        {
            title: '企业名称', checkerId: 'appName', memo: '',
            _inSearch: {
                number: 2,
                type: 'listing'
            },
            _inList: {
                sort: true,
                search: true
            }
        },
        {
            title: '法人姓名', checkerId: 'orgLegalPerson', memo: '',
            _inSearch: {
                number: 3,
                type: 'listing'
            },
            _inList: {
                sort: true,
                search: true
            }
        },
        {
            title: '注册状态', checkerId: 'status', memo: '', type: 'xnRegisterStatusPipe',
            _inSearch: {
                number: 4,
                type: 'select',
                selectOptions: 'registerStatus',
                base: 'number'
            },
            _inList: {
                sort: false,
                search: false
            },
            _inNew: false
        },
        {
            title: '创建时间', checkerId: 'createTime', memo: '', type: 'date',
            _inSearch: false,
            _inList: {
                sort: true,
                search: false
            },
            _inNew: false
        }
    ];
    /**
     *  表头，行内按钮操作设置
     */
    static readonly list = {
        pageSize: 10,
        headButtons: [
            {
                title: '下载注册信息',
                type: 'a',
                class: 'btn btn-primary',
                customClick: true,

                can: (base: CommBase, record) => true,

                click: (xn: XnService, base: CommBase) => {
                    console.log('commbase=>', CommBase);
                    // 拼接文件名
                    const appId = xn.user.appId;
                    const orgName = xn.user.orgName;
                    const time = new Date().getTime();
                    const filename = appId + '-' + orgName + '-' + time + '.xlsx';

                    xn.api.download('/custom/common/app_list/down_app', {

                    }).subscribe((v: any) => {
                        xn.api.save(v._body, filename);
                    });
                }
            },
            {
                title: '查询',
                type: 'a',
                class: 'btn btn-primary',
                search: true,
                can: (base: CommBase, record) => false,

                click: (base: CommBase, record) => {
                }
            },
            {
                title: '重置',
                type: 'a',
                clearSearch: true,
                class: 'btn btn-danger',
                // 如果can未定义，则默认是能显示的
                can: (base: CommBase, record) => false,

                click: (base: CommBase, record) => {
                }
            },
        ],
        rowButtons: [
            {
                title: '查看详情',
                type: 'a',
                clearSearch: true,
                class: 'btn btn-danger',
                // 如果can未定义，则默认是能显示的
                can: (base: CommBase, record) => true,

                click: (base: CommBase, record,xn: XnService) => {
                    console.log('commbase=>', CommBase, 'record=>', record);
                    xn.router.navigate([`/console/data/register-company/${record.appId}`]);

                }
            },
        ],
    };
    static readonly detail = false;
    /**
     *  只要存在detail配置就允许查看详情
     */
    // static readonly detail = {
    //     onDetail: (base: CommBase, json) => {
    //         console.log('base=>', base, 'commbase=>', CommBase, 'json=>', json);
    //         base.onListDetail(json);
    //     },
    // };
}
