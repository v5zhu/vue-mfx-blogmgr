import fetch from 'utils/fetch';


export function listRoutesTree(params) {
    return fetch({
        url: '/blogmgr/admin/route/tree.token',
        method: 'get',
        params: params
    });
}

export function listRoute(params) {
    return fetch({
        url: '/blogmgr/admin/route/list.token',
        method: 'get',
        params: params
    });
}


export function listFrontRoute(params) {

    return fetch({
        url: '/blogmgr/route/list.open',
        method: 'get',
        params: params
    });
}

export function getRouteById(id) {
    return fetch({
        url: '/blogmgr/admin/route/' + id + '.token',
        method: 'get'
    });
}

export function addRoute(data) {
    return fetch({
        url: '/blogmgr/admin/route.token',
        method: 'post',
        data: data
    });
}


export function editRoute(data) {
    return fetch({
        url: '/blogmgr/admin/route.token',
        method: 'put',
        data: data
    });
}

export function deleteRoute(id) {
    return fetch({
        url: '/blogmgr/admin/route/' + id + '.token',
        method: 'delete'
    });
}




