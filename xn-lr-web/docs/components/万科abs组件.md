# 万科abs模式通用组件
##### **流程记录**
>
> **描述：**  `FlowProcessComponent` `路径：(src/app/public/flow/flow-process.component.ts)`中进行配置，流程步骤进度在
> `XnFlowUtils` `路径：(src/app/common/xn-flow-utils.ts)`组件中的`calcFlowProcess(flowId: string)`方法中根据流程id`flowId`配置。
>
> **截图：**
>
> ![流程记录](./images/vanke/流程记录.jpg)
>
##### **所在页面：** 万科模式-记录列表
>
> **组件：**  `DataTable` `路径：(src/app/common/data-table.ts)` ,`RecordComponent` `路径：(src/app/pages/console/record/record.component.ts)`
>
> **描述：**  流程记录，点击 `查看处理`,`标题` 可进入下一阶段（复核），`发起申请交易`按钮进入预录入页面，按钮内容在 `Tables` `路径：(src/app/config/tables.ts)` 根据 `flowId`在 `flow`对象中配置。
>
> **截图：**
>
> ![记录列表](./images/vanke/万科模式记录列表.jpg)
>
#####  **所在页面：** 保理商预录入
>
> **type:** `select`
> 
> **描述：** 选择核心企业
> 
> **截图：** 
> 
> ![核心企业选择 *](./images/vanke/单选框.png)
>
> **type:** `data-content`
>
> **描述：** 下载摸板，补充数据并上传保理计划表（excel），并解析表格数据显示在table中,表各种可根据特定尺寸，横向，纵向拖动查看。
>
> **截图：**
>
> ![应收账款保理计划表上传excel](./images/vanke/应收账款暴力计划表.jpg)
>
> **type:** `textarea`
>
> **描述：** 文本域输入
>
> **截图：**
>
> ![应收账款保理计划表上传excel](./images/vanke/备注.jpg)
>
> ##### **所在页面：** 保理商预录入-复核
>
> **type:** `select`
>
> **描述：** 仅显示提交的值，不可编辑
>
> **截图：**
>
> ![核心企业](./images/vanke/select文本显示.jpg)
>
> **type:** `data-content`
>
> **描述：** 仅显示上一步解析的数据
>
> **截图：**
>
> ![保理计划表](./images/vanke/计划表静态.jpg)
>
> **type:** `textarea`
>
> **描述：** 仅显示上一步解析的数据
>
> **截图：**
>
> ![备注](./images/vanke/文本域.jpg)
>
> **描述：** 点击 `提交`按钮进入下一流程 `供应商上传资料并签署合同`
>
>##### **所在页面：** 供应商所有代办任务
>
> **组件：** 如上 `万科模式-记录列表`
>
> **描述：** 点击处理或标题进入上传资料页面
>
> **截图：**
>
> ![代办任务](./images/vanke/代办任务.jpg)
>
>##### **所在页面：** 供应商上传资料并签署合同
>
> **type:** `picker`
>
> **描述：**  在此业务阶段该项为默认后台配置，不可编辑 (即该`checker`项`value`有默认值，且可选项`options`中设置`readonly:true`)，以下不可编辑状态都以此方法设置。
>
> **截图：**
>
> ![选择保理商](./images/vanke/picker1.jpg)
>
> **操作：** 点击选择按钮，弹出选择列表框
>
> **截图：**  `举例可编辑`
>
> ![选择保理商1](./images/vanke/picker2.jpg)
>
> **type:** `text`
>
> **描述：** 普通文本框，此处业务为默认不可编辑，同上 `picker`
>
> **截图：**
>
> ![文本](./images/vanke/select文本显示.jpg)
>
> **截图：** `举例可编辑`
>
> ![文本1](./images/vanke/text2.jpg)
>
> **type:** `date`
>
> **描述：**  日期选择空间，此处为不可编辑。该空间默认选择当天日期
>
> **截图：**
>
> ![文本](./images/vanke/日期.jpg)
>
> **编辑状态：**
>
> ![日期2](./images/vanke/日期2.jpg)
>
>
> **type:** `contract-vanke`
> 
> **描述：** 根据默认合同编号补充合同基本信息，
>
> **截图：**
>
> ![合同](./images/vanke/合同1.jpg)
>
> **操作：**  点击`补充`按钮，弹出合同信息补充弹框，点击 `文件` 可查看合同文件信息,再次点击`补充`可修改补充的信息
> 
> **截图：**
>
> ![合同1](./images/vanke/合同2.jpg)
>
> ![合同2](./images/vanke/合同3.jpg)
>
> ![合同3](./images/vanke/合同4.jpg)
>
> **type:** `pre-invoice`
>
> **描述：**  显示预录入发票及上传状态，根据 发票上传验证组件来改变状态,并计算发票金额总额
>
> **截图：**
>
> ![预补发票](./images/vanke/预补发票.jpg)
>
> ![预补发票1](./images/vanke/上传发票成功.jpg)
>
> **type:** `invoice-vanke`
>
> **描述：**  上传发票并查验（包含图片验证，和人工验证），批量上传前对图片进行MD5加密，进行过滤去重，当图片验证(`金蝶验证`)失败,可进行`手工查验`，并显示状态为`人工查验`。手工验证发票验证失败，手工录入函数金额。
>
> **操作：** 
>   1. 可批量上传、删除、图片查验，也可单张查验、删除。
>   2. 查验成功时隐藏查验功能。
>   3. 查验完成后自动计算函数金额。
>   4. 点击图片名称可查看发票信息。
> 
> **截图：**
> 
> ![发票上传查验](./images/vanke/发票上传查验.jpg)
> 
> **人工查验：**
>
> ![人工查验](./images/vanke/人工查验.jpg)
>
> ![人工查验1](./images/vanke/人工查验弹框.jpg)
>
> **人工查验失败：**
> 
> ![人工查验失败](./images/vanke/人工查验手输金额.jpg)
>
> **type:** `money`
> 
> **描述：**  该组件在此业务为不可编辑状态。输入金额可对数字进行三位分割格式化，并显示中文大写金额。
> 
> **截图：**
>
> ![金额](./images/vanke/金额1.jpg)
>
> **可编辑状态：**
>
> ![金额1](./images/vanke/金额2.jpg)
>
> **type:** `mfile`
>
> **描述：** 可多张上传图片，并对图片进行压缩
>
> **操作：** 点击 `选择`按钮上传本地图片文件，点击文件名可查看文件，并可旋转保存文件
> 
> **截图：**
> 
> ![文件上传](./images/vanke/多文件上传.jpg)
>
> **上传完成：**
>
> ![上传完成](./images/vanke/多文件上传1.jpg)
>
> **查看文件：**
>
> ![查看文件](./images/vanke/查看文件.jpg)
>
> ###### **提交**
> **操作：** 点击 `提交`按钮进入复核页面
> 
> **type:** `contract-vanke`
>
> **描述：** 展示合同信息 
>
> **操作：** 点击文件查看合同信息
> 
> **截图：**
> 
> ![合同展示](./images/vanke/合同展示.jpg)
>
> **type:**  `invoice-vanke`
>
> **描述：**  展示上部提交发票列表信息，并计算总额，点击图片名称可查看发票信息
>
> **截图：** 
> 
> ![发票展示](./images/vanke/发票列表展示.jpg)
>
> **type:**  `mfile`
>
> **描述：**  展示多选上传图片文件，点击文件名可查看文件信息
>
> **截图：** 
> 
> ![发票展示](./images/vanke/图片上传文件展示.jpg)
>
> 
> **操作：** 
>  1. 点击 `拒绝` 按钮可以回退到上一步骤。
>  2. 点击 `同意`，生成合同，并签署盖章。
>
> **截图：** `回退`
> 
> ![回退](./images/vanke/拒绝.jpg)
> 
> **合同生成并签署：** 
>  1. 在 `IFlowCustom` `路径：src/app/pages/console/record/flow.custom.ts` 根据`flowId`配置当前 `Financing6Flow` `路径：src/app/pages/console/record/custom/financing6.flow.ts` 流程。
>  2. `Financing6Flow`组件中 `preSubmit(svrConfig: any, formValue: any)`方法中加入合同获取api `api/record/record?method=pre_submit`
>  3. 打开合同查看、签署组件 `FinancingFactoringVankeModalComponent` `路径：src/app/public/modal/financing-factoring-vanke-modal-component.ts`，默认渲染第一份合同内容
>  4. 点击 `阅读并盖章`签署合同，当左侧合同列表，全部勾选签订完成 点击`完成`到下一流程。
>  
>  **截图：** `同意`
> 
> ![生成合同](./images/vanke/合同签署.jpg)
>
>##### **所在页面：** 保理商审核并签署合同
>
> **描述：** 展示上一步供应商签署的合同 。组件 `ContractComponent` `路径：src/app/pages/console/record/contract.component.ts`
>
> **操作：** 点击合同名称，查看合同，`PdfSignModalComponent` `路径：src/app/public/modal/pdf-sign-modal.component.ts`
>
> **截图：**
>
> ![合同列表](./images/vanke/合同列表查看.jpg)
>
> **type:** `contract-office`
>
> **描述：** 显示合同信息，并补录合同类型，可修改合同类型
>
> **操作：** 点击 `补录`按钮，弹出合同补录弹框 `ContractVankeEditModalComponent` `路径：src/app/public/modal/contract-vanke-edit-modal.component.ts`
>
> **截图：**
>
> ![合同类型选择](./images/vanke/合同类型选择.jpg)
>
> **补录类型：**
>
> ![补录类型](./images/vanke/合同类型选择1.jpg)
>
> **补录完成：**
>
> ![补录类型](./images/vanke/合同类型选择2.jpg)
>
>##### **保理上复核**
>
> **操作：**  点击 `同意` 同意按钮，获取供应商签署的合同，并查看签署。`IFlowCustom` 中配置流程信息，`FinancingSupplier6Flow` `路径：src/app/pages/console/record/custom/financing-supplier6.flow.ts`，`preSubmit(svrConfig: any, formValue: any)`获取合同信息。在`FinancingFactoringVankeModalComponent`
>
>##### **所在页面：** 上传付款计划-万科模式列表
> 
> **描述：** 申请信息 `登记编码、修改码` 补全，`出让人信息表`
> 
> **截图：** 
>
> ![付款计划](./images/vanke/上传付款计划.jpg)
>
>#####  **出让人信息登记：**
> 
> **type:** `assignor-info`
>
> **描述：** 上传文件对应出让人信息，验证是否一致
>
> **截图：** 
>
> ![出让人信息登记](./images/vanke/出让人信息登记.jpg)
>
> **type:** `assignor-info`
>
> **截图：** 复核展示信息 
>
> ![出让人信息登记1](./images/vanke/出让信息表1.jpg)
>
>#####  **应收账款转让信息：**
>
> **描述：** 补充 `登记编码、修改码`
>
> ![出让人信息登记1](./images/vanke/应收账款转让.jpg)
>
>#####  **付款管理：**
> 
> **组件：** `PaymentComponent` `路径：src/app/pages/console/manage/payment.component.ts` 
> 
> **描述：** `未付款确认(上传付款确认书)`=》`未打印付款确认(打印)`=》 `已打印待放款(上传汇款凭证)` =》`已放款(上传实际付款确认书*如需更正)`
>
> **操作：**  点击 `点击上传`跳转至上传付款确认书页面
>
> **截图：**
>
> ![确认书](./images/vanke/上传付款确认书.jpg)
>
> **描述：** 选择交易并批量打印，并添加 `起息日期`
>
> ![打印1](./images/vanke/打印1.jpg)
>
> ![打印2](./images/vanke/打印2.jpg)
>
> **描述：** 已打印待放款，上传 `上传汇款凭证`
>
> ![确认2](./images/vanke/确认汇款.jpg)
>
> ![确认2](./images/vanke/汇款凭证.jpg)
>
> **描述：** 如 `需要更正` `上传实际付款确认书`，同 `上传付款确认书(新增，不覆盖原来上传)`
>
> ![确认2](./images/vanke/实际付款申请.jpg)
>
> ![确认2](./images/vanke/上传实际付款确认书.jpg)
>
> ##### **所在页面：** 资产池
>
> **描述：** 针对万科模式交易单的资产打包
> 
> **操作：**
> 1. `添加` 新增资产池，`下载Excel` 万科模式没有录入资产池的数据
> 2. `查看` 查看该资金池的所有交易单
> 3. `添加` 添加交易单到该资产池
> 4. `移除` 移除该资金池的某笔交易单
> 5. `锁定` 不可修改该资金池内容
>
> **组件：** `查看` `添加` `移除` 跳转至   `CapitalPoolCommListComponent` `路径：src/app/public/component/capital-pool-comm-list.component.ts` ` buildParams()`方法中配置参数。`查看` 和 `移除` 根据资产池`id`查询。`添加`根据 交易模式 `3 or 6` 和`是否是资金池`查询。
>
> ![资产池](./images/vanke/资产池.jpg)
>
> **描述：** 查看该资金池内容
>
> **截图：**
> ![查看](./images/vanke/查看1.jpg)
> 
> **组件：**
> 
> ![查看资金池](./images/vanke/查看资金池数据.jpg)
>
> **描述：** 添加交易至该资金池
>
> **截图：**
> 
> ![添加](./images/vanke/添加.jpg)
>
> **描述：** 移除资金池中的交易
>
> ![移除](./images/vanke/移除.jpg)
>
> **描述：** 锁定该资金池后，只可查看
>
> ![移除](./images/vanke/锁定.jpg)
>
> ##### **所在页面:** 生成应收账款回执-world下载列表
>
> **描述：** 展示所有交易，并生成word文件
>
> **操作：** 
> 1. `下载付款计划表摸板`,下载标准摸板，补充数据后 `上传Excel`
>
> ![world](./images/vanke/vankeWorlddown.jpg)
>
>
> ![world1](./images/vanke/word列表.jpg)
>
>
>
>
>
>


