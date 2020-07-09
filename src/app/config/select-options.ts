import { isNullOrUndefined } from 'util';
import { XnUtils } from '../common/xn-utils';
import { XnService } from '../services/xn.service';
import { EnterpriseTypeOutputModel, SelectItemsModel } from './checkers';

/**
 * 前端全局的select options
 */
export class SelectOptions {
    public constructor(private xn: XnService) {
        //
    }

    private static configs = {
        defaultRadio: <SelectItemsModel[]>[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
        ],
        isBackFile: <SelectItemsModel[]>[
            { label: '是', value: 1 },
            { label: '否', value: 2 },
            { label: '无', value: 0 }
        ],

        defaultCheckbox: <SelectItemsModel[]>[
            { label: '是', value: 1 },
        ],

        orgType: <SelectItemsModel[]>[
            { label: '供应商', value: '1' },
            { label: '核心企业', value: '2' },
            { label: '保理商', value: '3' },
            { label: '下游采购商', value: '5' },
            { label: '金融机构', value: '4' },
            { label: '平台', value: '99' }
        ],

        industryClassify: <SelectItemsModel[]>[
            // { label: '金融机构', value: '1' },
            { label: '企业', value: '2' },
            { label: '机关事业单位', value: '3' },
            // { label: '个人', value: '4' },
            // { label: '个体工商户', value: '5' },
            // { label: '其他', value: '6' }
        ],

        pattern: <EnterpriseTypeOutputModel[]>[ // 模式配置，前端配置
            {
                label: '供应商', value: '1',
                data:
                    [
                        {
                            label: '两票一合同',
                            value: 'financing1',
                            checked: false
                        },
                        {
                            label: '标准保理',
                            value: 'financing3',
                            checked: false
                        }
                    ]
            },
            {
                label: '核心企业', value: '2',
                data:
                    [
                        {
                            label: '两票一合同',
                            value: 'financing1',
                            checked: false
                        },
                        {
                            label: '定向收款模式',
                            value: 'financing13',
                            checked: false
                        },
                        {
                            label: '万科模式',
                            value: 'financing6',
                            checked: false,
                            data: [
                                {
                                    label: '项目公司',
                                    value: 'financing6_3',
                                    checked: false,
                                },
                                {
                                    label: '集团公司',
                                    value: 'financing6_1',
                                    checked: false,
                                },
                            ],
                        },
                        {  // 金地abs
                            label: '金地模式',
                            value: 'financing14',
                            checked: false,
                            data: [
                                {
                                    label: '项目公司',
                                    value: 'financing14_3',
                                    checked: false,
                                },
                                {
                                    label: '集团公司',
                                    value: 'financing14_1',
                                    checked: false,
                                },
                            ],
                        },
                        {
                            label: '龙光模式',
                            value: 'financing52',
                            checked: false,
                            data: [
                                {
                                    label: '项目公司',
                                    value: 'financing52_3',
                                    checked: false,
                                },
                                {
                                    label: '集团公司',
                                    value: 'financing52_1',
                                    checked: false,
                                },
                            ],
                        },
                    ]
            },
            { label: '保理商', value: '3', data: [] },
            { label: '金融机构', value: '4', data: [] },
            {
                label: '下游采购商', value: '5',
                data:
                    [
                        {
                            label: '两票一合同',
                            value: 'financing1',
                            checked: false
                        },
                        {
                            label: '标准保理',
                            value: 'financing3',
                            checked: false
                        }
                    ]
            },
            { label: '平台', value: '99', data: [] }
        ],

        orgCodeType: <SelectItemsModel[]>[
            { label: '统一社会信用代码', value: '统一社会信用代码' },
            { label: '营业执照号', value: '营业执照号' },
        ],

        taxingType: <SelectItemsModel[]>[
            { label: '普通发票', value: 1 },
            { label: '增值税专用发票', value: 2 },
        ],

        cardType: <SelectItemsModel[]>[
            { label: '身份证', value: '身份证' },
            { label: '护照', value: '护照' }
        ],

        // 中国城市
        chinaCity: SelectOptions.buildProvinceCity(),

        // 行业分类
        orgIndustry: SelectOptions.buildOrgIndustry(),
        // 应收账款类型
        accountReceivable: SelectOptions.buildaccountsreceivable(),
        // 银行卡列表
        bankcard: [],
        certUserMode: <SelectItemsModel[]>[
            { label: '新用户', value: '新用户' },
            { label: '同系统管理员', value: '同系统管理员' },
        ],

        user1Mode: <SelectItemsModel[]>[
            { label: '新用户', value: '新用户' },
            { label: '同系统管理员', value: '同系统管理员' },
            { label: '同数字证书管理员', value: '同数字证书管理员' },
        ],

        user2Mode: <SelectItemsModel[]>[
            { label: '新用户', value: '新用户' },
            { label: '同系统管理员', value: '同系统管理员' },
            { label: '同数字证书管理员', value: '同数字证书管理员' },
            { label: '同经办人', value: '同经办人' },
        ],

        notifierMode: <SelectItemsModel[]>[
            { label: '新用户', value: '新用户' },
            { label: '同系统管理员', value: '同系统管理员' },
            { label: '同数字证书管理员', value: '同数字证书管理员' },
            { label: '同经办人', value: '同经办人' },
            { label: '同复核人', value: '同复核人' },
        ],
        recordStatus: <SelectItemsModel[]>[
            { label: '<span class="xn-record-status-1">草稿</span>', value: '0' },
            { label: '<span class="xn-record-status-1">进行中</span>', value: '1' },
            { label: '<span class="xn-record-status-2">已完结</span>', value: '2' },
            { label: '<span class="xn-record-status-3">已中止</span>', value: '3' }
        ],
        isInit: <SelectItemsModel[]>[
            { label: '未注册', value: '0' },
            { label: '已注册', value: '1' }
        ],

        resolveType: <SelectItemsModel[]>[
            { label: '提交甲方注册地有管辖权的人民法院以诉讼方式解决', value: '甲方法院' },
            { label: '提交乙方注册地有管辖权的人民法院以诉讼方式解决', value: '乙方法院' },
            { label: '提交甲方注册地深圳国际仲裁院（深圳仲裁委员会）', value: '甲方仲裁' },
            { label: '提交乙方注册地深圳国际仲裁院（深圳仲裁委员会）', value: '乙方仲裁' },
            { label: '其他', value: '其他' }
        ],

        regOrgType: <SelectItemsModel[]>[
            { label: '供应商', value: '1' },
            { label: '采购商（核心企业）', value: '2' },
            { label: '保理商', value: '3' },
        ],
        // 应收账款类型
        debtReceivableType: <SelectItemsModel[]>[
            { label: '商品', value: '商品' },
            { label: '服务', value: '服务' },
            { label: '出租资产', value: '出租资产' },
        ],
        payback: <SelectItemsModel[]>[
            { label: '还款异常', value: 1 },
            { label: '还款正常', value: 0 },
        ],

        contractFileType: <SelectItemsModel[]>[
            { label: '单个PDF文件', value: 'pdf' },
            { label: '图片文件（可以多张）', value: 'img' }
        ],

        rateType: <SelectItemsModel[]>[
            { label: '利息前置（发放融资款时一次扣收）', value: '利息前置' },
            { label: '利息后置（融资期间分次收取）', value: '利息后置' }
        ],

        platformCostType: <SelectItemsModel[]>[
            { label: '收取平台手续费', value: '是' },
            { label: '不收平台手续费', value: '否' }
        ],

        orgScale: <SelectItemsModel[]>[
            { label: '大型企业', value: '0' },
            { label: '中型企业', value: '1' },
            { label: '小型微型企业', value: '2' },
        ],

        type: <SelectItemsModel[]>[
            { label: '基础模式，有发票', value: 'A' },
            { label: '基础模式，无发票', value: 'B' },
            { label: '委托模式，有发票', value: 'C' },
            { label: '委托模式，无发票', value: 'D' },
            { label: '回购模式，有发票', value: 'E' },
            { label: '回购模式，无发票', value: 'F' },
        ],

        element: <SelectItemsModel[]>[
            { label: '齐全', value: '齐全' },
            { label: '少发票', value: '少发票' },
        ],

        complete: <SelectItemsModel[]>[
            { label: '是', value: '是' },
            { label: '否', value: '否' },
        ],

        invoice: <SelectItemsModel[]>[
            { label: '保理结束前', value: '保理结束前' },
            { label: '保理结束后', value: '保理结束后' },
        ],

        pledge: <SelectItemsModel[]>[
            { label: '已质押', value: '1' },
            { label: '未质押', value: '0' }
        ],
        // 平台所有模式
        proxyStatus: <SelectItemsModel[]>[
            { label: '基础模式', value: '0' },
            { label: '委托模式', value: '2' },
            { label: '回购模式', value: '1' },
            { label: '标准保理', value: '3' },
            { label: '房地产供应链标准保理', value: '6' },
            { label: '保理融资', value: '7' },
            { label: '定向收款-委托签约', value: '11' },
            { label: '定向收款-协议变更', value: '12' },
            { label: '定向收款-保理融资', value: '13' },
            { label: '标准保理-金地', value: '14' },
            { label: '采购融资', value: '50' },
            { label: '龙光模式', value: '52' },
            { label: '万科模式', value: '53' },
        ],
        projectTypeset: <SelectItemsModel[]>[
            { label: '保理融资', value: 1 },

        ],

        // 基础模式
        mainFlowStatus: <SelectItemsModel[]>[
            { label: '申请保理', value: '1' },
            { label: '平台处理申请资料', value: '2' },
            { label: '保理商审批并签署合同', value: '3' },
            { label: '申请企业确认并签署合同', value: '4' },
            { label: '保理商放款', value: '5' },
            { label: '申请企业回款处理', value: '6' },
            { label: '保理商收款登记', value: '7' },
            { label: '交易完成', value: '9' },
            { label: '终止', value: '8' },
        ],
        // 定向-变更协议状态
        direFlowChangeStatus: <SelectItemsModel[]>[
            { label: '供应商发起变更协议申请', value: '1' },
            { label: '保理商签署合同', value: '2' },
            { label: '银行处理申请', value: '3' },
            { label: '保理商上传变更后信息', value: '4' },
            { label: '交易完成', value: '5' },
            { label: '终止', value: '8' },
        ],
        // 定向-协议签约
        direAgreementSigningStatus: <SelectItemsModel[]>[
            { label: '供应商发起签约申请', value: '1' },
            { label: '平台签署合同', value: '2' },
            { label: '保理商签署合同', value: '3' },
            { label: '银行签约', value: '4' },
            { label: '保理商补录账户信息', value: '5' },
            { label: '交易完成', value: '6' },
            { label: '终止', value: '8' },
        ],
        // 定向-申请融资
        direApplyLoadStatus: <SelectItemsModel[]>[
            { label: '保理商提单', value: '1' },
            { label: '供应商发起融资申请', value: '2' },
            { label: '保理商审核资料', value: '3' },
            { label: '保理商放款', value: '4' },
            { label: '保理商确认回款', value: '5' },
            { label: '交易完成', value: '6' },
            { label: '终止', value: '8' },
        ],
        // 保证金
        depositMainFlowStatus: <SelectItemsModel[]>[
            { label: '核心企业支付保证金', value: '1' },
            { label: '保理商审核', value: '2' },
            { label: '交易完成', value: '3' },
        ],
        // 标准保理-万科 6
        standardFactoring: <SelectItemsModel[]>[
            { label: '保理商预录入', value: '1' },
            { label: '供应商上传资料并签署合同', value: '2' },
            { label: '保理商审核并签署合同', value: '3' },
            { label: '交易完成', value: '4' },
            { label: '终止', value: '8' }
        ],
        // 项目公司待补充资料
        additionalMaterials: <SelectItemsModel[]>[
            { label: '保理商预录入', value: '1' },
            { label: '供应商上传资料', value: '2' },
            { label: '保理商审核', value: '3' }
        ],
        // 交易状态
        capitalPoolTradeStatus: <SelectItemsModel[]>[
            { label: '保理商预录入', value: '1' },
            { label: '供应商上传资料', value: '2' },
            { label: '供应商签署合同', value: '4' },
            { label: '平台审核', value: '3' }
        ],
        // 新交易列表里面代还款 还款状态
        payStatus: <SelectItemsModel[]>[
            { label: '逾期', value: '1' },
            { label: '提醒', value: '2' },
        ],
        // 标准保理
        standardFactoring1: <SelectItemsModel[]>[
            { label: '申请保理', value: '1' },
            { label: '平台处理申请资料', value: '2' },
            { label: '保理商审批并签署合同', value: '3' },
            { label: '申请企业确认并签署合同', value: '4' },
            { label: '保理商签发放款确认书', value: '5' },
            { label: '申请企业确认放款确认书', value: '6' },
            { label: '保理商放款', value: '7' },
            { label: '交易完成', value: '9' },
            { label: '终止', value: '8' }
        ],
        // 老金地
        oldGemdaleStatus: <SelectItemsModel[]>[
            { label: '保理商和地产预录入', value: '1' },
            { label: '上传保理业务资料', value: '2' },
            { label: '平台处理申请资料', value: '3' },
            { label: '保理商审批并签署合同', value: '4' },
            { label: '申请方确认并签署合同', value: '5' },
            { label: '项目公司签署付款确认书', value: '6' },
            { label: '保理商签发放款确认书', value: '7' },
            { label: '申请方确认放款确认书', value: '9' },
            { label: '保理商放款', value: '10' },
            { label: '金地总部签署', value: '11' },
            { label: '城市公司签署通知书', value: '12' },
            { label: '交易完成', value: '13' },
            { label: '终止', value: '8' },
        ],
        // 采购融资万科供应商发起流程
        avengerSupplier: <SelectItemsModel[]>[
            { label: '供应商发起申请', value: '1' },
            { label: '上游客户上传资料', value: '2' },
            { label: '资料初审', value: '3' },
            { label: '风险审核', value: '4' },
            { label: '万科供应商签署合同', value: '5' },
            { label: '上游客户签署合同', value: '6' },
            { label: '待审批', value: '7' },
            { label: '审批中', value: '9' },
            { label: '保理商签署合同', value: '10' },
            { label: '待放款', value: '11' },
            { label: '已放款', value: '12' },
            { label: '已回款', value: '13' },
            { label: '终止', value: '8' },

        ],
        // 金地abs
        gemdaleflowStatus: <SelectItemsModel[]>[
            { label: '保理商预录入', value: '1' },
            { label: '供应商上传资料并签署合同', value: '2' },
            { label: '保理商审核', value: '3' },
            { label: '项目公司确认应收账款金额', value: '4' },
            // {label: '集团公司签署付款确认书', value: '5'},
            { label: '保理商签署合同', value: '6' },
            { label: '交易完成', value: '7' },
            { label: '终止', value: '8' },
        ],
        taxType: <SelectItemsModel[]>[
            { label: '增值税一般纳税人', value: '1' },
            { label: '增值税小规模纳税人', value: '2' }
        ],
        exportTable: <SelectItemsModel[]>[
            { label: '保理流程数据', value: 'factoryFlow' },
            { label: '商票数据', value: 'honour' },
            { label: '合同数据', value: 'contract' },
            { label: '发票数据', value: 'invoice' },
            { label: '注册客户数据', value: 'registerCustomer' },
        ],
        // 介绍公司与注册公司关系
        enterpriseRelationType: <SelectItemsModel[]>[
            { label: '上游（供货商）', value: '上游（供货商）' },
            { label: '下游（采购商）', value: '下游（采购商）' },
            { label: '父企业', value: '父企业' },
            { label: '子企业', value: '子企业' },
            { label: '关联企业', value: '关联企业' },
        ],
        // 总部公司 -vanke  雅居乐集团控股有限公司
        enterprise_dc: [
            {
                label: '万科企业股份有限公司', value: '万科', children: [
                    { label: '万科', value: '1' },
                    { label: '国寿', value: '2' },
                ]
            },
            { label: '雅居乐地产控股有限公司', value: '雅居乐地产控股有限公司' },
        ],
        // 总部公司 -dragon  深圳市龙光控股有限公司 万科企业股份有限公司
        enterprise_dragon: <SelectItemsModel[]>[
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' },
            { label: '万科企业股份有限公司', value: '万科企业股份有限公司' },
        ],
        // 总部公司（新万科，龙光）
        enterprise_dragon1: <SelectItemsModel[]>[
            { label: '万科企业股份有限公司', value: '万科' },
            { label: '雅居乐地产控股有限公司', value: '雅居乐地产控股有限公司' },
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' },
        ],
        // 总部公司（新万科，龙光）
        enterprise_dragon2: <SelectItemsModel[]>[
            { label: '万科企业股份有限公司', value: '万科企业股份有限公司' },
            // { label: '雅居乐集团控股有限公司', value: '雅居乐集团控股有限公司' },
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' },
        ],
        goodsname: <SelectItemsModel[]>[
            { label: '*金融服务*资产证券化转让价差', value: '*金融服务*资产证券化转让价差' }
        ],
        // 地产业务 -新万科 产品类型->渠道
        productType_vk: <SelectItemsModel[]>[
            { label: 'ABS', value: '1' },
            { label: '再保理', value: '2' },
            { label: '非标', value: '99' },
        ],
        productType_dw: <SelectItemsModel[]>[
            { label: 'ABS', value: '1', children: [] },
            {
                label: '再保理', value: '2', children: [
                    { label: '光大', value: '1' },
                    { label: '招行', value: '2' },
                    { label: '邮储', value: '3' },
                    { label: '农行', value: '4' },
                ]
            },
            { label: '非标', value: '99', children: [] },
        ],
        //新万科-拟入池项目来源
        productSource_vk: <SelectItemsModel[]>[
            { label: 'ABS', value: '1' },
            { label: '再保理', value: '2' },
            { label: '非标', value: '99' },
        ],
        fitProject: <SelectItemsModel[]>[
            { label: '通用', value: '通用' },
            { label: '国寿', value: '国寿' },
        ],
        intermediarySatus: <SelectItemsModel[]>[
            { label: '无效', value: 0 },
            { label: '未生效', value: 1 },
            { label: '已生效', value: 2 }
        ],
        intermediaryType: <SelectItemsModel[]>[
            { label: '律师事务所', value: '1' },
            { label: '会计师事务所', value: '2' },
            { label: '投资者', value: '3' },
            { label: '计划管理人', value: '4' },
            { label: '评级机构', value: '5' },
        ],
        // 总部公司 -金地
        enterprise_dc_gemdale: <SelectItemsModel[]>[
            { label: '金地（集团）股份有限公司', value: '金地（集团）股份有限公司' },
        ],
        // 总部公司（金地，万科映射关系）
        abs_headquarters: <SelectItemsModel[]>[
            { label: '万科企业股份有限公司', value: '万科' },
            { label: '金地（集团）股份有限公司', value: '金地（集团）股份有限公司' },
            { label: '雅居乐地产控股有限公司', value: '雅居乐地产控股有限公司' },
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' },

        ],
        business_type: <SelectItemsModel[]>[
            { label: '地产类业务', value: '地产类业务' },
        ],
        // 定向支付提单
        enterprise_hw: [
            { label: '华为', value: '华为' },
        ],
        contractType_jban: <SelectItemsModel[]>[
            { label: '工程', value: '工程' },
            { label: '贸易', value: '贸易' }
        ],
        // 经办人身份证件类型
        userCertType: <SelectItemsModel[]>[
            { label: '身份证', value: 'SF' },
        ],
        // 华为模式合同类型
        hwContractType: <SelectItemsModel[]>[
            { label: '商品', value: '商品' },
            { label: '服务', value: '服务' }
        ],
        // 生成账款回执
        accountReceipts: <SelectItemsModel[]>[
            { label: '有', value: 1 },
            { label: '无', value: 0 },
        ],
        // 付款确认书(龙光)
        accountReceiptsDragon: <SelectItemsModel[]>[
            { label: '已回传文件', value: 2 },
            { label: '已生成文件', value: 1 },
            { label: '末生成文件', value: 0 },
        ],
        // 生成账款回执/通知书(龙光)
        accountReceipts2Dragon: <SelectItemsModel[]>[
            { label: '已签署文件', value: 2 },
            { label: '已生成文件', value: 1 },
            { label: '末生成文件', value: 0 },
        ],
        // 推送企业次数
        pushCount: <SelectItemsModel[]>[
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '更多', value: 5 },
        ],
        // 定向保理-变更协议
        changeDeal: <SelectItemsModel[]>[
            { label: '账户利率', value: '账户利率' },
            { label: '收息账号', value: '收息账号' },
            { label: '账户户名', value: '账户户名' },
            { label: '收款方式', value: '收款方式' },
            { label: '收款要件', value: '收款要件' },
            { label: '付款要件', value: '付款要件' },
            { label: '划款方式', value: '划款方式' },
            { label: '定向收款账(卡)号', value: '定向收款账(卡)号' },
            { label: '定向付款账(卡)号', value: '定向付款账(卡)号' },
            { label: '其他', value: '其他' },

        ],
        // 委托付款通知管理-通知状态
        noticeStatus: <SelectItemsModel[]>[
            { label: '待下载', value: 0 },
            { label: '已下载', value: 1 }
        ],
        // 合同规则
        contractRules: <SelectItemsModel[]>[
            { label: '特殊', value: '特殊' },
            { label: '通用', value: '通用' }
        ],
        //一次转让合同管理 合同组状态
        contractStatus: <SelectItemsModel[]>[
            { label: '未生效', value: 1 },
            { label: '已生效', value: 2 }
        ],
        //一次转让合同管理 适用选项
        applyOptions: <SelectItemsModel[]>[
            { label: '通用', value: '通用' },
            { label: '非通用', value: '非通用' }
        ],
        //一次转让合同管理 适用项目
        projectOptions: <SelectItemsModel[]>[
            { label: '通用', value: '通用' },
            { label: '国寿财富', value: '国寿财富' }
        ],
        //一次转让合同管理 适用收款单位
        payeeOptions: <SelectItemsModel[]>[
            { label: '通用', value: '通用' },
            { label: '中建三局', value: '中建三局' }
        ],
        //一次转让合同管理 合同模板类型
        templateType: <SelectItemsModel[]>[
            { label: '主合同', value: 0 },
            { label: '普通合同', value: 1 },
            { label: '特殊合同', value: 2 }
        ],
        //一次转让合同管理 签署方
        signer: <SelectItemsModel[]>[
            { label: '总部公司', value: 0 },
            { label: '收款单位', value: 1 },
            { label: '项目公司', value: 2 },
            { label: '保理商', value: 3 },
        ],
        //一次转让合同管理 适用项目来源
        projectType: <SelectItemsModel[]>[
            // { label: '无', value: 0 },
            { label: 'ABS储架项目', value: 1 },
            { label: '再保理银行项目', value: 2 }
        ],
        // 一次转让合同-总部公司（新万科，龙光）
        enterprise_dragon3: <SelectItemsModel[]>[
            { label: '万科企业股份有限公司', value: '万科企业股份有限公司' },
            { label: '雅居乐集团控股有限公司', value: '雅居乐集团控股有限公司' },
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' },
            { label: '通用', value: '通用' },
        ],
        // 一次转让合同-总部公司（新万科，龙光）
        enterprise_dragon4: <SelectItemsModel[]>[
            { label: '万科企业股份有限公司', value: '万科企业股份有限公司' },
            { label: '雅居乐集团控股有限公司', value: '雅居乐集团控股有限公司' },
            { label: '深圳市龙光控股有限公司', value: '深圳市龙光控股有限公司' }
        ],
        // 二次转让合同-签署方式
        signMethod: <SelectItemsModel[]>[
            { label: '线上签署', value: '线上签署' },
            { label: '线下签署', value: '线下签署' }
        ],
        // 二次转让合同-生成逻辑
        generateLogic: <SelectItemsModel[]>[
            { label: '单笔单出', value: '单笔单出' },
            { label: '项目清单式', value: '项目清单式' },
            { label: '总部清单式', value: '总部清单式' }
        ],
        generateLogicNumber: <SelectItemsModel[]>[
            { label: '单笔单出', value: 0 },
            { label: '项目清单式', value: 1 },
            { label: '总部清单式', value: 2 }
        ],
        // 总部公司
        dcType: <SelectItemsModel[]>[
            { label: '万科地产', value: '4' },
            { label: '金地地产', value: '5' }
        ],

