const _import = require('./_import_' + process.env.NODE_ENV);
import Full from '@/containers/BackFull';


export const articleMgrRouterMap = [
    {
        path: '/systemmgr/mgr/blog',
        name: '博客管理',
        icon: 'ios-book',
        redirect: '/systemmgr/mgr/blog/article',
        component: Full,
        hidden: false,
        children: [
            {
                path: '/systemmgr/mgr/blog/article',
                name: '文章管理',
                icon: 'edit',
                component: _import('mgr/ArticleMgr'),
                hidden: false
            }, {
                path: '/systemmgr/mgr/blog/article/edit/:id',
                name: '文章编辑',
                icon: 'stats-bars',
                component: _import('mgr/ArticleEdit'),
                hidden: true
            }, {
                path: '/systemmgr/mgr/blog/article/publish',
                name: '文章发表',
                icon: 'stats-bars',
                component: _import('mgr/ArticleEdit'),
                hidden: true
            }, {
                path: '/systemmgr/mgr/blog/tag',
                name: '我的标签',
                icon: 'ios-pricetags',
                component: _import('mgr/Tag'),
                hidden: false,
            }, {
                path: '/systemmgr/mgr/blog/category',
                name: '我的分类',
                icon: 'network',
                component: _import('mgr/Category'),
                hidden: false,
            }
        ]
    },
    {
        path: '/systemmgr/mgr/article/preview/:id',
        name: '文章预览',
        icon: 'stats-bars',
        hidden: true,
        redirect: '/systemmgr/mgr/article/preview/:id/',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: '/systemmgr/mgr/article/preview/:id/',
                name: '文章预览',
                icon: 'stats-bars',
                hidden: true,
                component: _import('mgr/ArticlePreview')
            }
        ]
    }
]