# 地产abs 根据业务需求，企业权限说明

## 业务类型分为: **万科** `financing6`、**金地** `financing14`
> 在导航组件中 `ConsoleAsideComponent` 根据导航属性 `dcType` 的值匹配。
> 

### 万科
> `dcType` 值为 `financing6`
> 该业务内所可进行业务根据企业可进行的业务模式进行匹配，根据字导航属性 `enterpriseType`，该值取值于 `session` 中。
>> **项目公司即核心企业** `financing6_3`
>> **总部公司** `financing6_1`

### 金地
> `dcType` 值为 `financing14`
> 该业务内所可进行业务根据企业可进行的业务模式进行匹配，根据字导航属性 `enterpriseType`，该值取值于 `session` 中。
>> **项目公司即核心企业** `financing14_3`
>> **总部公司** `financing14_1`