        // 资金渠道
        moneyChannel: <SelectItemsModel[]>[
            { label: '自有资金', value: 1 },
            { label: '过桥资金', value: 2 }
        ],
        // 出纳下载模板选择
        cashierDownTemplate: <SelectItemsModel[]>[
            { label: '工行模板', value: '1' },
            { label: '潍坊模板', value: '2' },
            { label: '浦发模板', value: '3' },
        ],

        // 资产池交易模式
        proxyType: <SelectItemsModel[]>[
            { label: '万科模式', value: 6 },
            { label: '金地模式', value: 14 },
            { label: '普惠通', value: 50 },
            { label: '签署协议流程', value: 51 },
            { label: '龙光模式', value: 52 },
            { label: '万科ABS', value: 53 },
        ],
        newproxyType: <SelectItemsModel[]>[
            { label: '万科模式', value: 6 },
            { label: '金地模式', value: 14 },
            { label: '万科ABS', value: 53 },
        ],
        // 代办处理步骤
        todoStep: <SelectItemsModel[]>[
            { label: '预录入', value: '预录入' },
            { label: '提交资料', value: '提交资料' },
            { label: '初审', value: '初审' },
            { label: '平台初审', value: '平台初审' },
            { label: '复核', value: '复核' },
            { label: '保理经办', value: '保理经办' },
            { label: '保理复核', value: '保理复核' },
        ],
        todoSteps: <SelectItemsModel[]>[
            { label: '提交资料', value: '提交资料' },
            { label: '初审', value: '初审' },
            { label: '复核', value: '复核' },
            { label: '保理经办', value: '保理经办' },
            { label: '保理复核', value: '保理复核' },
        ],
        todoCurrentSteps: <SelectItemsModel[]>[
            { label: '经办', value: '@begin' },
            { label: '初审', value: 'operate' },
            { label: '复核', value: 'review' },
            { label: '高级复核', value: 'windReview' },
            { label: '风险复核', value: 'riskReview' },
        ],
        readStatus: <SelectItemsModel[]>[
            { label: '<span class="xn-record-status-4">未读</span>', value: '0' },
            { label: '<span class="xn-record-status-2">已读</span>', value: '1' },
        ],
        // 合同控制企业类型
        orgNameType: <SelectItemsModel[]>[
            { label: '供应商', value: 1 },
            { label: '核心企业', value: 2 },
        ],
        bussStatus: <SelectItemsModel[]>[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
        ],
        // 费用情况
        freeType: <SelectItemsModel[]>[
            { label: '已收齐', value: 2 },
            { label: '未收齐', value: 1 },
        ],
        // 退款状态
        moneyback: <SelectItemsModel[]>[
            { label: '未退款', value: '1' },
            { label: '无需退款', value: '3' },
            { label: '已退款', value: '2' },
        ],
        // 审批放款中账号变更原因
        changeReason: <SelectItemsModel[]>[
            { label: '原收款账号为保理账户', value: 1 },
            { label: '户名名称不全', value: 2 },
            { label: '开户行名称有误', value: 3 },
            { label: '账号号码错误', value: 4 },
            { label: '总包委托付款', value: 5 },
        ],
        // 审批放款商票匹配
        fitResult: <SelectItemsModel[]>[
            { label: '未匹配', value: 0 },
            { label: '匹配成功', value: 1 },
            { label: '存在多笔交易', value: 2 },
        ],
        // 审批放款业务类型
        spIsProxy: <SelectItemsModel[]>[
            { label: '普惠通', value: 50 },
            { label: '万科模式', value: 6 },
            { label: '金地模式', value: 14 },
        ],

