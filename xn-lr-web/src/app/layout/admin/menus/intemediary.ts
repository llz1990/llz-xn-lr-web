import { Menu } from './interface';

/**
 * 中介角色  orgType:102 金地模式、新万科
 */
export const INTERMEDIARY: Menu[] = [
    {
        label: 'ABS资产管理', css: 'fa-money',
        children: [
            { label: '资产池', url: '/console/capital-pool' },
        ]
    },
    {
        label: '资产管理', css: 'fa-suitcase',
        children: [
            { label: '项目管理', url: '/dragon/vanke/project-management' },
        ]
    }
];
