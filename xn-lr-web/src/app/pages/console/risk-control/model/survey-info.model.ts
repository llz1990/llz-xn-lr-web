// 公司信息输出字段
export class CustomerInfoOutputModel {
    KeyNo?: string = ''; // 内部KeyNo
    Name?: string = ''; // 公司名称
    No?: string = ''; // 注册号
    BelongOrg?: string = ''; // 登记机关
    OperName?: string = ''; // 法人名
    StartDate?: string = ''; // 成立日期
    EndDate?: string = ''; // 吊销日期
    Status?: string = ''; // 企业状态
    Province?: string = ''; // 省份
    UpdatedDate?: string = ''; // 更新日期
    CreditCode?: string = ''; // 社会统一信用代码
    RegistCapi?: string = ''; // 注册资本
    RelRegistCapi?: string = ''; // 实际缴纳资本
    EconKind?: string = ''; // 企业类型
    Address?: string = ''; // 地址
    Scope?: string = ''; // 经营范围
    TermStart?: string = ''; // 营业开始日期
    TeamEnd?: string = ''; // 营业结束日期
    CheckDate?: string = ''; // 发照日期
    OrgNo?: string = ''; // 组织机构代码
    IsOnStock?: string = ''; // 是否上市(0为未上市，1为上市)
    StockNumber?: string = ''; // 上市公司代码
    StockType?: string = ''; // 上市类型
    ImageUrl?: string = ''; // 企业Logo
    industry?: string = ''; // 所属行业
    area?: string = ''; // 所属地区
    enName?: string = ''; // 英文名
    onceName?: string = ''; // 曾用名
    bussinessModes?: string = ''; // 经营方式
    staffSize?: string = ''; // 人员规模
    bussinessTerm?: string = ''; // 营业期限
    checkDate?: string = ''; // 核准日期
    Industry?: IndustryOutputModel; // 行业信息
    ChangeRecords?: ChangeRecordsOutputModel[];
    Branches?: BranchesOutputModel[];
    Employees?: EmployeesOutputModel[];
    Partners?: PartnersOutputModel[];
    OriginalName?: OriginalNameOutputModel[];
}

// 公司概况
export class ChangeRecordsOutputModel {
    ProjectName?: string = ''; // 变更事项
    BeforeContent?: string = ''; // 变更前内容
    AfterContent?: string = ''; // 变更后内容
    ChangeDate?: string = ''; // 变更日期
}

// 分支机构信息
export class BranchesOutputModel {
    CompanyId?: string = ''; // CompanyId
    RegNo?: string = ''; // 注册号
    Name?: string = ''; // 名称
    BelongOrg?: string = ''; // 登记机关
    CreditCode?: string = ''; // 社会统一信用代码
    OperName;
}

// 主要成員信息
export class EmployeesOutputModel {
    Name?: string = ''; // 姓名
    Job?: string = ''; // 职位
}

// 股东信息
export class PartnersOutputModel {
    StockName?: string = ''; // 股东
    StockType?: string = ''; // 股东类型
    StockPercent?: string = ''; // 出资比例
    ShouldCapi?: string = ''; // 认缴出资额
    ShoudDate?: string = ''; // 认缴出资时间
    InvestType?: string = ''; // 认缴出资方式
    InvestName?: string = ''; // 实际出资方式
    RealCapi?: string = ''; // 实缴出资额
    CapiDate?: string = ''; // 实缴时间
}

// 行业信息
export class IndustryOutputModel {
    StockName?: string = ''; // 股东
    StockType?: string = ''; // 股东类型
    StockPercent?: string = ''; // 出资比例
    ShouldCapi?: string = ''; // 认缴出资额
    ShoudDate?: string = ''; // 认缴出资时间
    InvestType?: string = ''; // 认缴出资方式
    InvestName?: string = ''; // 实际出资方式
    RealCapi?: string = ''; // 实缴出资额
    CapiDate?: string = ''; // 实缴时间
}

// 曾用名
export class OriginalNameOutputModel {
    Name?: string = ''; // 曾用名
    ChangeDate?: string = ''; // 变更日期
}