        // 采购融资列表业务类型
        spIsProxys: <SelectItemsModel[]>[
            { label: '普惠通', value: 50 },
            { label: '签署协议流程', value: 51 },
        ],

        contractDateStatus: <SelectItemsModel[]>[
            { label: '长期', value: '长期' },
            { label: '固定期限', value: '固定期限' },
        ],
        controlArea: <SelectItemsModel[]>[
            { label: '不限区域', value: '不限区域' },
            { label: '本地', value: '本地' },
            { label: '异地', value: '异地' },
        ],
        isUseQuota: <SelectItemsModel[]>[
            { label: '可贴现', value: 1 },
            { label: '不可贴现', value: 0 },
            { label: '已贴现', value: 2 },
        ],
        // 审核机构状态
        createStatus: <SelectItemsModel[]>[
            { label: '草稿', value: '0' },
            { label: '进行中', value: '1' },
            { label: '已完结', value: '2' },
            { label: '已中止', value: '3' }
        ],
        // 是否申请ca
        caApply: <SelectItemsModel[]>[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
        ],
        // 是否存在
        isExist: <SelectItemsModel[]>[
            { label: '是', value: '1' },
            { label: '否', value: '0' },
        ],
        // 储架
        storageRack: <SelectItemsModel[]>[
            { label: '中信证券-链融科技供应链金融2号第【X】期资产支持专项计划', value: 'wk-1', headquarters: '万科' },
            { label: '国信证券-链融科技供应链金融N号第【X】期资产支持专项计划', value: 'wk-2', headquarters: '万科' },
            { label: '华能信托-链融科技诚意1-3期供应链金融资产支持专项计划', value: 'wk-3', headquarters: '万科' },
            { label: '南方资本-链融科技【X】期供应链金融资产支持专项计划', value: 'wk-4', headquarters: '万科' },
            { label: '中信证券-链融科技供应链金融N号第【X】期资产支持专项计划', value: 'wk-5', headquarters: '万科' },
            { label: '国寿', value: 'wk-6', headquarters: '万科' },
            { label: '华金证券-链融科技雅居乐供应链1-18号资产支持专项计划', value: 'yjl-1', headquarters: '雅居乐地产控股有限公司' },
            { label: '国信证券-链融科技供应链金融第1-10期资产支持专项计划', value: 'jd-1', headquarters: '金地（集团）股份有限公司' },
            { label: 'longguang证券-链融科技供应链金融第1-10期资产支持专项计划', value: 'lg-1', headquarters: '深圳市龙光控股有限公司' },
        ],
        // 储架
        storageRackDragon: <SelectItemsModel[]>[
            { label: '长城荣耀-供应链金融1-15期资产支持专项计划', value: 'lg-2', headquarters: '深圳市龙光控股有限公司' },
            // { label: '中山光耀-链融科技1-24期资产支持专项计划', value: 'lg-3', headquarters: '深圳市龙光控股有限公司' },
        ],
        // 标准保理
        StandardFactoringMode: <SelectItemsModel[]>[
            {
                label: '标准保理（金地）', value: '14', children: [
                    { label: '保理商预录入', value: '1' },
                    { label: '供应商上传资料并签署合同', value: '2' },
                    { label: '保理商审核', value: '3' },
                    { label: '项目公司确认应收账款金额', value: '4' },
                    // {label: '集团公司签署付款确认书', value: '5'},
                    { label: '保理商签署合同', value: '5' },
                    { label: '交易完成', value: '6' },
                    { label: '终止', value: '8' },
                ]
            },
            {
                label: '房地产供应链标准保理', value: '6', children: [
                    { label: '保理商预录入', value: '1' },
                    { label: '供应商上传资料并签署合同', value: '2' },
                    { label: '保理商审核并签署合同', value: '3' },
                    { label: '交易完成', value: '4' },
                    { label: '终止', value: '8' }
                ]
            }
        ],
        // 新万科标准保理
        StandardFactoringMode_vk: <SelectItemsModel[]>[
            {
                label: '龙光模式', value: 52, children: [
                    { label: '交易未开始', value: 0 },
                    { label: '保理商预录入', value: 101 },
                    { label: '供应商上传资料', value: 102 },
                    { label: '平台审核', value: 103 },
                    { label: '供应商签署合同', value: 104 },
                    // { label: '待审批', value: 5 },
                    // { label: '审批中', value: 6 },
                    // { label: '保理商签署合同', value: 7 },
                    // { label: '待放款', value: 8 },
                    // { label: '已放款', value: 9 },
                    // { label: '已回款', value: 10 },
                    { label: '中止', value: 99 },
                ]
            },
            {
                //保理商预录入，供应商上传资料，平台审核，风险审查，供应商签署合同，待审批，审批中，保理商签署合同，待放款，已放款，已回款
                label: '万科模式', value: 53,
                children: [
                    { label: '交易未开始', value: 0 },
                    { label: '保理预录入', value: 201 },
                    { label: '供应商上传资料', value: 202 },
                    { label: '平台审核', value: 203 },
                    { label: '保理商风险审核', value: 204 },
                    { label: '供应商签署合同', value: 205 },
                    { label: '保理商回传合同', value: 206 },
                    { label: '中止', value: 99 },
                ]
            }
        ],
        // 开票管理交易状态
        invoiceTransactionStatus: <SelectItemsModel[]>[
            {
                label: '龙光模式', value: 52, children: [
                    { label: '待审批正常业务', value: 1 },
                    { label: '审批中', value: 2 },
                    { label: '待签署合同', value: 3 },
                    { label: '待放款', value: 4 },
                    { label: '已放款', value: 5 },
                    { label: '已回款', value: 6 },
                    { label: '待审批特殊业务', value: 10 },
                ]
            },
            {
                label: '万科模式', value: 53,
                children: [
                    { label: '待审批正常业务', value: 1 },
                    { label: '审批中', value: 2 },
                    { label: '待签署合同', value: 3 },
                    { label: '待放款', value: 4 },
                    { label: '已放款', value: 5 },
                    { label: '已回款', value: 6 },
                    { label: '待审批特殊业务', value: 10 },
                ]
            }
        ],
        //开票管理龙光模式
        dragonType: <SelectItemsModel[]>[
            { label: '交易未开始', value: 0 },
            { label: '保理商预录入', value: 101 },
            { label: '供应商上传资料', value: 102 },
            { label: '平台审核', value: 103 },
            { label: '供应商签署合同', value: 104 },
            // { label: '待审批', value: 5 },
            // { label: '审批中', value: 6 },
            // { label: '保理商签署合同', value: 7 },
            // { label: '待放款', value: 8 },
            // { label: '已放款', value: 9 },
            // { label: '已回款', value: 10 },
            { label: '中止', value: 99 },
        ],
        //开票管理-交易状态（审批放款）
        approvalLoanStatus: <SelectItemsModel[]>[
            { label: '待审批正常业务', value: 1 },
            { label: '审批中', value: 2 },
            { label: '待签署合同', value: 3 },
            { label: '待放款', value: 4 },
            { label: '已放款', value: 5 },
            { label: '已回款', value: 6 },
            { label: '待审批特殊业务', value: 10 },
        ],
        //新万科模式
        newVankeType: <SelectItemsModel[]>[
            { label: '交易未开始', value: 0 },
            { label: '保理预录入', value: 201 },
            { label: '供应商上传资料', value: 202 },
            { label: '平台审核', value: 203 },
            { label: '保理商风险审核', value: 204 },
            { label: '供应商签署合同', value: 205 },
            { label: '保理商回传合同', value: 206 },
            { label: '中止', value: 99 },
        ],

