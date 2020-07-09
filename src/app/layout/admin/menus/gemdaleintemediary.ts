import { Menu } from './interface';

/**
 * 金地模式下的中介角色  orgType:102
 */
export const GEMDALEINTERMEDIARY: Menu[] = [{
    label: 'ABS资产管理', css: 'fa-money',
    children: [
        { label: '资产池', url: '/console/capital-pool' },
    ]
}];
