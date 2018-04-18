const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';



export const systemMgrRouterMap = [
    {
        path: '/systemmgr/mgr/system',
        redirect: '/systemmgr/mgr/system/user',
        name: '系统管理',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/systemmgr/mgr/system/user',
                name: '用户管理',
                icon: 'ios-people',
                component: _import('mgr/user/User')
            },
            {
                path: '/systemmgr/mgr/system/role',
                name: '角色管理',
                icon: 'ios-body',
                component: _import('mgr/role/Role')
            },
            {
                path: '/systemmgr/mgr/system/route',
                name: '路由管理',
                icon: 'ios-photos-outline',
                component: _import('mgr/route/Route')
            },
            {
                path: '/systemmgr/mgr/system/function',
                name: '功能管理',
                icon: 'ios-bolt',
                component: _import('mgr/function/Function')
            },
            {
                path: '/systemmgr/mgr/system/permission',
                name: '权限管理',
                icon: 'ios-locked-outline',
                component: _import('mgr/permission/Permission')
            },
            {
                path: '/systemmgr/mgr/system/milestone',
                name: '历程记录',
                icon: 'ios-clock',
                component: _import('mgr/milestone/Milestone')
            },
            {
                path: '/systemmgr/mgr/system/task',
                name: '任务管理',
                icon: 'flash-off',
                component: _import('mgr/task/Task')
            }
        ]
    }
]