        currentStep: <SelectItemsModel[]>[
            { label: '待审批', value: 'wait_verification_500' },
            { label: '审批中', value: 'verificating_500' },
            { label: '保理商签署合同', value: 'factoring_sign_500' },
            { label: '待放款', value: 'wait_loan_500' },
            { label: '已放款', value: 'loaded_500' },
            { label: '已回款', value: 'repayment_500' },
            { label: '预保理商录入', value: 'dragon_financing_pre' },
            { label: '供应商上传资料', value: 'dragon_financing' },
            { label: '平台审核', value: 'dragon_platform_verify' },
            { label: '供应商签署合同', value: 'dragon_supplier_sign' },
            { label: '保理商预录入', value: 'vanke_financing_pre' },
            { label: '供应商上传资料', value: 'vanke_financing' },
            { label: '平台审核', value: 'vanke_platform_verify' },
            { label: '保理商风险审核', value: 'vanke_factoring_risk' },
            { label: '供应商签署合同', value: 'vanke_financing_sign' },
            { label: '保理商回传合同', value: 'vanke_factoring_passback' },

        ],
        // 开票管理列表-开票状态
        invoiceStatus_vk: <SelectItemsModel[]>[
            { label: '未开票', value: '1' },
            { label: '已开票', value: '2' },
            { label: '开票中', value: '3' },
            { label: '开票失败', value: '4' },
            { label: '作废中', value: '5' },
            { label: '作废', value: '6' },
        ],
        nuonuoStatus: <SelectItemsModel[]>[
            { label: '未开票', value: 0 },
            { label: '开票成功', value: 1 },
            { label: '开票失败', value: 2 },
            { label: '开票中', value: 3 },
            { label: '作废成功', value: 4 },
            { label: '作废失败', value: 5 },
            { label: '作废中', value: 6 },
        ],
        // 发票管理列表-发票状态-查询条件
        invoiceStatus: <SelectItemsModel[]>[
            { label: '人工验证', value: '1' },
            { label: '验证成功', value: '3' }
        ],
        // 项目管理-尽调状态 待定
        surveyStatus: <SelectItemsModel[]>[
            // { label: '无', value: 0 },
            // { label: '', value: 1 }
        ],
        // 项目管理-业务类型 新万科 查看文件合同类型
        vankeContracttype: <SelectItemsModel[]>[
            { label: '工程', value: '1' },
            { label: '贸易', value: '2' },
            { label: '设计', value: '3' },
            { label: '监理', value: '4' },
        ],
        // 注册审核状态
        registerStatus: <SelectItemsModel[]>[
            { label: '无效', value: 0 },
            { label: '申请', value: 1 },
            { label: '审核通过', value: 2 },
        ],
        // 雅居乐补充协议状态
        supplementaryAgreementStatus: <SelectItemsModel[]>[
            { label: '保理商未签署补充协议', value: 21 },
            { label: '保理商已签署、供应商未签署', value: 23 },
            { label: '供应商已签署补充协议', value: 24 }
        ],
        // 雅居乐重签列表，是否已重签
        yjlIsResignStatus: <SelectItemsModel[]>[
            { label: '是', value: 13 },
            { label: '否', value: [0, 1, 11, 12, 19, 21, 22, 23, 24, 29] }
        ],
        // 平台角色，客户管理万科供应商保理业务搜索项
        goMeetingQuestion: <SelectItemsModel[]>[
            { label: '非准入', value: 2 },
            { label: '准入', value: 1 },
            { label: '未过会', value: 0 }
        ],
        // 供應商類型
        companyType: <SelectItemsModel[]>[
            { label: '强供应商', value: 1 },
            { label: '普通供应商', value: 0 }
        ],
        // 付确信息比对结果
        CompareStatus: <SelectItemsModel[]>[
            { label: '人工匹配', value: 1 },
            { label: '未匹配', value: 0 },
            { label: 'ocr匹配', value: 2 }
        ],
        // 白名單類型
        whiteNameStatus: <SelectItemsModel[]>[
            { label: '人工白名单', value: 2 },
            { label: '非白名单', value: 0 },
            { label: '系统白名单', value: 1 }
        ],
        // 白名單類型（企业调整里面使用）
        whiteNameStatusForOrg: <SelectItemsModel[]>[
            { label: '人工白名单', value: 2 },
            { label: '非白名单', value: 0 },
        ],
        // 确权凭证
        evidence: <SelectItemsModel[]>[
            { label: '商票', value: 1 },
            { label: '付款确认书', value: 2 }
        ],
        // 还款方
        payBackPoint: <SelectItemsModel[]>[
            { label: '万科供应商', value: 1 },
            { label: '上游客户', value: 2 }
        ],
        // 缴付方
        payCompany: <SelectItemsModel[]>[
            { label: '万科供应商', value: 1 },
            { label: '上游客户', value: 2 }
        ],
        // 平台履约证明上传方
        platowner: <SelectItemsModel[]>[
            { label: '万科供应商', value: 1 },
            { label: '上游客户', value: 0 }
        ],
        // 保理类型
        FactoringOneType: <SelectItemsModel[]>[
            { label: '公开型保理', value: 1 },
            { label: '隐蔽型保理', value: 2 },
        ],
        FactoringTwoType: <SelectItemsModel[]>[
            { label: '有追索权保理', value: 1 },
            { label: '无追索权保理', value: 2 },
        ],
        Earlywarningstate: <SelectItemsModel[]>[
            { label: '预警', value: 1 },
            { label: '终止', value: 2 }
        ],

        // 自查结论
        CheckForm: <SelectItemsModel[]>[
            { label: '维持', value: '1' },
            { label: '待条件维持', value: '2' },
            { label: '退出', value: '3' }
        ],
        /** 台账履约证明状态 */
        EnumPerformanceStatus: <SelectItemsModel[]>[
            { label: '否', value: 0 },
            { label: '是', value: 2 },

        ],
        level_classification: <SelectItemsModel[]>[
            { label: '正常', value: '1' },
            { label: '关注', value: '2' },
            { label: '次级', value: '3' },
            { label: '损失', value: '4' },
        ],
        warning_result: <SelectItemsModel[]>[
            { label: '保持预警', value: '1' },
            { label: '取消预警', value: '2' },
        ],
        // 采购融资即万科供应商保理业务 todo 暂时，需要改动value值
        avengerTransactionStatus: <SelectItemsModel[]>[
            { label: '供应商发起融资', value: '1' },
            { label: '上游客户上传资料', value: '2' },
            { label: '资料审核', value: '3' },
            { label: '风险审核', value: '4' },
            { label: '供应商签署合同', value: '5' },
            { label: '上游客户签署合同', value: '6' },
            { label: '待审批', value: '7' },
            { label: '审批中', value: '8' },
            { label: '保理商签署合同', value: '9' },
            { label: '待放款', value: '10' },
            { label: '已放款', value: '11' },
            { label: '已回款', value: '12' },
        ],
        // 采购融资即万科供应商保理业务 todo 暂时，需要改动value值
        avengerTranactionSignStatus: <SelectItemsModel[]>[
            { label: '供应商签署合作协议', value: '1' },
            { label: '保理商上传线下协议', value: '2' },
            { label: '平台签署合同', value: '3' },
            { label: '已完成', value: '4' }
        ],
        approvalstatus: <SelectItemsModel[]>[
            { label: '同意', value: 1 },
            { label: '否决', value: 2 },
        ],
        // 已放款界面是否需要退款
        IsbackMoney: <SelectItemsModel[]>[
            { label: '是', value: 1 },
            { label: '否', value: 0 },
        ],
        approvalMethod: <SelectItemsModel[]>[
            { label: '金蝶云审批', value: 0 },
            { label: '线下人工', value: 1 },
        ],
        // 审批放款的业务类型
        taskType: <SelectItemsModel[]>[
            { label: '万科模式', value: 53 },
            { label: '普惠通模式', value: 50 },
            { label: '龙光模式', value: 52 }
        ],
        // 上传付款确认书匹配方式
        qrsMatchMethod: <SelectItemsModel[]>[
            { label: '没有匹配', value: 0 },
            { label: '人工匹配', value: 1 },
            { label: 'ocr匹配', value: 2 }
        ],

        moneyType: <SelectItemsModel[]>[
            {
                label: '商品类', value: '1', children: [
                    {
                        label: '土建材料', value: '1', children: [
                            { label: '涂料', value: '1' },
                            { label: '防水材料', value: '2' },
                            { label: '管材管建', value: '3' },
                            { label: '粘结剂', value: '4' },
                            { label: '锁具', value: '5' },
                            { label: '门窗工程', value: '6' },
                            { label: '保温工程', value: '7' },
                            { label: '栏杆工程', value: '8' },
                            { label: '屋面瓦', value: '9' },
                            { label: 'PC构件', value: '10' },
                            { label: '门窗/幕墙型材', value: '11' },
                            { label: '入户门', value: '12' },
                            { label: '填缝剂', value: '13' },
                        ],
                    },
                    {
                        label: '装饰材料', value: '2', children: [
                            { label: '洁具五金', value: '1' },
                            { label: '瓷砖', value: '2' },
                            { label: '室内灯具', value: '3' },
                            { label: '淋浴屏', value: '4' },
                            { label: '内外墙石材', value: '5' },
                            { label: '装修辅材', value: '6' },
                            { label: '集成吊顶', value: '7' },
                            { label: '木地板', value: '8' },
                            { label: '开关插座', value: '9' },
                            { label: '户内门', value: '10' },
                            { label: '壁纸', value: '11' },
                            { label: '软装', value: '12' },
                            { label: '整体卫浴', value: '13' },
                            { label: '外墙装饰', value: '14' },
                            { label: '台面石', value: '15' },
                            { label: '覆膜材料', value: '16' },
                            { label: '全屋柜体', value: '17' }]
                    },
                    {
                        label: '机械设备', value: '3', children: [
                            { label: '空调设备', value: '1' },
                            { label: '智能化设备', value: '2' },
                            { label: '阀门', value: '3' },
                            { label: '户内弱电箱', value: '4' },
                            { label: '立体车库', value: '5' },
                            { label: '消防设备', value: '6' },
                            { label: '发电机组', value: '7' },
                            { label: '对讲设备', value: '8' },
                            { label: '电梯', value: '9' },
                            { label: '电线电缆', value: '10' },
                            { label: '能源管理设备', value: '11' },
                            { label: '新风系统', value: '12' },
                            { label: '水泵', value: '13' },
                            { label: '变压器', value: '14' },
                            { label: '抵押配电', value: '15' },
                            { label: '智能水表', value: '16' },
                            { label: '智能电表', value: '17' },
                            { label: '充电桩', value: '18' },
                        ]
                    },
                    {
                        label: '电器', value: '4', children: [
                            { label: '热水器', value: '1' },
                            { label: '浴霸', value: '2' },
                            { label: '采暖炉', value: '3' },
                            { label: '厨房电器', value: '4' },
                            { label: '净水器', value: '5' },
                            { label: '家用电器', value: '6' },
                            { label: '散热器', value: '7' },
                            { label: '排气扇', value: '8' },
                        ]
                    },
                    {
                        label: '室外景观', value: '5', children: [
                            { label: '景观布品', value: '1' },
                            { label: '交通标识', value: '2' },
                            { label: '室外灯具', value: '3' },
                            { label: '游乐设施', value: '4' },
                            { label: '信报箱', value: '5' },
                            { label: '健身器材', value: '6' },
                        ]
                    },
                ]
            },
            {
                label: '服务类', value: '2', children: [
                    { label: '服务', value: '1', children: [{ label: '服务', value: '1' }] },
                ]
            },
            {
                label: '出租资产类', value: '3', children: [
                    { label: '出租资产', value: '1', children: [{ label: '出租资产', value: '1' }] },
                ]
            },
            {
                label: '工程类', value: '4', children: [
                    { label: '工程类', value: '1', children: [{ label: '工程类', value: '1' }] },
                ]
            },
            {
                label: '其他', value: '5', children: [
                    { label: '其他', value: '1', children: [{ label: '其他', value: '1' }] },
                ]
            },
        ],
        // 履约证明
        Certificateperformance: <SelectItemsModel[]>[
            { label: '订单', value: '1' },
            { label: '仓单', value: '2' },
            { label: '运单', value: '3' },
            { label: '验收单', value: '4' },
            { label: '其他', value: '5' },
        ],
        // 龙光 查看文件合同类型
        dragonContracttype: <SelectItemsModel[]>[
            { label: '工程', value: '1' },
            { label: '贸易', value: '2' },
            { label: '设计', value: '3' },
            { label: '监理', value: '4' },
        ],
        zhongdengStatus: <SelectItemsModel[]>[
            { label: '未登记', value: 0 },
            { label: '登记中', value: 1 },
            { label: '登记失败', value: 2 },
            { label: '登记完成', value: 3 },
        ],
        zhongdengSearchStatus: <SelectItemsModel[]>[
            { label: '登记中', value: 1 },
            { label: '登记失败', value: 2 },
            { label: '登记完成', value: 3 },
            { label: '撤销登记', value: 4 }
        ],
        zhongdengCompanyType: <SelectItemsModel[]>[
            // { label: '金融机构', value: 1 },
            { label: '企业', value: 2 },
            { label: '机关事业单位', value: 3 },
            // { label: '个人', value: 4 },
            // { label: '个体工商户', value: 5 },
            // { label: '其他', value: 6 }
        ],
        isLawOfficeCheck: <SelectItemsModel[]>[
            { label: '未抽查', value: 0 },
            { label: '已抽查', value: 1 },
        ],
        tradeStatus: <SelectItemsModel[]>[
            { label: '交易未开始', value: 0 },
            { label: '保理预录入', value: 101 },
            { label: '供应商上传资料', value: 102 },
            { label: '平台审核', value: 103 },
            { label: '供应商签署合同', value: 104 },
            { label: '中止', value: 99 },
        ],
        // 龙光 产品类型
        productType: <SelectItemsModel[]>[
            { label: 'ABS', value: '1' },
            { label: '再保理', value: '2' },
            // { label: '光大再保理', value: '2' },
            // { label: '农行再保理', value: '3' },
            // { label: '邮储再保理', value: '4' },
        ],
        // 台账万科产品类型
        vankeMachineproType: <SelectItemsModel[]>[
            { label: 'ABS', value: 1 },
            { label: '再保理', value: 2 },
            { label: '非标', value: 99 },
        ],

