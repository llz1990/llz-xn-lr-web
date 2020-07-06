
export default class DragonInfos {
    static contract = { // 保后管理主界面页面配置
        heads: [
            { label: '合同扫描件', value: 'contractFile', },
            { label: '合同名称', value: 'contractName' },
            { label: '合同编号', value: 'contractId', },
            { label: '合同金额', value: 'contractMoney', },
        ],
        searches: [
        ],
    };
    static invoice = { // 供应商上传资料初审发票
        heads: [
            { label: '发票号码', value: 'invoiceNum' },
            { label: '发票代码', value: 'invoiceCode' },
            { label: '开票日期', value: 'invoiceDate' },
            { label: '不含税金额', value: 'amount', type: 'money' },
            { label: '含税金额', value: 'invoiceAmount', type: 'money' },
            { label: '状态', value: 'status', type: 'status' },
            { label: '图片名称', value: 'fileId', type: 'file' },
        ],

    };
    static platContract = { // 供应商上传资料初审发票
        heads: [
            { label: '合同编号', value: 'contractId' },
            { label: '合同名称', value: 'contractName' },
            { label: '合同金额', value: 'contractMoney', type: 'money' },
            { label: '合同类型', value: 'contractType', type: 'contractType' },
            { label: '合同扫描件', value: 'contractFile', type: 'file' },
        ],

    };
    static platInvoice = { // 供应商上传资料初审发票
        heads: [
            { label: '图片名称', value: 'fileId', type: 'file' },
            { label: '发票号码', value: 'invoiceNum' },
            { label: '发票代码', value: 'invoiceCode' },
            { label: '开票日期', value: 'invoiceDate' },
            { label: '不含税金额', value: 'amount', type: 'money' },
            { label: '含税金额', value: 'invoiceAmount', type: 'money' },
            { label: '发票转让金额', value: 'transferMoney', type: 'money' },
            { label: '状态', value: 'status', type: 'status' },
            { label: '历史交易Id', value: 'mainFlowId', type: 'mainFlowId' },

        ],

    };

}
