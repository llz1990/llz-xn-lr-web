
# XnOaWeb

### tables.ts的配置说明

tables.ts里是针对DataTable的一些配置，与xn-input的还有点差异

```js
configs = {
    'flow': {
        url: '/flow/flow',  // 请求后端的地址
        allowCreate: false, // 在DataTable里是否显示新建按钮
        allowUpdate: false, // 在DataTable里是否显示修改按钮
        allowDelete: false, // 在DataTable里是否显示删除按钮
        keys: ['flowId'],   // 对应后台db中的主键字段，不包括appId 
        fields: [
            {
                label: '流程ID',  // 字段标题
                name: 'flowId',  // 字段对应的后台字段
                memo: '描述信息', // 字段附加描述
                type: 'select',   // 字段类型，默认text，要符合DataTableEditor的定义
                // placeholder: '请选择流程', // type为select时，在editor中 select会出现的placeholder
                required: false,  // 是否必填, 默认true
                inColumn: false,  // 是否在table中显示，默认true
                inEditor: false,  // 是否在editor中出现，默认true
                denyCreate: true, // 该字段在新增时禁止填写，默认false
                denyUpdate: true, // 该字段在修改时禁止编辑，默认false
                selectOptions: 'required',
                render: Tables.timeRender,  // 该字段在table中显示的自定义显示方法
                def: 1, // editor编辑时的初始值,
                options: {
                    memoLink: {   // editor编辑时，该字段的memo会根据cancelFlag字段的内容而变化，具体值是从selectOptions字段里得到的
                        field: 'cancelFlag',
                        selectOptions: 'selectOptionsMemo'
                    }
                }
            }
        ],
        order: ['sortOrder'],   // 初始的DataTable的排序字段，默认升序，降序是['sortOrder', 'desc']
        selectOptions: 'required', // 如果是以@开头，表示是从响应数据的selectOptions里，否则是从web前端的全局selectOptions找  
        formatLabelValue: function(data) {    // 用于data-picker的配置需要提供该函数
            return { label: data.name, value: data.id }
        },
    }
}
```

### 用于xn-input的字段配置

```js
fields = [
    {
        title: '企业证件类型', // 字段标题
        name: 'orgCodeType', // 字段对应的后台字段
        memo: '手机号即为登录帐号', // 字段附加描述
        type: 'text',   // 字段类型，text/radio/select/picker/textarea/file/dselect/password/sms，默认text      
        required: true, // 是否必填，默认true
        readonly: true,  // 该字段是否只读，默认false
        selectOptions: 'orgCodeType', // type=radio/select/dselect时有效。
                                      // 从web前端的全局selectOptions找
        def: 1,  // 默认值
        validators: {  // 验证器
            email: true,    // 是邮件地址
            mobile: true,   // 是11位手机号码
            minlength: 6,   // 最小长度
            maxlength: 20,  // 最大长度
            equal: {  // 内容要等于accountToken字段
                name: 'accountToken',
                error: '两次的密码要一致'
            },
            sms: {  // 该字段是短信验证码字段，需要先填写accountId字段（手机号）
                name: 'accountId',
                error: '请先填写正确的管理员手机号码'
            },
        },
        options: {
            memoLink: ['orgCodeType', '_selectOptionsMemo'], // 根据orgCodeType字段的值变化显示不同的memo
            titleLink: ['orgCodeType', '_selectOptionsTitle'], // 根据orgCodeType字段的值变化显示不同的title
            showWhen: ['type', '1'], // 根据type字段的值变化来显隐,
        },
        valueChanges: [   // valueChanges仅由前端来添加，后端无法返回此值
            { on: '@form', action: function() {} },  // form值发生变化
            { on: '@this', action: function() {} },  // 本字段发生变化
            { on: '要监听的字段', action: function() {} }  // 其他字段发生变化
        ]
    }
]
```