        // 银行卡列表---总行
        headBank: <SelectItemsModel[]>[
            { label: 'CIPS专用银行', value: 'CIPS专用银行' },
            { label: '（澳门地区）银行', value: '（澳门地区）银行' },
            { label: '（台湾省）银行', value: '（台湾省）银行' },
            { label: '（香港地区）银行', value: '（香港地区）银行' },
            { label: '鞍山市商业银行股份有限公司', value: '鞍山市商业银行股份有限公司' },
            { label: '安徽省农村信用联社资金清算中心', value: '安徽省农村信用联社资金清算中心' },
            { label: '奥地利中央合作银行', value: '奥地利中央合作银行' },
            { label: '澳大利亚澳洲联邦银行公众股份有限公司', value: '澳大利亚澳洲联邦银行公众股份有限公司' },
            { label: '澳大利亚和新西兰银行集团', value: '澳大利亚和新西兰银行集团' },
            { label: '澳大利亚西太平洋银行有限公司', value: '澳大利亚西太平洋银行有限公司' },
            { label: '包商银行', value: '包商银行' },
            { label: '保定银行', value: '保定银行' },
            { label: '北京农村商业银行', value: '北京农村商业银行' },
            { label: '北京银行', value: '北京银行' },
            { label: '本溪市商业银行', value: '本溪市商业银行' },
            { label: '比利时联合银行', value: '比利时联合银行' },
            { label: '渤海银行', value: '渤海银行' },
            { label: '财付通', value: '财付通' },
            { label: '财务公司', value: '财务公司' },
            { label: '沧州银行股份有限公司', value: '沧州银行股份有限公司' },
            { label: '长安银行股份有限公司', value: '长安银行股份有限公司' },
            { label: '长沙银行', value: '长沙银行' },
            { label: '长治市商业银行', value: '长治市商业银行' },
            { label: '朝阳银行股份有限公司', value: '朝阳银行股份有限公司' },
            { label: '城市商业银行', value: '城市商业银行' },
            { label: '城市商业银行资金清算中心', value: '城市商业银行资金清算中心' },
            { label: '城市信用社', value: '城市信用社' },
            { label: '成都农商银行', value: '成都农商银行' },
            { label: '成都市商业银行(成都银行)', value: '成都市商业银行(成都银行)' },
            { label: '承德银行股份有限公司', value: '承德银行股份有限公司' },
            { label: '创兴银行有限公司', value: '创兴银行有限公司' },
            { label: '村镇银行', value: '村镇银行' },
            { label: '达州市商业银行', value: '达州市商业银行' },
            { label: '大华银行（中国）有限公司', value: '大华银行（中国）有限公司' },
            { label: '大连农村商业银行股份有限公司', value: '大连农村商业银行股份有限公司' },
            { label: '大连银行', value: '大连银行' },
            { label: '大同市商业银行', value: '大同市商业银行' },
            { label: '大新银行（中国）有限公司', value: '大新银行（中国）有限公司' },
            { label: '丹东银行股份有限公司', value: '丹东银行股份有限公司' },
            { label: '德国北德意志州银行', value: '德国北德意志州银行' },
            { label: '德国商业银行', value: '德国商业银行' },
            { label: '德阳银行股份有限公司', value: '德阳银行股份有限公司' },
            { label: '德意志银行', value: '德意志银行' },
            { label: '德州银行', value: '德州银行' },
            { label: '第一商业银行股份有限公司', value: '第一商业银行股份有限公司' },
            { label: '电子商业汇票系统处理中心', value: '电子商业汇票系统处理中心' },
            { label: '东亚银行', value: '东亚银行' },
            { label: '东营银行股份有限公司', value: '东营银行股份有限公司' },
            { label: '东莞农村商业银行股份有限公司', value: '东莞农村商业银行股份有限公司' },
            { label: '东莞银行', value: '东莞银行' },
            { label: '鄂尔多斯银行股份有限公司', value: '鄂尔多斯银行股份有限公司' },
            { label: '法国巴黎银行（中国）', value: '法国巴黎银行（中国）' },
            { label: '法国东方汇理银行', value: '法国东方汇理银行' },
            { label: '法国外贸银行股份有限公司', value: '法国外贸银行股份有限公司' },
            { label: '法国兴业银行', value: '法国兴业银行' },
            { label: '福建省农村信用社联合社', value: '福建省农村信用社联合社' },
            { label: '福州市商业银行', value: '福州市商业银行' },
            { label: '抚顺银行股份有限公司', value: '抚顺银行股份有限公司' },
            { label: '阜新银行', value: '阜新银行' },
            { label: '富滇银行', value: '富滇银行' },
            { label: '甘肃银行股份有限公司', value: '甘肃银行股份有限公司' },
            { label: '赣州银行股份有限公司', value: '赣州银行股份有限公司' },
            { label: '公开市场业务操作室', value: '公开市场业务操作室' },
            { label: '广东发展银行', value: '广东发展银行' },
            { label: '广东华兴银行股份有限公司', value: '广东华兴银行股份有限公司' },
            { label: '广东南粤银行股份有限公司', value: '广东南粤银行股份有限公司' },
            { label: '广西北部湾银行', value: '广西北部湾银行' },
            { label: '广西壮族自治区农村信用社联合社', value: '广西壮族自治区农村信用社联合社' },
            { label: '广州农村商业银行股份有限公司', value: '广州农村商业银行股份有限公司' },
            { label: '广州银行', value: '广州银行' },
            { label: '桂林银行股份有限公司', value: '桂林银行股份有限公司' },
            { label: '贵阳市商业银行', value: '贵阳市商业银行' },
            { label: '贵州银行股份有限公司', value: '贵州银行股份有限公司' },
            { label: '国家金库', value: '国家金库' },
            { label: '国家开发银行', value: '国家开发银行' },
            { label: '国民银行（中国）有限公司', value: '国民银行（中国）有限公司' },
            { label: '哈尔滨银行', value: '哈尔滨银行' },
            { label: '哈密市商业银行', value: '哈密市商业银行' },
            { label: '海南省农村信用社联合社资金清算中心', value: '海南省农村信用社联合社资金清算中心' },
            { label: '邯郸银行股份有限公司', value: '邯郸银行股份有限公司' },
            { label: '韩国产业银行', value: '韩国产业银行' },
            { label: '韩国大邱银行股份有限公司', value: '韩国大邱银行股份有限公司' },
            { label: '韩国友利银行', value: '韩国友利银行' },
            { label: '韩国中小企业银行', value: '韩国中小企业银行' },
            { label: '韩亚银行(中国)有限公司', value: '韩亚银行(中国)有限公司' },
            { label: '汉口银行', value: '汉口银行' },
            { label: '杭州银行股份有限公司', value: '杭州银行股份有限公司' },
            { label: '荷兰合作银行有限公司', value: '荷兰合作银行有限公司' },
            { label: '荷兰商业银行', value: '荷兰商业银行' },
            { label: '合肥科技农村商业银行', value: '合肥科技农村商业银行' },
            { label: '河北省农村信用社联合社', value: '河北省农村信用社联合社' },
            { label: '河北银行股份有限公司', value: '河北银行股份有限公司' },
            { label: '河南省农村信用社', value: '河南省农村信用社' },
            { label: '衡水市商业银行', value: '衡水市商业银行' },
            { label: '恒丰银行', value: '恒丰银行' },
            { label: '恒生银行', value: '恒生银行' },
            { label: '葫芦岛银行股份有限公司', value: '葫芦岛银行股份有限公司' },
            { label: '湖北省农村信用社联合社结算中心', value: '湖北省农村信用社联合社结算中心' },
            { label: '湖北银行股份有限公司', value: '湖北银行股份有限公司' },
            { label: '湖南省农村信用社联合社', value: '湖南省农村信用社联合社' },
            { label: '湖州银行股份有限公司', value: '湖州银行股份有限公司' },
            { label: '华美银行', value: '华美银行' },
            { label: '华南商业银行', value: '华南商业银行' },
            { label: '华融湘江银行', value: '华融湘江银行' },
            { label: '华商银行', value: '华商银行' },
            { label: '华夏银行', value: '华夏银行' },
            { label: '华一银行', value: '华一银行' },
            { label: '徽商银行', value: '徽商银行' },
            { label: '吉林省农村信用社联合社', value: '吉林省农村信用社联合社' },
            { label: '吉林银行股份有限公司', value: '吉林银行股份有限公司' },
            { label: '集友银行', value: '集友银行' },
            { label: '济宁银行股份有限公司', value: '济宁银行股份有限公司' },
            { label: '嘉兴银行股份有限公司', value: '嘉兴银行股份有限公司' },
            { label: '加拿大丰业银行', value: '加拿大丰业银行' },
            { label: '加拿大蒙特利尔银行', value: '加拿大蒙特利尔银行' },
            { label: '江苏常熟农村商业银行股份有限公司', value: '江苏常熟农村商业银行股份有限公司' },
            { label: '江苏江阴农村商业银行股份有限公司', value: '江苏江阴农村商业银行股份有限公司' },
            { label: '江苏省农村信用社联合社信息结算中心', value: '江苏省农村信用社联合社信息结算中心' },
            { label: '江苏泰州农村商业银行股份有限公司', value: '江苏泰州农村商业银行股份有限公司' },
            { label: '江苏银行股份有限公司', value: '江苏银行股份有限公司' },
            { label: '江苏紫金农村商业银行股份有限公司', value: '江苏紫金农村商业银行股份有限公司' },
            { label: '江西省农村信用社联合社', value: '江西省农村信用社联合社' },
            { label: '江西银行股份有限公司', value: '江西银行股份有限公司' },
            { label: '焦作市商业银行', value: '焦作市商业银行' },
            { label: '交通银行', value: '交通银行' },
            { label: '金华银行股份有限公司', value: '金华银行股份有限公司' },
            { label: '锦州银行股份有限公司', value: '锦州银行股份有限公司' },
            { label: '晋城银行股份有限公司', value: '晋城银行股份有限公司' },
            { label: '晋商银行股份有限公司', value: '晋商银行股份有限公司' },
            { label: '晋中市商业银行', value: '晋中市商业银行' },
            { label: '九江银行股份有限公司', value: '九江银行股份有限公司' },
            { label: '库尔勒市商业银行', value: '库尔勒市商业银行' },
            { label: '昆仑银行股份有限公司', value: '昆仑银行股份有限公司' },
            { label: '昆山农村商业银行', value: '昆山农村商业银行' },
            { label: '莱商银行股份有限公司', value: '莱商银行股份有限公司' },
            { label: '兰州银行', value: '兰州银行' },
            { label: '廊坊银行股份有限公司', value: '廊坊银行股份有限公司' },
            { label: '乐山市商业银行', value: '乐山市商业银行' },
            { label: '联昌国际银行', value: '联昌国际银行' },
            { label: '辽阳银行股份有限公司', value: '辽阳银行股份有限公司' },
            { label: '临商银行', value: '临商银行' },
            { label: '柳州银行股份有限公司', value: '柳州银行股份有限公司' },
            { label: '龙江银行股份有限公司', value: '龙江银行股份有限公司' },
            { label: '洛阳市商业银行(洛阳银行)', value: '洛阳市商业银行(洛阳银行)' },
            { label: '马来西亚马来亚银行有限公司', value: '马来西亚马来亚银行有限公司' },
            { label: '美国花旗银行', value: '美国花旗银行' },
            { label: '美国建东银行', value: '美国建东银行' },
            { label: '美国摩根大通银行', value: '美国摩根大通银行' },
            { label: '美国银行', value: '美国银行' },
            { label: '绵阳市商业银行', value: '绵阳市商业银行' },
            { label: '摩根士丹利国际银行（中国）有限公司', value: '摩根士丹利国际银行（中国）有限公司' },
            { label: '南充市商业银行', value: '南充市商业银行' },
            { label: '南京银行股份有限公司', value: '南京银行股份有限公司' },
            { label: '南洋商业银行', value: '南洋商业银行' },
            { label: '内蒙古银行股份有限公司', value: '内蒙古银行股份有限公司' },
            { label: '宁波东海银行股份有限公司', value: '宁波东海银行股份有限公司' },
            { label: '宁波通商银行股份有限公司', value: '宁波通商银行股份有限公司' },
            { label: '宁波银行股份有限公司', value: '宁波银行股份有限公司' },
            { label: '宁波鄞州农村合作银行', value: '宁波鄞州农村合作银行' },
            { label: '宁夏黄河农村商业银行股份有限公司', value: '宁夏黄河农村商业银行股份有限公司' },
            { label: '宁夏银行', value: '宁夏银行' },
            { label: '农村合作银行', value: '农村合作银行' },
            { label: '农村商业银行', value: '农村商业银行' },
            { label: '农村信用联社', value: '农村信用联社' },
            { label: '攀枝花市商业银行', value: '攀枝花市商业银行' },
            { label: '盘锦市商业银行', value: '盘锦市商业银行' },
            { label: '平安银行', value: '平安银行' },
            { label: '平顶山银行股份有限公司', value: '平顶山银行股份有限公司' },
            { label: '浦发硅谷银行', value: '浦发硅谷银行' },
            { label: '其它实体银行', value: '其它实体银行' },
            { label: '齐鲁银行', value: '齐鲁银行' },
            { label: '齐商银行', value: '齐商银行' },
            { label: '秦皇岛市商业银行', value: '秦皇岛市商业银行' },
            { label: '青岛银行', value: '青岛银行' },
            { label: '青海银行股份有限公司', value: '青海银行股份有限公司' },
            { label: '曲靖市商业银行', value: '曲靖市商业银行' },
            { label: '泉州市商业银行股份有限公司', value: '泉州市商业银行股份有限公司' },
            { label: '日本瑞穗实业银行', value: '日本瑞穗实业银行' },
            { label: '日本三井住友银行', value: '日本三井住友银行' },
            { label: '日本三菱东京日联银行', value: '日本三菱东京日联银行' },
            { label: '日本山口银行', value: '日本山口银行' },
            { label: '日照银行股份有限公司', value: '日照银行股份有限公司' },
            { label: '瑞典北欧斯安银行', value: '瑞典北欧斯安银行' },
            { label: '瑞典商业银行', value: '瑞典商业银行' },
            { label: '瑞士信贷银行', value: '瑞士信贷银行' },
            { label: '瑞士银行（中国）有限公司', value: '瑞士银行（中国）有限公司' },
            { label: '山东省农村信用社联合社', value: '山东省农村信用社联合社' },
            { label: '上海华瑞银行股份有限公司', value: '上海华瑞银行股份有限公司' },
            { label: '上海农村商业银行', value: '上海农村商业银行' },
            { label: '上海浦东发展银行', value: '上海浦东发展银行' },
            { label: '上海银行股份有限公司', value: '上海银行股份有限公司' },
            { label: '上饶银行', value: '上饶银行' },
            { label: '绍兴银行股份有限公司', value: '绍兴银行股份有限公司' },
            { label: '深圳农村商业银行', value: '深圳农村商业银行' },
            { label: '深圳前海微众银行', value: '深圳前海微众银行' },
            { label: '盛京银行股份有限公司', value: '盛京银行股份有限公司' },
            { label: '石嘴山银行股份有限公司', value: '石嘴山银行股份有限公司' },
            { label: '首都银行', value: '首都银行' },
            { label: '苏州银行股份有限公司', value: '苏州银行股份有限公司' },
            { label: '遂宁市商业银行', value: '遂宁市商业银行' },
            { label: '台湾土地银行股份有限公司', value: '台湾土地银行股份有限公司' },
            { label: '台湾银行股份有限公司', value: '台湾银行股份有限公司' },
            { label: '台州银行股份有限公司', value: '台州银行股份有限公司' },
            { label: '泰安市商业银行', value: '泰安市商业银行' },
            { label: '泰国盘谷银行(大众有限公司)', value: '泰国盘谷银行(大众有限公司)' },
            { label: '唐山市商业银行', value: '唐山市商业银行' },
            { label: '天津滨海农村商业银行股份有限公司', value: '天津滨海农村商业银行股份有限公司' },
            { label: '天津金城银行股份有限公司', value: '天津金城银行股份有限公司' },
            { label: '天津农村商业银行股份有限公司', value: '天津农村商业银行股份有限公司' },
            { label: '天津银行', value: '天津银行' },
            { label: '铁岭银行股份有限公司', value: '铁岭银行股份有限公司' },
            { label: '网联清算有限公司', value: '网联清算有限公司' },
            { label: '威海市商业银行', value: '威海市商业银行' },
            { label: '微信支付', value: '微信支付' },
            { label: '潍坊银行股份有限公司', value: '潍坊银行股份有限公司' },
            { label: '温州民商银行股份有限公司', value: '温州民商银行股份有限公司' },
            { label: '温州银行', value: '温州银行' },
            { label: '乌海银行股份有限公司', value: '乌海银行股份有限公司' },
            { label: '乌鲁木齐市商业银行', value: '乌鲁木齐市商业银行' },
            { label: '无锡农村商业银行', value: '无锡农村商业银行' },
            { label: '吴江农村商业银行', value: '吴江农村商业银行' },
            { label: '武汉众邦银行', value: '武汉众邦银行' },
            { label: '西安市商业银行', value: '西安市商业银行' },
            { label: '西藏银行股份有限公司', value: '西藏银行股份有限公司' },
            { label: '厦门国际银行', value: '厦门国际银行' },
            { label: '厦门银行股份有限公司', value: '厦门银行股份有限公司' },
            { label: '香港上海汇丰银行', value: '香港上海汇丰银行' },
            { label: '新韩银行（中国）有限公司', value: '新韩银行（中国）有限公司' },
            { label: '新加坡星展银行', value: '新加坡星展银行' },
            { label: '新疆汇和银行股份有限公司', value: '新疆汇和银行股份有限公司' },
            { label: '新疆维吾尔自治区农村信用社联合社', value: '新疆维吾尔自治区农村信用社联合社' },
            { label: '新联商业银行', value: '新联商业银行' },
            { label: '星展银行(中国)有限公司', value: '星展银行(中国)有限公司' },
            { label: '兴业银行', value: '兴业银行' },
            { label: '邢台银行股份有限公司', value: '邢台银行股份有限公司' },
            { label: '虚拟银行', value: '虚拟银行' },
            { label: '雅安市商业银行', value: '雅安市商业银行' },
            { label: '阳泉市商业银行', value: '阳泉市商业银行' },
            { label: '宜宾市商业银行', value: '宜宾市商业银行' },
            { label: '意大利联合圣保罗银行股份有限公司', value: '意大利联合圣保罗银行股份有限公司' },
            { label: '银行电子结算中心', value: '银行电子结算中心' },
            { label: '银行间市场清算所', value: '银行间市场清算所' },
            { label: '印度尼西亚曼底利银行有限责任公司', value: '印度尼西亚曼底利银行有限责任公司' },
            { label: '营口沿海银行股份有限公司', value: '营口沿海银行股份有限公司' },
            { label: '营口银行股份有限公司', value: '营口银行股份有限公司' },
            { label: '永亨银行', value: '永亨银行' },
            { label: '玉山银行（中国）有限公司', value: '玉山银行（中国）有限公司' },
            { label: '玉溪市商业银行', value: '玉溪市商业银行' },
            { label: '云南省农村信用社联合社', value: '云南省农村信用社联合社' },
            { label: '枣庄市商业银行', value: '枣庄市商业银行' },
            { label: '渣打银行', value: '渣打银行' },
            { label: '彰化商业银行股份有限公司', value: '彰化商业银行股份有限公司' },
            { label: '张家港农村商业银行', value: '张家港农村商业银行' },
            { label: '张家口市商业银行', value: '张家口市商业银行' },
            { label: '招商银行', value: '招商银行' },
            { label: '兆丰国际商业银行股份有限公司', value: '兆丰国际商业银行股份有限公司' },
            { label: '浙江稠州商业银行', value: '浙江稠州商业银行' },
            { label: '浙江民泰商业银行', value: '浙江民泰商业银行' },
            { label: '浙江农村商业银行', value: '浙江农村商业银行' },
            { label: '浙江泰隆商业银行', value: '浙江泰隆商业银行' },
            { label: '浙江网商银行股份有限公司', value: '浙江网商银行股份有限公司' },
            { label: '浙商银行', value: '浙商银行' },
            { label: '郑州银行股份有限公司', value: '郑州银行股份有限公司' },
            { label: '支付宝', value: '支付宝' },
            { label: '支付业务收费专户', value: '支付业务收费专户' },
            { label: '中德住房储蓄银行', value: '中德住房储蓄银行' },
            { label: '中国工商银行', value: '中国工商银行' },
            { label: '中国光大银行', value: '中国光大银行' },
            { label: '中国建设银行', value: '中国建设银行' },
            { label: '中国进出口银行', value: '中国进出口银行' },
            { label: '中国民生银行', value: '中国民生银行' },
            { label: '中国农业发展银行', value: '中国农业发展银行' },
            { label: '中国农业银行', value: '中国农业银行' },
            { label: '中国人民银行', value: '中国人民银行' },
            { label: '中国外汇交易中心', value: '中国外汇交易中心' },
            { label: '中国信托商业银行股份有限公司', value: '中国信托商业银行股份有限公司' },
            { label: '中国银联股份有限公司', value: '中国银联股份有限公司' },
            { label: '中国银行', value: '中国银行' },
            { label: '中国邮政储蓄银行有限责任公司', value: '中国邮政储蓄银行有限责任公司' },
            { label: '中信银行', value: '中信银行' },
            { label: '中信银行国际（中国）有限公司', value: '中信银行国际（中国）有限公司' },
            { label: '中央结算公司', value: '中央结算公司' },
            { label: '中原银行', value: '中原银行' },
            { label: '重庆农村商业银行股份有限公司', value: '重庆农村商业银行股份有限公司' },
            { label: '重庆三峡银行股份有限公司', value: '重庆三峡银行股份有限公司' },
            { label: '重庆银行', value: '重庆银行' },
            { label: '珠海华润银行股份有限公司', value: '珠海华润银行股份有限公司' },
            { label: '自贡市商业银行', value: '自贡市商业银行' },
            { label: '遵义市商业银行', value: '遵义市商业银行' },
            { label: '泸州市商业银行', value: '泸州市商业银行' }
        ],

