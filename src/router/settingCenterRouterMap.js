const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';


export const settingCenterRouterMap = [
    {
        path: '/systemmgr/mgr/setting',
        redirect: '/systemmgr/mgr/setting/userinfo',
        name: '设置中心',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/systemmgr/mgr/setting/userinfo',
                name: '个人信息',
                icon: 'person',
                component: _import('mgr/setting/Userinfo')
            },
            {
                path: '/systemmgr/mgr/setting/password',
                name: '修改密码',
                icon: 'ios-locked',
                component: _import('mgr/setting/Password')
            }
        ]
    }
]
