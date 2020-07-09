import { Menu } from './interface';

/**
 *  保理商角色，用户权限为查看权限
 */
export const ViewPermission: Menu[] = [
    {
        "label": "我的交易",
        "css": "fa-suitcase",
        "children": [
            {
                "label": "所有交易",
                "url": "/console/main-list/list"
            }
        ]
    }
];