const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';


export const logRouterMap = [
    {
        path: '/systemmgr/mgr/log',
        redirect: '/systemmgr/mgr/log/monitor',
        name: '日志监控',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/systemmgr/mgr/log/monitor',
                name: '日志监控',
                icon: 'ios-paw-outline',
                component: _import('mgr/log/LogMonitor')
            }
        ]
    }
]
