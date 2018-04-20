import fetch from 'utils/fetch';


export function listRoutesTree(params) {
    return fetch({
        url: '/systemmgr/admin/route/tree.token',
        method: 'get',
        params: params
    });
}

export function listRoute(params) {
    return fetch({
        url: '/systemmgr/admin/route/list.token',
        method: 'get',
        params: params
    });
}


export function listFrontRoute(params) {

    return fetch({
        url: '/systemmgr/route/list.open',
        method: 'get',
        params: params
    });
}

export function getRouteById(id) {
    return fetch({
        url: '/systemmgr/admin/route/' + id + '.token',
        method: 'get'
    });
}

export function addRoute(data) {
    return fetch({
        url: '/systemmgr/admin/route.token',
        method: 'post',
        data: data
    });
}


export function editRoute(data) {
    return fetch({
        url: '/systemmgr/admin/route.token',
        method: 'put',
        data: data
    });
}

export function deleteRoute(id) {
    return fetch({
        url: '/systemmgr/admin/route/' + id + '.token',
        method: 'delete'
    });
}




