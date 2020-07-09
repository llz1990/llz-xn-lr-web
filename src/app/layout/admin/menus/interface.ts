export interface Menu {
    /** 菜单名称 */
    label: string;
    /** 菜单路径 */
    url?: string;
    /** 菜单 icon 样式 */
    css?: string;
    isSupply?: boolean;
    customFlow?: string;
    isEstate?: boolean;
    dcType?: string;
    /** 总部公司 */
    isHeadQuarter?: boolean;
    /** 项目公司 */
    isProject?: boolean;
    enterpriseType?: string;
    isAdmin?: boolean;
    isPlatformAdmin?: boolean;
    isFactoringAdmin?: boolean;
    /** 多保理商：所属保理商可见*/
    ofFactoring?: string[];
    /** 与默认 url 选中高亮等效的 urls */
    activeGroups?: string[];
    /** 子级菜单 */
    children?: Menu[];
}

export const PUBLIC_MENU = {
    '我的资料': {
        label: '我的资料', css: 'fa-info-circle',
        children: [
            { label: '企业资料', url: '/console/record/info' },
            { label: '发票管理', url: '/console/invoice-list/list', isAdmin: true },
            { label: '银行账号管理', url: '/console/bank-card/list', isAdmin: true },
        ]
    },

    '管理功能': {
        label: '管理功能', css: 'fa-user-circle-o', isAdmin: true,
        children: [
            { label: '审核机构创建', url: '/console/record/create_auth', isPlatformAdmin: true },
            { label: '用户管理', url: '/console/manage/user-manage', isAdmin: true },
            { label: '门户管理', url: '/console/manage/portal-manage', isPlatformAdmin: true },
            { label: '角色权限', url: '/console/manage/role-manage', isFactoringAdmin: true },
            { label: '白名单管理', url: '/console/manage/white-list-manage', isPlatformAdmin: true },
            { label: '接口管理', url: '/console/manage/power-manage', isPlatformAdmin: true },
        ]
    },

    '区块链数据': { label: '区块链数据', url: '/console/blockchain/home' },
    '所有交易': { label: '所有交易', url: '/console/main-list/list' },
    Avenger: { label: '交易列表', url: '/console/main/dragon/dragon-list' },
    FactoringList: { label: '交易列表', url: '/console/main/dragon/dragon-list' }
};
