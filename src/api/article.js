import fetch from 'utils/fetch';

export function articleList(pageInfo) {
    return fetch({
        url: '/systemmgr/admin/article/list.token',
        method: 'post',
        data: {
            pageNum: pageInfo.pageNum,
            pageSize: pageInfo.pageSize,
            sort: pageInfo.sort,
            queryParam: pageInfo.queryParam
        }
    });
}

export function articles(params) {
    return fetch({
        url: '/systemmgr/articles',
        method: 'get',
        params: params
    });
}

export function articlePreview(id) {
    return fetch({
        url: '/systemmgr/admin/article/preview/' + id + ".token",
        method: 'get',
        params: {}
    });
}

export function articleDetail(path) {
    return fetch({
        url: '/systemmgr/admin/article/detail/' + path + ".open",
        method: 'get',
        params: {}
    });
}

export function articlePublish(article) {
    return fetch({
        url: '/systemmgr/admin/article/publish.token',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleEdit(article) {
    return fetch({
        url: '/systemmgr/admin/article/modify.token',
        method: 'put',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleAudit(auditInfo) {
    return fetch({
        url: '/systemmgr/admin/article/audit.token',
        method: 'put',
        params: {
            articleId: auditInfo.articleId,
            status: auditInfo.status
        },
    });
}

export function articleDelete(id) {
    return fetch({
        url: '/systemmgr/admin/article/delete.token',
        method: 'delete',
        params: id,
    });
}


export function updateStatistics(statistics) {
    return fetch({
        url: '/systemmgr/article/statistics',
        method: 'put',
        data: statistics
    });
}

