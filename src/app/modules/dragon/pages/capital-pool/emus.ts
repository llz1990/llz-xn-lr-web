/**
 * 合同生成类型
 * - 类型值大于1000的是要签属合同的
 * - 类型值小于1000的是不需要签属合同的
 */
export enum ContractCreateType {
    /** 《总部公司回执（二次转让）》 */
    CodeReceipt2 = 1,
    /** 《项目公司回执（二次转让）》 */
    CodeProjectReceipt2 = 2,
    /** 项目公司回执（一次转让）》 */
    CodeProjectReceipt1 = 3,
    /** 《付款确认书（总部致券商）》 */
    CodeBrokerPayConfirm = 4,
    /** 《付款确认书（总部致保理商）》 */
    CodeFactoringPayConfirm = 5,
    /** 《致总部公司通知书（二次转让）》 */
    CodeNotice2 = 1001,
    /** 《致项目公司通知书（二次转让）》 */
    CodeProjectNotice2 = 1002,
    /** 《债权转让及账户变更通知的补充说明 */
    CodeChangeNoticeAdd = 1003,
}

/** 范围 */
export enum SelectRange {
    /** 当前条件筛选下所有交易 */
    All = 1,
    /** 当前勾选的交易 */
    Select = 2,
}

export enum DragonContentType {
    /** 《致总部公司通知书（二次转让）》 */
    CodeNotice2 = 1,
    /** 《总部公司回执（二次转让）》 */
    CodeReceipt2 = 2,
    /** 《致项目公司通知书（二次转让）》 */
    CodeProjectNotice2 = 3,
    /** 《项目公司回执（二次转让）》 */
    CodeProjectReceipt2 = 4,
    /** 项目公司回执（一次转让）》 */
    CodeProjectReceipt1 = 5,
    /** 《付款确认书（总部致券商）》 */
    CodeBrokerPayConfirm = 6,
    /** 《付款确认书（总部致保理商）》 */
    CodeFactoringPayConfirm = 7,
    /** 一次转让签署的合同文件 */
    CodeAssignment = 8,
    /** 中登登记证明文件 */
    CodeCertificate = 9,
    /** 查询证明文件 */
    CodeSearcherCertificate = 10,
    /** 基础资料 */
    CodeBaseResource = 11,
    /**<<债权转让及账户变更通知的补充说明>> */
    CodeCreditAccountChange = 12,
}
