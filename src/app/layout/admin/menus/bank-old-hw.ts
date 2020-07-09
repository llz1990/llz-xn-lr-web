import { Menu } from './interface';

/**
  * type66Menu  银行角色 （旧版hw模式） orgtype:66
  */
export const BANKOLDHW: Menu[] = [
    {
        label: '我的交易', css: 'fa-suitcase',
        children: [
            {
                label: '定向收款保理', css: 'fa-suitcase',
                children: [
                    { label: '记录列表', url: '/console/record/record/financing_bank10' },
                ]
            },
        ]
    },
];
