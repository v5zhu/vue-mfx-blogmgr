const _import = require('./_import_' + process.env.NODE_ENV);
import BackFull from '@/containers/BackFull';


export const subscribeRouterMap = [
    {
        path: '/admin/mgr/subscribe',
        redirect: '/admin/mgr/subscribe/service',
        name: '订阅管理',
        component: BackFull,
        hidden: false,
        children: [
            {
                path: '/admin/mgr/subscribe/service',
                name: '订阅服务',
                icon: 'person',
                component: _import('mgr/subscribe/SubscribeService')
            }
        ]
    }
]