        registerType: <SelectItemsModel[]>[
            { label: 'AR-应收账款', value: 1 },
            { label: 'LR-融资租赁', value: 2 },
            { label: 'BZ-保证金质押', value: 3 },
            { label: 'CH-存货\\仓单质押', value: 4 },
            { label: 'SY-所有权保留', value: 5 },
            { label: 'LZ-动产留置权', value: 6 },
            { label: 'XT-信托登记', value: 7 }
        ],

        registerDays: <SelectItemsModel[]>[
            { label: '6个月', value: 6 },
            { label: '12个月', value: 12 },
            { label: '18个月', value: 18 },
            { label: '24个月', value: 24 }
        ],
        // 新增中介账号
        addIntermediary: <SelectItemsModel[]>[
            { label: '律师事务所', value: 6 },
            { label: '会计师事务所', value: 12 },
            { label: '投资者', value: 18 },
            { label: '管理员', value: 24 },
            { label: '评级机构', value: 24 }
        ],
        vankeAddIntermediary: <SelectItemsModel[]>[
            { label: '无', value: 0 },
            { label: '律师事务所', value: 1 },
            { label: '会计师事务所', value: 2 },
            { label: '投资者', value: 3 },
            { label: '计划管理人', value: 4 },
            { label: '评级机构', value: 5 }
        ],
        // 冻结状态
        freezeStatus: <SelectItemsModel[]>[
            { label: '非冻结', value: 0 },
            { label: '冻结', value: 1 },
        ],
        // 项目管理-冻结状态0表示未冻结 1表示已冻结
        freezingStatus: <SelectItemsModel[]>[
            { label: '未冻结', value: 0 },
            { label: '已冻结', value: 1 }
        ],
        freezing: <SelectItemsModel[]>[
            { label: '未冻结', value: 0 },
            { label: '冻结一', value: 1 },
            { label: '冻结二', value: 2 },
            { label: '冻结三', value: 3 },
        ],
        operateType: <SelectItemsModel[]>[
            { label: '移入', value: 1 },
            { label: '移出', value: 2 }
        ],
        // 台账补充协议流程状态
        supplementaryAgreement: <SelectItemsModel[]>[
            { label: '无', value: 0 },
            { label: '供应商签署补充协议', value: 3 },
            { label: '项目公司签署补充协议', value: 4 },
            { label: '保理商签署补充协议', value: 5 },
        ],
        machineAccountType: <SelectItemsModel[]>[
            { label: '全部', value: -1, children: [] },
            {
                label: '金地模式', value: 14,
                children: [
                    // { label: '保理商预录入', value: '1' },
                    // { label: '供应商上传资料并签署合同', value: '2' },
                    // { label: '保理商审核', value: '3' },
                    // { label: '项目公司确认应收账款金额', value: '4' },
                    // // {label: '集团公司签署付款确认书', value: '5'},
                    // { label: '保理商签署合同', value: '6' },
                    // { label: '交易完成', value: '7' },
                    // { label: '终止', value: '8' },
                ]
            },
            {
                label: '万科模式(新)', value: 53,
                children: [
                    { label: '保理预录入', value: 'vanke_financing_pre' },
                    { label: '供应商上传资料', value: 'vanke_financing' },
                    { label: '平台审核', value: 'vanke_platform_verify' },
                    { label: '保理商风险审核', value: 'vanke_factoring_risk' },
                    { label: '供应商签署合同', value: 'vanke_financing_sign' },
                    { label: '保理商回传合同', value: 'vanke_factoring_passback' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                    // { label: '中止', value: 99 },
                    // { label: '退单', value: 100 },
                ]
            },
            {
                label: '万科模式(旧)', value: 6,
                children: [
                    // { label: '保理商预录入', value: '1' },
                    // { label: '供应商上传资料并签署合同', value: '2' },
                    // { label: '保理商审核并签署合同', value: '3' },
                    // { label: '交易完成', value: '4' },
                    // { label: '终止', value: '8' },
                ]
            },
            {
                label: '龙光模式', value: 52, children: [
                    { label: '保理商预录入', value: 'dragon_financing_pre' },
                    { label: '供应商上传资料', value: 'dragon_financing' },
                    { label: '平台审核', value: 'dragon_platform_verify' },
                    { label: '供应商签署合同', value: 'dragon_supplier_sign' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                    // { label: '中止', value: 99 },
                ]
            }
        ],
        dragonListType: <SelectItemsModel[]>[
            {
                label: '龙光模式', value: 52,
                children: [
                    { label: '保理商预录入', value: 101 },
                    { label: '供应商上传资料', value: 102 },
                    { label: '平台审核', value: 103 },
                    { label: '供应商签署合同', value: 104 },
                ]
            },
            {
                label: '万科模式', value: 53,
                children: [
                    { label: '保理预录入', value: 201 },
                    { label: '供应商上传资料', value: 202 },
                    { label: '平台审核', value: 203 },
                    { label: '保理商风险审核', value: 204 },
                    { label: '供应商签署合同', value: 205 },
                    { label: '保理商回传合同', value: 206 },
                    // { label: '中止', value: 99 },
                ]
            },
        ],
        newdragonListType: <SelectItemsModel[]>[
            {
                label: '龙光模式', value: 52,
                children: [
                    { label: '保理商预录入', value: 'dragon_financing_pre' },
                    { label: '供应商上传资料', value: 'dragon_financing' },
                    { label: '平台审核', value: 'dragon_platform_verify' },
                    { label: '供应商签署合同', value: 'dragon_supplier_sign' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                ]
            },
            {
                label: '万科模式', value: 53,
                children: [
                    { label: '保理预录入', value: 'vanke_financing_pre' },
                    { label: '供应商上传资料', value: 'vanke_financing' },
                    { label: '平台审核', value: 'vanke_platform_verify' },
                    { label: '保理商风险审核', value: 'vanke_factoring_risk' },
                    { label: '供应商签署合同', value: 'vanke_financing_sign' },
                    { label: '保理商回传合同', value: 'vanke_factoring_passback' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                    // { label: '中止', value: 99 },
                ]
            },
        ],
        vankeListType: <SelectItemsModel[]>[
            {
                label: '龙光模式', value: 52,
                children: [
                    { label: '保理商预录入', value: 'dragon_financing_pre' },
                    { label: '供应商上传资料', value: 'dragon_financing' },
                    { label: '平台审核', value: 'dragon_platform_verify' },
                    { label: '供应商签署合同', value: 'dragon_supplier_sign' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                    { label: '中止', value: 99 },
                    { label: '退单', value: 100 },
                ]
            },
            {
                label: '万科模式(新)', value: 53,
                children: [
                    { label: '保理预录入', value: 'vanke_financing_pre' },
                    { label: '供应商上传资料', value: 'vanke_financing' },
                    { label: '平台审核', value: 'vanke_platform_verify' },
                    { label: '保理商风险审核', value: 'vanke_factoring_risk' },
                    { label: '供应商签署合同', value: 'vanke_financing_sign' },
                    { label: '保理商回传合同', value: 'vanke_factoring_passback' },
                    { label: '待审批', value: 'wait_verification_500' },
                    { label: '审批中', value: 'verificating_500' },
                    { label: '保理商签署合同', value: 'factoring_sign_500' },
                    { label: '待放款', value: 'wait_loan_500' },
                    { label: '已放款', value: 'loaded_500' },
                    { label: '已回款', value: 'repayment_500' },
                    { label: '中止', value: 99 },
                    { label: '退单', value: 100 },
                ]
            },
            {
                label: '金地模式', value: 14,
                children: [
                    { label: '保理商预录入', value: '1' },
                    { label: '供应商上传资料并签署合同', value: '2' },
                    { label: '保理商审核', value: '3' },
                    { label: '项目公司确认应收账款金额', value: '4' },
                    // {label: '集团公司签署付款确认书', value: '5'},
                    { label: '保理商签署合同', value: '6' },
                    { label: '交易完成', value: '7' },
                    { label: '终止', value: '8' },
                ]
            },
            {
                label: '万科模式(旧)', value: 6,
                children: [
                    { label: '保理商预录入', value: '1' },
                    { label: '供应商上传资料并签署合同', value: '2' },
                    { label: '保理商审核并签署合同', value: '3' },
                    { label: '交易完成', value: '4' },
                    { label: '终止', value: '8' },
                ]
            }
        ],
        dragonBookType: <SelectItemsModel[]>[
            { label: '应收账款金额', value: '应收账款金额' },
        ],

        // 广发银行业务
        pushStatus: <SelectItemsModel[]>[
            { label: '已关闭', value: 0 },
            { label: '已开启', value: 1 },
        ],
        // 白名單類型
        BankwhiteNameStatus: <SelectItemsModel[]>[
            { label: '白名单', value: 1 },
            { label: '非白名单', value: 0 },
        ],
        processStatus: <SelectItemsModel[]>[
            { label: '未发起', value: 0 },
            { label: '供应商签署协议', value: 1 },
            { label: '平台签署协议', value: 2 },
            { label: '流程结束', value: 3 },
        ],
        // 万科新增业务，万科类型
        wkType: <SelectItemsModel[]>[
            { label: '万科', value: 1 },
            { label: '国寿', value: 2 },
        ],
        // 地产合同补录付款性质 payType
        payType: <SelectItemsModel[]>[
            { label: '进度款', value: 1 },
            { label: '结算款', value: 2 },
            { label: '其他', value: 3 },

        ],
        signType: <SelectItemsModel[]>[
            { label: '线上签署', value: 0 },
            { label: '线下签署', value: 1 },
        ],
        memoStatus: <SelectItemsModel[]>[
            { label: '差资料-供应商', value: 1 },
            { label: '差资料-项目公司', value: 2 },
            { label: '需介入', value: 3 },
            { label: '需退单', value: 4 },

        ]
        ,
        entoCapitalSugest: <SelectItemsModel[]>[
            { label: '建议入池', value: 2 },
            { label: '否', value: 1 },
        ],
        vankeSelectFlag1: <SelectItemsModel[]>[
            { label: '未回传文件', value: 0 },
            { label: '已回传文件', value: 1 },
        ],

        vankeSelectFlag2: <SelectItemsModel[]>[
            { label: '未生成文件', value: 0 },
            { label: '已生成文件', value: 1 },
            { label: '已回传文件', value: 2 },
        ],
        vankeSelectFlag3: <SelectItemsModel[]>[
            { label: '未生成文件', value: 0 },
            { label: '已生成文件', value: 1 },
            { label: '已签署文件', value: 2 },
        ]
    };
    // 静态方法>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    private static provinceCityCache; // 城市
    private static orgIndustryCache; // 行业
    private static accountsreceivable; // 应收账款类型
    // 构建城市联动选择
    private static buildProvinceCity(): {} {
        if (!isNullOrUndefined(SelectOptions.provinceCityCache)) {
            return SelectOptions.provinceCityCache;
        }

        const ret = {
            firstPlaceHolder: '请选择省份',
            secondPlaceHolder: '请选择城市',
            first: [],
            second: {}
        };
        SelectOptions.buildOneProvince(ret, '北京市', '北京市');
        SelectOptions.buildOneProvince(ret, '上海市', '上海市');
        SelectOptions.buildOneProvince(ret, '天津市', '天津市');
        SelectOptions.buildOneProvince(ret, '重庆市', '重庆市');
        SelectOptions.buildOneProvince(ret, '广东省', '广州市|深圳市|珠海市|佛山市|中山市|韶关市|汕尾市|东莞市|江门市|茂名市|湛江市|云浮市|河源市|惠州市|阳江市|汕头市|揭阳市|清远市|潮州市|肇庆市|梅州市');
        SelectOptions.buildOneProvince(ret, '江苏省', '无锡市|常州市|盐城市|苏州市|宿迁市|徐州市|淮安市|连云港市|南京市|镇江市|南通市|扬州市|泰州市');
        SelectOptions.buildOneProvince(ret, '浙江省', '舟山市|湖州市|嘉兴市|衢州市|金华市|台州市|宁波市|杭州市|丽水市|温州市|绍兴市');
        SelectOptions.buildOneProvince(ret, '山东省', '诸城市|聊城市|济宁市|临沂市|威海市|德州市|东营市|济南市|潍坊市|烟台市|荷泽市|枣庄市|淄博市|滨州市|日照市|青岛市|泰安市|莱芜市');
        SelectOptions.buildOneProvince(ret, '江西省', '九江市|鹰潭市|上饶市|南昌市|抚州市|宜春市|吉安市|景德镇市|赣州市|萍乡市|新余市');
        SelectOptions.buildOneProvince(ret, '河南省', '漯河市|新乡市|许昌市|信阳市|安阳市|洛阳市|三门峡市|平顶山市|焦作市|周口市|濮阳市|南阳市|驻马店市|郑州市|鹤壁市|开封市|商丘市');
        SelectOptions.buildOneProvince(ret, '河北省', '沧州市|石家庄市|唐山市|邢台市|邯郸市|衡水市|承德市|保定市|张家口市|秦皇岛市|廊坊市');
        SelectOptions.buildOneProvince(ret, '四川省',
            '广安市|阿坝藏族羌族自治州|广元市|遂宁市|乐山市|凉山彝族自治州|泸州市|南充市|内江市|宜宾市|资阳市|巴中市|攀枝花市|自贡市|雅安市|眉山市|绵阳市|德阳市|成都市|甘孜藏族自治州|达州市');
        SelectOptions.buildOneProvince(ret, '湖南省', '株洲市|张家界市|湘西土家族苗族自治州|益阳市|怀化市|郴州市|娄底市|邵阳市|衡阳市|常德市|湘潭市|永州市|长沙市|岳阳市');
        SelectOptions.buildOneProvince(ret, '湖北省', '襄樊市|省直辖行政单位|黄冈市|武汉市|随州市|孝感市|恩施土家族苗族自治州|鄂州市|十堰市|荆门市|黄石市|宜昌市|荆州市|咸宁市');
        SelectOptions.buildOneProvince(ret, '安徽省', '铜陵市|亳州市|巢湖市|黄山市|安庆市|宿州市|六安市|蚌埠市|合肥市|池州市|芜湖市|宣城市|淮南市|阜阳市|滁州市|马鞍山市|淮北市');
        SelectOptions.buildOneProvince(ret, '福建省', '厦门市|南平市|三明市|宁德市|莆田市|福州市|漳州市|龙岩市|泉州市');
        SelectOptions.buildOneProvince(ret, '海南省', '省直辖县级行政单位|海口市|三亚市');
        SelectOptions.buildOneProvince(ret, '贵州省', '黔南布依族苗族自治州|铜仁地区|黔西南布依族苗族自治州|黔东南苗族侗族自治州|安顺市|贵阳市|毕节地区|遵义市|六盘水市');
        SelectOptions.buildOneProvince(ret, '云南省',
            '昭通市|怒江傈僳族自治州|临沧市|文山壮族苗族自治州|西双版纳傣族自治州|楚雄彝族自治州|丽江市|德宏傣族景颇族自治州|保山市|大理白族自治州|迪庆藏族自治州|玉溪市|红河哈尼族彝族自治州|曲靖市|思茅市|昆明市');
        SelectOptions.buildOneProvince(ret, '广西壮族自治区', '钦州市|崇左市|河池市|北海市|梧州市|南宁市|百色市|桂林市|来宾市|贺州市|玉林市|柳州市|防城港市|贵港市');
        SelectOptions.buildOneProvince(ret, '黑龙江省', '大庆市|大兴安岭地区|双鸭山市|鹤岗市|鸡西市|佳木斯市|七台河市|伊春市|哈尔滨市|牡丹江市|黑河市|齐齐哈尔市|绥化市');
        SelectOptions.buildOneProvince(ret, '吉林省', '吉林市|松原市|四平市|延边朝鲜族自治州|长春市|白城市|白山市|辽源市|通化市');
        SelectOptions.buildOneProvince(ret, '辽宁省', '本溪市|丹东市|大连市|阜新市|抚顺市|铁岭市|锦州市|沈阳市|葫芦岛市|鞍山市|朝阳市|盘锦市|辽阳市|营口市');
        SelectOptions.buildOneProvince(ret, '山西省', '阳泉市|晋城市|晋中市|太原市|大同市|忻州市|吕梁市|长治市|临汾市|运城市|朔州市');
        SelectOptions.buildOneProvince(ret, '陕西省', '延安市|渭南市|宝鸡市|安康市|铜川市|西安市|榆林市|汉中市|咸阳市|商洛市');
        SelectOptions.buildOneProvince(ret, '甘肃省', '酒泉市|临夏回族自治州|天水市|白银市|定西市|兰州市|甘南藏族自治州|张掖市|陇南市|嘉峪关市|庆阳市|武威市|金昌市|平凉市');
        SelectOptions.buildOneProvince(ret, '青海省', '海北藏族自治州|黄南藏族自治州|果洛藏族自治州|西宁市|玉树藏族自治州|海西蒙古族藏族自治州|海南藏族自治州|海东地区');
        SelectOptions.buildOneProvince(ret, '宁夏回族自治区', '银川市|吴忠市|固原市|石嘴山市|中卫市');
        SelectOptions.buildOneProvince(ret, '新疆维吾尔自治区',
            '喀什地区|巴音郭楞蒙古自治州|吐鲁番地区|克孜勒苏柯尔克孜自治州|昌吉回族自治州|伊犁哈萨克自治州|阿勒泰地区|塔城地区|阿克苏地区|哈密地区|乌鲁木齐市|省直辖行政单位|博尔塔拉蒙古自治州|克拉玛依市|和田地区');
        SelectOptions.buildOneProvince(ret, '西藏自治区', '昌都地区|那曲地区|林芝地区|阿里地区|日喀则地区|拉萨市|山南地区');
        SelectOptions.buildOneProvince(ret, '内蒙古自治区', '乌海市|乌兰察布市|呼和浩特市|鄂尔多斯市|锡林郭勒盟|呼伦贝尔市|巴彦淖尔市|阿拉善盟|包头市|赤峰市|通辽市|兴安盟');
        SelectOptions.buildOneProvince(ret, '香港特别行政区', '香港特别行政区');
        SelectOptions.buildOneProvince(ret, '澳门特别行政区', '澳门特别行政区');
        SelectOptions.buildOneProvince(ret, '台湾省', '台湾省');

        SelectOptions.provinceCityCache = ret;
        return ret;
    }
    private static buildaccountsreceivable(): {} {
        if (!isNullOrUndefined(SelectOptions.accountsreceivable)) {
            return SelectOptions.accountsreceivable;
        }

        const ret = {
            firstPlaceHolder: '请选择',
            secondPlaceHolder: '请选择',
            first: [],
            second: [],
            third: {}
        };
        SelectOptions.buildOneProvince(ret, '商品类', '土建材料');
        SelectOptions.buildOneProvince(ret, '服务类', '上海市');
        SelectOptions.buildOneProvince(ret, '出租资产类', '天津市');
        SelectOptions.provinceCityCache = ret;
        return ret;

    }

    // 构建行业联动选项
    private static buildOrgIndustry(): {} {
        if (!isNullOrUndefined(SelectOptions.orgIndustryCache)) {
            return SelectOptions.orgIndustryCache;
        }

        const ret = {
            firstPlaceHolder: '请选择行业分类',
            secondPlaceHolder: '请选择行业',
            first: [],
            second: {}
        };
        SelectOptions.buildOneProvince(ret, 'A.农、林、牧、渔业', '01.农业|02.林业|03.畜牧业|04.渔业|05.农、林、牧、渔服务业');
        SelectOptions.buildOneProvince(ret, 'B.采矿业', '06.煤炭开采和洗选业|07.石油和天然气开采业|08.黑色金属矿采选业|09.有色金属矿采选业|10.非金属矿采选业|11.开采辅助活动|12.其他采矿业');
        SelectOptions.buildOneProvince(ret,
            'C.制造业', `13.农副食品加工业|14.食品制造业|15.酒、饮料和精制茶制造业|16.烟草制品业|17.纺织业|18.纺织服装、服饰业
            |19.皮革、毛皮、羽毛及其制品和制鞋业|20.木材加工和木、竹、藤、棕、草制品业|21.家具制造业|22.造纸和纸制品业|23.印刷和记录媒介复制业
            |24.文教、工美、体育和娱乐用品制造业|25.石油加工、炼焦和核燃料加工业|26.化学原料和化学制品制造业|27.医药制造业|28.化学纤维制造业
            |29.橡胶和塑料制品业|30.非金属矿物制品业|31.黑色金属冶炼和压延加工业|32.有色金属冶炼和压延加工业|33.金属制品业|34.通用设备制造业
            |35.专用设备制造业|36.汽车制造业|37.铁路、船舶、航空航天和其他运输设备制造业|38.电气机械和器材制造业|39.计算机、通信和其他电子设备制造业
            |40.仪器仪表制造业|41.其他制造业|42.废弃资源综合利用业|43.金属制品、机械和设备修理业`
        );
        SelectOptions.buildOneProvince(ret, 'D.电力、热力、燃气及水生产和供应业', '44.电力、热力生产和供应业|45.燃气生产和供应业|46.水的生产和供应业');
        SelectOptions.buildOneProvince(ret, 'E.建筑业', '47.房屋建筑业|48.土木工程建筑业|49.建筑安装业|50.建筑装饰和其他建筑业');
        SelectOptions.buildOneProvince(ret, 'F.批发和零售业', '51.批发业|52.零售业');
        SelectOptions.buildOneProvince(ret, 'G.交通运输、仓储和邮政业', '53.铁路运输业|54.道路运输业|55.水上运输业|56.航空运输业|57.管道运输业|58.装卸搬运和运输代理业|59.仓储业|60.邮政业');
        SelectOptions.buildOneProvince(ret, 'H.住宿和餐饮业', '61.住宿业|62.餐饮业');
        SelectOptions.buildOneProvince(ret, 'I.信息传输、软件和信息技术服务业', '63.电信、广播电视和卫星传输服务|64.互联网和相关服务|65.软件和信息技术服务业');
        SelectOptions.buildOneProvince(ret, 'J.金融业', '66.货币金融服务|67.资本市场服务|68.保险业|69.其他金融业');
        SelectOptions.buildOneProvince(ret, 'K.房地产业', '70.房地产业');
        SelectOptions.buildOneProvince(ret, 'L.租赁和商务服务业', '71.租赁业|72.商务服务业');
        SelectOptions.buildOneProvince(ret, 'M.科学研究和技术服务业', '73.研究和试验发展|74.专业技术服务业|75.科技推广和应用服务业');
        SelectOptions.buildOneProvince(ret, 'N.水利、环境和公共设施管理业', '76.水利管理业|77.生态保护和环境治理业|78.公共设施管理业');
        SelectOptions.buildOneProvince(ret, 'O.居民服务、修理和其他服务业', '79.居民服务业|80.机动车、电子产品和日用产品修理业|81.其他服务业');
        SelectOptions.buildOneProvince(ret, 'P.教育', '82.教育');
        SelectOptions.buildOneProvince(ret, 'Q.卫生和社会工作', '83.卫生|84.社会工作');
        SelectOptions.buildOneProvince(ret, 'R.文化、体育和娱乐业', '85.新闻和出版业|86.广播、电视、电影和影视录音制作业|87.文化艺术业|88.体育|89.娱乐业');

        SelectOptions.orgIndustryCache = ret;
        return ret;
    }

    // 构造银行卡列表下拉选项


    private static buildOneProvince(ret: any, province: string, cities: string) {
        ret.first.push({ label: province, value: province });

        const second = [];
        for (const city of cities.split('|')) {
            second.push({ label: city, value: city });
        }
        ret.second[province] = second;
    }


    static get(name: string): any[] {
        return SelectOptions.configs[name];
    }

    static set(checker: any, name: string) {
        SelectOptions.configs[name] = <SelectItemsModel[]>checker;
    }

    static getLabel(options: any[], value: any): string {
        if (!XnUtils.isEmpty(options)) {
            for (const option of options) {
                if (option.value === value) {
                    return option.label;
                }
            }
        }

        return '';
    }

    static getConfLabel(confName: string, value: string): string {
        const options = this.configs[confName];
        if (!!options) {
            for (const option of options) {
                if (option.value.toString() === value.toString()) {
                    return option.label;
                }
            }
        }

        return '';
    }

    static getConfValue(confName: string, label: string): string {
        const options = this.configs[confName];
        if (!!options) {
            for (const option of options) {
                if (option.label === label) {
                    return option.value;
                }
            }
        }

        return '';
    }
}