// 核心指标
export class CoreReferenceOutputModel {
    appId: string = ''; // '机构ID',
    orgName: string = ''; // '机构名称，必须是全称',
    stockHolderBackground: string = ''; // '股东背景',
    leadershipQuality: string = ''; // '领导者素质',
    seniorManagementQuality: string = ''; // '高级经营管理人员素质',
    employeeQuality: string = ''; // '从业人员素质',
    corporateGovernanceStructure: string = ''; // '企业法人治理结构',
    businessObjectives: string = ''; // '经营目标与目标管理',
    internalControlSystem: string = ''; // '内部控制制度建设与实施',
    salesManagement: string = ''; // '营销管理',
    financingManagement: string = ''; // '融资管理',
    investmentManagement: string = ''; // '投资管理',
    financeManagement: string = ''; // '财务管理',
    corporateCreditRecord: string = ''; // '企业信用记录',
    brandStrategy: string = ''; // '品牌战略',
    marketPosition: string = ''; // '市场地位和份额',
    technologyResearch: string = ''; // '技术研发',
    customersProducts: string = ''; // '客户和产品的多样性',
    assetYearEndLoansRatio: string = ''; // '净资产与年末贷款余额比率',
    assetLiabilityRatio: string = ''; // '资产负债率',
    assetFixedRatio: string = ''; // '资产固定比率',
    liquidityRatio: string = ''; // '流动比率',
    quickRatio: string = ''; // '速动比率',
    cashNoLiquidityRatio: string = ''; // '非筹资性现金净流入与流动负债比率',
    cashYesLiquidityRatio: string = ''; // '经营性现金净流入与流动负债比率',
    timesInterestEarned: string = ''; // '利息保障倍数',
    collateralRatio: string = ''; // '担保比率',
    incomeCashRatio: string = ''; // '营业收入现金率',
    receivablesTurnoverRatio: string = ''; // '应收账款周转速度',
    inventoryTurnoverRatio: string = ''; // '存货周转速度',
    grossProfitRatio: string = ''; // '毛利率',
    operatingProfitRatio: string = ''; // '营业利润率',
    assetIncomeRatio: string = ''; // '净资产收益率',
    assetTotalRatio: string = ''; // '总资产报酬率',
    industryRelatedPolicies: string = ''; // '产业及相关宏观经济政策',
    economicEnvironment: string = ''; // '经济环境',
    lawEnvironment: string = ''; // '法律环境',
    industryEnvironment: string = ''; // '行业环境',
    industryCharacteristics: string = ''; // '行业特性',
    developmentProspect: string = ''; // '发展前景',
    antiRiskCapability: string = ''; // '抗风险能力',
    growth: string = ''; // '成长性',
    stockHolderBackgroundScore: string = ''; // '股东背景分值',
    leadershipQualityScore: string = ''; // '领导者素质分值',
    seniorManagementQualityScore: string = ''; // '高级经营管理人员素质分值',
    employeeQualityScore: string = ''; // '从业人员素质分值',
    corporateGovernanceStructureScore: string = ''; // '企业法人治理结构分值',
    businessObjectivesScore: string = ''; // '经营目标与目标管理分值',
    internalControlSystemScore: string = ''; // '内部控制制度建设与实施分值',
    salesManagementScore: string = ''; // '营销管理分值',
    financingManagementScore: string = ''; // '融资管理分值',
    investmentManagementScore: string = ''; // '投资管理分值',
    financeManagementScore: string = ''; // '财务管理分值',
    corporateCreditRecordScore: string = ''; // '企业信用记录分值',
    brandStrategyScore: string = ''; // '品牌战略分值',
    marketPositionScore: string = ''; // '市场地位和份额分值',
    technologyResearchScore: string = ''; // '技术研发分值',
    customersProductsScore: string = ''; // '客户和产品的多样性分值',
    assetYearEndLoansRatioScore: string = ''; // '净资产与年末贷款余额比率分值',
    assetLiabilityRatioScore: string = ''; // '资产负债率分值',
    assetFixedRatioScore: string = ''; // '资产固定比率分值',
    liquidityRatioScore: string = ''; // '流动比率分值',
    quickRatioScore: string = ''; // '速动比率分值',
    cashNoLiquidityRatioScore: string = ''; // '非筹资性现金净流入与流动负债比率分值',
    cashYesLiquidityRatioScore: string = ''; // '经营性现金净流入与流动负债比率分值',
    timesInterestEarnedScore: string = ''; // '利息保障倍数分值',
    collateralRatioScore: string = ''; // '担保比率分值',
    incomeCashRatioScore: string = ''; // '营业收入现金率分值',
    receivablesTurnoverRatioScore: string = ''; // '应收账款周转速度分值',
    inventoryTurnoverRatioScore: string = ''; // '存货周转速度分值',
    grossProfitRatioScore: string = ''; // '毛利率分值',
    operatingProfitRatioScore: string = ''; // '营业利润率分值',
    assetIncomeRatioScore: string = ''; // '净资产收益率分值',
    assetTotalRatioScore: string = ''; // '总资产报酬率分值',
    industryRelatedPoliciesScore: string = ''; // '产业及相关宏观经济政策分值',
    economicEnvironmentScore: string = ''; // '经济环境分值',
    lawEnvironmentScore: string = ''; // '法律环境分值',
    industryEnvironmentScore: string = ''; // '行业环境分值',
    industryCharacteristicsScore: string = ''; // '行业特性分值',
    developmentProspectScore: string = ''; // '发展前景分值',
    antiRiskCapabilityScore: string = ''; // '抗风险能力分值',
    growthScore: string = ''; // '成长性分值',
}
