import { forkJoin } from 'rxjs/observable/forkJoin';
import { XnUtils } from '../../../../common/xn-utils';
import { XnFormUtils } from '../../../../common/xn-form-utils';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ElementRef, ViewChild, Input, OnChanges } from '@angular/core';
import { XnService } from '../../../../services/xn.service';
import { ActivatedRoute } from '@angular/router';


declare const moment: any;

@Component({
    selector: 'app-risk-map-card2',
    templateUrl: './risk-map-card2.component.html',
    styles: [
        `.search {
            margin-bottom: 20px;
        }

        .showscore {
            opacity: 0
        }

        .list {
            float: left;
            width: 350px;
            text-align: left;
        }

        .innerbox {
            width: 1050px;
            margin: 0 auto;
        }

        .chartbox {
            float: left;
            width: 700px;
            height: 500px;
            margin: 0 auto;
        }`
    ]
})
export class RiskMapCard2Component implements OnInit, OnChanges {

    shows = [];
    mainForm: FormGroup;
    selectOption = [];
    datalist1 = [];
    json1 = {
        cardName: '',
        cardScore: '',
    };
    atCenter = false;


    @ViewChild('chart1') chart1: ElementRef;
    @Input() stockId: string;
    @Input() selectOptions: string;
    list = [];
    list1 = [];
    list2 = [];

    constructor(private xn: XnService, private route: ActivatedRoute) {
    }

    ngOnInit() {

    }

    buildShow(selectOptions) {
        // this.selectOption = this.buildOption(wind);
        console.log('selectOptions: ', selectOptions);
        this.shows = [{
            name: 'cardName',
            type: 'select',
            title: '选择类型',
            required: false,
            selectOptions: selectOptions,
        }];

        this.mainForm = XnFormUtils.buildFormGroup(this.shows);
        this.mainForm.valueChanges.subscribe((v) => {
            console.log('vSelect: ', v);
            console.log('vList: ', this.list);
            console.log('vList1: ', this.list1);
            console.log('vList2: ', this.list2);
            const data = this.list.filter(obj => obj.cardName === v.cardName)[0];
            const data1 = this.list1.filter(obj => obj.cardName === v.cardName)[0];
            const data2 = this.list2.filter(obj => obj.cardName === v.cardName)[0];
            console.log('vData: ', data);
            console.log('vData1: ', data1);
            if (XnUtils.isEmptyObject(data)) {
                this.json1 = {
                    cardName: '',
                    cardScore: '',
                };
                this.datalist1 = [];
                return;
            } else {
                this.json1 = data;
                // this.datalist1 = data.cardIndexScores || [];
                for (let i = 0; i < data.cardIndexScores.length; i++) {
                    console.log('llllist: ', data);
                    console.log('llllist: ', this.datalist1);
                    this.datalist1[i] = {
                        name: '',
                        score: '',
                        pre: '',
                        average: ''
                    }
                    this.datalist1[i]['name'] = data.cardIndexScores[i].cardIndexName;
                    this.datalist1[i]['score'] = data.cardIndexScores[i].cardIndexScore;
                    this.datalist1[i]['pre'] = data1.cardIndexScores[i].cardIndexScore;
                    this.datalist1[i]['average'] = data2.cardIndexScores[i].cardIndexScore;
                }
            }
            const option = this.optionCardScore(data, data1, data2);
            const chart = echarts.init(this.chart1.nativeElement);
            chart.setOption(option);
        });
    }

    ngOnChanges() {
        console.log('stock::: ', this.stockId);
        console.log('selectOptions::: ', this.selectOptions);
        // this.buildChart(this.stockId);
        // this.buildChart1(this.stockId);
        // if (this.stockId === '思贝克') {
            // return;
        // }
        this.buildShow(this.selectOptions);
        this.getData(this.stockId);
    }

    getData(stockId) {
        forkJoin(
            this.xn.api.post('/jzn/intelligence/card_score2', {
                stockId: stockId,
                type: 1
            }),
            this.xn.api.post('/jzn/intelligence/card_score2', {
                stockId: stockId,
                type: 2
            }),
            this.xn.api.post('/jzn/intelligence/card_score2', {
                stockId: stockId,
                type: 3
            })
        ).subscribe(([json1, json2, json3]) => {
            console.log('json11', json1);
            this.list = json1.data.list;
            this.list1 = json2.data.list;
            this.list2 = json3.data.list;
            console.log('json22', json2);
            console.log('json33', json3);
        });
    }

    // private buildChart(stockId) {
    //     this.xn.api.post('/jzn/intelligence/card_score2', {
    //         stockId: stockId,
    //         type: 3
    //     }).subscribe(json => {
    //         console.log('card_score2: ', json);
    //         this.list = json.data.list || [];

    //         // this.datalist1 = json.data.detail.map(v => {
    //         //     v.score = Number(v.score).toFixed(2);
    //         //     return v;
    //         // });
    //         // console.log('datalist1:', this.datalist1);

    //     });
    // }

    // private buildChart1(stockId) {
    //     this.xn.api.post('/jzn/intelligence/card_score2', {
    //         stockId: stockId,
    //         type: 1
    //     }).subscribe(json => {
    //         console.log('card_score2: ', json);
    //         this.list = [];
    //         this.list = json.data.list || [];
    //         this.buildChart2(stockId);
    //     });
    // }

    // private buildChart2(stockId) {
    //     this.xn.api.post('/jzn/intelligence/card_score2', {
    //         stockId: stockId,
    //         type: 3
    //     }).subscribe(json => {
    //         console.log('card_score2: ', json);
    //         // this.list = [];
    //         this.list1 = json.data.list || [];
    //         // console.log('list2: ', this.list);
    //     });
    // }

    private buildOption(datas) {
        return datas.map(data => {
            return {
                label: data.name,
                value: data.code
            };
        });
    }

    private optionCardScore(data, data1, data2) {
        console.log('cardScore111: ', data);
        console.log('cardScore222: ', data1);
        return {
            tooltip: {},
            legend: {
                data: ['当前得分明细', '上期得分明细', '行业平均得分明细']
            },
            radar: {
                indicator: this.buildIndicator(data.cardIndexScores)
            },
            series: [{
                name: '短期债务模型得分明细',
                type: 'radar',
                lineStyle: {
                    width: 1
                },
                emphasis: {
                    areaStyle: {
                        color: 'rgba(0,250,0,0.3)'
                    }
                },
                data: [
                    {
                        name: '当前得分明细',
                        type: 'radar',
                        radius: '55%',
                        center: ['50%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                            }
                        },
                        value: data.cardIndexScores.map(d => {
                            return Number(d.cardIndexScore).toFixed(2);
                        }),
                    },
                    {
                        name: '上期得分明细',
                        type: 'radar',
                        radius: '55%',
                        center: ['50%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                            }
                        },
                        value: data1.cardIndexScores.map(d => {
                            return Number(d.cardIndexScore).toFixed(2);
                        }),
                    },
                    {
                        name: '行业平均得分明细',
                        type: 'radar',
                        radius: '55%',
                        center: ['50%', '50%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{c}',
                            }
                        },
                        value: data2.cardIndexScores.map(d => {
                            return Number(d.cardIndexScore).toFixed(2);
                        }),
                    }
                ]
            }]
        };
    }

    private buildIndicator(detail) {
        if (!detail || detail.length < 0) {
            return;
        }
        return detail.map(c => {
            return {
                name: c.cardIndexName,
                max: 100
            };
        });
    }
}
