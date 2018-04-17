import fetch from 'utils/fetch';

export function articleList(pageInfo) {
    return fetch({
        url: '/blogmgr/admin/article/list.token',
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
        url: '/blogmgr/articles',
        method: 'get',
        params: params
    });
}

export function articlePreview(id) {
    return fetch({
        url: '/blogmgr/admin/article/preview/' + id + ".token",
        method: 'get',
        params: {}
    });
}

export function articleDetail(path) {
    return fetch({
        url: '/blogmgr/admin/article/detail/' + path + ".open",
        method: 'get',
        params: {}
    });
}

export function articlePublish(article) {
    return fetch({
        url: '/blogmgr/admin/article/publish.token',
        method: 'post',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleEdit(article) {
    return fetch({
        url: '/blogmgr/admin/article/modify.token',
        method: 'put',
        data: article,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function articleAudit(auditInfo) {
    return fetch({
        url: '/blogmgr/admin/article/audit.token',
        method: 'put',
        params: {
            articleId: auditInfo.articleId,
            status: auditInfo.status
        },
    });
}

export function articleDelete(id) {
    return fetch({
        url: '/blogmgr/admin/article/delete.token',
        method: 'delete',
        params: id,
    });
}


export function updateStatistics(statistics) {
    return fetch({
        url: '/blogmgr/article/statistics',
        method: 'put',
        data: statistics
    });
}

