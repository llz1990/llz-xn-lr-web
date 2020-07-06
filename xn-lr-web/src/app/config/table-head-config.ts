
/*
 * Copyright(c) 2017-2019, 北京希为科技有限公司
 * Beijing Xiwei Technology Co., Ltd.
 * All rights reserved.
 *
 * @file：TableHeadConfig
 * @summary：excel 解析数据列表配置
 * @version: 1.0
 * **********************************************************************
 * revision             author            reason             date
 * 1.0                 zhyuanan          添加注释         2019-04-09
 * **********************************************************************
 */

export default class TableHeadConfig {
    static heads = {
        '万科提单': {
            '万科': {
                headText: [
                    { label: '应付账款序号', value: 'num' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '项目名称', value: 'projectName' },
                    { label: '付款确认书编号', value: 'payConfirmId' },
                    { label: '合同号', value: 'contractId' },
                    // {label: '合同名称', value: 'contractName'},
                    { label: '发票号', value: 'invoiceNum', options: { type: 'multiple' } },
                    { label: '发票金额', value: 'invoiceAmount', options: { type: 'money' } },
                    { label: '应付账款金额', value: 'receivable', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '收款单位账号', value: 'debtAccount' },
                    { label: '收款单位开户行', value: 'debtBank' },
                    { label: '联系人', value: 'debtUser', options: { type: 'multiple' } },
                    { label: '联系人手机号', value: 'debtUserMobile', options: { type: 'multiple' } },
                    { label: '应收账款受让方', value: 'receivableAssignee' },
                    { label: '受让价格', value: 'assigneePrice' },
                    // {label: '转让价款', value: 'changePrice'},
                    { label: '确认书出具日期', value: 'confirmationIssuanceTime' },
                    { label: '确认书到期日期', value: 'confirmationExpiryTime' },
                    { label: '保理联系人', value: 'factoringUser' },
                    { label: '保理联系人手机号', value: 'factoringUserMobile' },
                    { label: '是否需要更正', value: 'correct', options: { type: 'def', style: 'red' } },
                    { label: '是否注册', value: 'registered', options: { type: 'boolean', style: 'red' } },
                ],
                excel_down_url: '/assets/lr/doc/vanke-mode/提单模板：万科模式应收账款保理计划表-万科.xlsx',
                excel_up_url: '/ljx/dc_project/order_check',
            },
            '雅居乐地产控股有限公司': {
                headText: [
                    { label: '应付账款序号', value: 'num' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '项目名称', value: 'projectName' },
                    { label: '付款确认书编号', value: 'payConfirmId' },
                    { label: '合同号', value: 'contractId' },
                    // {label: '合同名称', value: 'contractName'},
                    { label: '发票号', value: 'invoiceNum', options: { type: 'multiple' } },
                    { label: '发票金额', value: 'invoiceAmount', options: { type: 'money' } },
                    { label: '应付账款金额', value: 'receivable', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '收款单位账号', value: 'debtAccount' },
                    { label: '收款单位开户行', value: 'debtBank' },
                    { label: '联系人', value: 'debtUser', options: { type: 'multiple' } },
                    { label: '联系人手机号', value: 'debtUserMobile', options: { type: 'multiple' } },
                    { label: '应收账款受让方', value: 'receivableAssignee' },
                    { label: '受让价格', value: 'assigneePrice' },
                    // {label: '转让价款', value: 'changePrice'},
                    // {label: '确认书出具日期', value: 'confirmationIssuanceTime'},
                    // {label: '确认书到期日期', value: 'confirmationExpiryTime'},
                    { label: '保理联系人', value: 'factoringUser' },
                    { label: '保理联系人手机号', value: 'factoringUserMobile' },
                    // {label: '是否需要更正', value: 'correct', options: {type: 'def', style: 'red'}},
                    { label: '是否注册', value: 'registered', options: { type: 'boolean', style: 'red' } },
                ],
                excel_down_url: '/assets/lr/doc/vanke-mode/提单模板：万科模式应收账款保理计划表-雅居乐.xlsx',
                excel_up_url: '/ljx/dc_project/order_check',
            },
            '深圳市龙光控股有限公司': {
                headText: [
                    { label: '应付账款序号', value: 'num' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '项目名称', value: 'projectName' },
                    // {label: '付款确认书编号', value: 'payConfirmId'},
                    { label: '合同号', value: 'contractId' },
                    { label: '合同名称', value: 'contractName' },
                    { label: '发票号', value: 'invoiceNum', options: { type: 'multiple' } },
                    { label: '发票金额', value: 'invoiceAmount', options: { type: 'money' } },
                    { label: '应付账款金额', value: 'receivable', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '收款单位账号', value: 'debtAccount' },
                    { label: '收款单位开户行', value: 'debtBank' },
                    { label: '联系人', value: 'debtUser', options: { type: 'multiple' } },
                    { label: '联系人手机号', value: 'debtUserMobile', options: { type: 'multiple' } },
                    { label: '应收账款受让方', value: 'receivableAssignee' },
                    // {label: '受让价格', value: 'assigneePrice'},
                    { label: '转让价款', value: 'changePrice', options: { type: 'money' } },
                    // {label: '确认书出具日期', value: 'confirmationIssuanceTime'},
                    // {label: '确认书到期日期', value: 'confirmationExpiryTime'},
                    { label: '保理联系人', value: 'factoringUser' },
                    { label: '保理联系人手机号', value: 'factoringUserMobile' },
                    // {label: '是否需要更正', value: 'correct', options: {type: 'def', style: 'red'}},
                    { label: '是否注册', value: 'registered', options: { type: 'boolean', style: 'red' } },
                ],
                excel_down_url: '/assets/lr/doc/vanke-mode/提单模板：万科模式应收账款保理计划表-龙光.xlsx',
                excel_up_url: '/ljx/dc_project/order_check',
            },
        },
        '定向支付提单': {
            '华为': {
                headText: [
                    { label: '应付账款序号', value: 'num' },
                    { label: '合同号', value: 'contractId' },
                    { label: '合同名称', value: 'contractName' },
                    { label: '发票号', value: 'invoiceNum', options: { type: 'multiple' } },
                    { label: '发票金额', value: 'invoiceAmount', options: { type: 'money' } },
                    { label: '债权人', value: 'debtUnit' },
                    { label: '联系人', value: 'debtUser', options: { type: 'multiple' } },
                    { label: '联系人手机号', value: 'debtUserMobile', options: { type: 'multiple' } },
                    { label: '应收账款受让方', value: 'receivableAssignee' },
                    { label: '应收账款受让方回款账号', value: 'raPaybackAccount' },
                    { label: '应收账款受让方回款账号开户行', value: 'raPaybackAccountBankName' },
                    { label: '债务人', value: 'debtOwner' },
                    { label: '保理融资起始日', value: 'factoringBeginDate' },
                    { label: '保理到期日', value: 'factoringEndDate' },
                    { label: '委托付款日', value: 'factoringDueDate' },
                    { label: '年化保理使用费率', value: 'yearRatesUser' },
                    { label: '年化保理服务费率', value: 'yearRatesService' },
                    { label: '月化平台服务费率', value: 'monthRatesService' },
                    { label: '平台服务月数', value: 'platformServiceMonths' },
                ],
                excel_down_url: '/assets/lr/doc/定向收款模式提单.xls',
                excel_up_url: '/llz/direct_payment/upload_excel',
            },
        },
        // 数组字段
        '上传付款确认书': {
            headText: [
                { label: '序号', value: '', type: 'order' },
                { label: '付款确认书编号', value: 'payConfirmId', type: 'default' },
                { label: '收款单位', value: 'debtUnit', type: 'default' },
                { label: '应收账款转让金额', value: 'receivable', type: 'money' },
                { label: '文件', value: 'pdfProjectFiles', type: 'view' },
            ]
        },
        // 合同规则
        '合同规则': {
            headText: [
                { label: '合同规则名称', value: 'templateName' },
                { label: '合同规则类型', value: 'templateType' },
                { label: '特殊供应商', value: 'specialSupplier', type: 'enterprise' },
                { label: '总部公司', value: 'headquarters', type: 'headquarters' }, // 根据value值匹配 exp:[{label:'万科股份有限公司',value:'万科'}]
                { label: '适用合同模板', value: 'applyTemplate', type: 'contract' },
            ]
        },
        // 付款管理-已打印带待放款-下载数据表
        '出纳下载': {
            headText: [
                { label: '交易ID', value: 'mainFlowId', type: 'view' },
                { label: '收款账号开户行', value: 'debtBank' },
                { label: '收款账号省份', value: 'province' },
                { label: '收款账号地市', value: 'city' },
                { label: '收款账号地区码', value: 'addressNO' },
                { label: '收款账号', value: 'debtAccount' },
                { label: '金额', value: 'receivable', type: 'money' },
                { label: '汇款用途', value: 'use' },
            ]
        },
        // 付款管理-已打印带待放款-下载数据表
        '会计下载': {
            headText: [
                { label: '起息时间', value: 'payDate' },
                { label: '实际放款日', value: 'factoringEndDate' },
                { label: '收款账号名称/债权转让方名称', value: 'debtUnit' }, // 收款单位
                { label: '转让价款金额', value: 'changeMoney', type: 'money' },
                { label: '核心企业（债务人）', value: 'projectCompany', type: 'headquarters' }, // 即该笔交易的“总部公司”
                { label: '付款确认书编号', value: 'payConfirmId' },
                { label: '应收账款金额', value: 'receivable', type: 'money' },
                { label: '融资到期日', value: 'confirmationExpiryTime' },
                { label: '保理融资期限', value: 'financingDates' },
                { label: '融资利率（年化）', value: 'assigneePrice' },
                { label: '保理利息收入', value: 'factoringPrice' },
            ]
        },
        // 金地3.0 提单
        '金地提单': {
            '金地（集团）股份有限公司': {
                headText: [
                    { label: '应付账款序号', value: 'num' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '合同号', value: 'contractId' },
                    { label: '发票号', value: 'invoiceNum', options: { type: 'multiple' } },
                    { label: '发票金额', value: 'invoiceAmount', options: { type: 'money' } },
                    { label: '应付账款金额', value: 'receivable', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '收款单位账号', value: 'debtAccount' },
                    { label: '收款单位开户行', value: 'debtBank' },
                    { label: '联系人', value: 'debtUser', options: { type: 'multiple' } },
                    { label: '联系人手机号', value: 'debtUserMobile', options: { type: 'multiple' } },
                    { label: '应收账款受让方', value: 'receivableAssignee' },
                    { label: '受让价格', value: 'assigneePrice' },
                    { label: '保理融资到期日', value: 'factoringEndDate' },
                    { label: '保理联系人', value: 'factoringUser' },
                    { label: '保理联系人手机号', value: 'factoringUserMobile' },
                    { label: '是否注册', value: 'registered', options: { type: 'boolean', style: 'red' } },
                ],
                excel_down_url: '/assets/lr/doc/gemdale-mode/提单模板：金地模式应收账款保理计划表-金地.xlsx',
                excel_up_url: '/custom/jindi_v3/dc_project/order_check1',
            }
        },
        // 龙光 提单
        '龙光提单': {
            '深圳市龙光控股有限公司': {
                headText: [
                    { label: '应收账款序号', value: 'index' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '项目名称', value: 'projectName' },
                    { label: '合同编号', value: 'contractId' },
                    { label: '合同名称', value: 'contractName' },
                    { label: '应收账款', value: 'receive', options: { type: 'money' } },
                    { label: '转让价款', value: 'changePrice', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '联系人', value: 'linkMan' },
                    { label: '联系电话', value: 'linkPhone' },
                    { label: '应收账款受让方', value: 'factoringOrgName' },
                    { label: '运营部对接人', value: 'operatorName' },
                    { label: '运营部对接人手机号', value: 'operatorPhone' },
                    { label: '市场部对接人', value: 'marketName' },
                    { label: '收款单位归属城市', value: 'supplierCity' },
                    { label: '收款单位省份', value: 'projectProvince' },
                    { label: '市场部对接人手机号', value: 'marketPhone' },
                    { label: '收款单位是否注册', value: 'isRegisterSupplier', options: { type: 'boolean', style: 'red' } },
                ],
                excel_down_url: '/assets/lr/doc/dragon-mode/龙光付款计划表.xlsx',
                excel_up_url: '/pay_plan/uploadExcel',
            },
            '万科企业股份有限公司': {
                headText: [
                    { label: '应收账款序号', value: 'index' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '项目名称', value: 'projectName' },
                    { label: '付款确认书编号', value: 'payConfirmId' },
                    { label: '合同编号', value: 'contractId' },
                    { label: '合同名称', value: 'contractName' },
                    { label: '预录入发票号码', value: 'preInvoiceNum', options: { type: 'multiple' } },
                    { label: '预录入发票金额', value: 'preInvoiceAmount'},
                    { label: '应收账款金额', value: 'receive', options: { type: 'money' } },
                    // { label: '转让价款', value: 'changePrice', options: { type: 'money' } },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '收款单位账号', value: 'debtUnitAccount' },
                    { label: '收款单位开户行', value: 'debtUnitBank' },
                    { label: '联系人', value: 'linkMan' },
                    { label: '联系人手机号', value: 'linkPhone' },
                    { label: '应收账款受让方', value: 'factoringOrgName' },
                    { label: '资产转让折扣率', value: 'discountRate'},
                    { label: '确认书出具日期', value: 'qrsProvideTime',options: { type: 'date' }},
                    { label: '保理融资到期日', value: 'factoringEndDate',options: { type: 'date' } },
                    { label: '运营部对接人', value: 'operatorName' },
                    { label: '运营部对接人手机号', value: 'operatorPhone' },
                    { label: '市场部对接人', value: 'marketName' },
                    { label: '市场部对接人手机号', value: 'marketPhone' },
                    // { label: '是否需要更正', value: 'correct', options: { type: 'def', style: 'red' } },
                    // { label: '收款单位归属城市', value: 'supplierCity' },
                    { label: '申请付款单位归属城市', value: 'projectCity' },
                    { label: '申请付款单位省份', value: 'projectProvince' },
                    { label: '收款单位是否注册', value: 'isRegisterSupplier', options: { type: 'boolean', style: 'red' } },
                    { label: '托管行', value: 'depositBank' },
                    { label: '总部提单日期', value: 'headPreDate',options: { type: 'date' } },

                ],
                excel_down_url: '/assets/lr/doc/dragon-mode/新万科付款计划表.xlsx',
                excel_up_url: '/pay_plan/vanke_upload_excel',
            },
            '批量补充': {
                headText: [
                    { label: '交易ID', value: 'mainFlowId' },
                    { label: '收款单位', value: 'debtUnit' },
                    { label: '申请付款单位', value: 'projectCompany' },
                    { label: '总部公司', value: 'headquarters' },
                    { label: '资产编号', value: 'poolTradeCode' },
                    { label: '交易金额', value: 'receive' },
                    { label: '保理融资到期日', value: 'factoringEndDate' },
                    { label: '预计放款日期', value: 'priorityLoanDate' },
                ],
            }
        }
    };

    static getConfig(name: string) {
        return this.heads[name];
    }
}
