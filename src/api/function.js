import fetch from 'utils/fetch';

export function listFunctionsByRoute(params) {
    return fetch({
        url: '/systemmgr/admin/function/listByRoute.token',
        method: 'get',
        params: params
    });
}

export function listFunction(params) {
    return fetch({
        url: '/systemmgr/admin/function/list.token',
        method: 'get',
        params: params
    });
}

export function addFunction(data) {
    return fetch({
        url: '/systemmgr/admin/function.token',
        method: 'post',
        data: data
    });
}


export function editFunction(data) {
    return fetch({
        url: '/systemmgr/admin/function.token',
        method: 'put',
        data: data
    });
}

export function deleteFunction(id) {
    return fetch({
        url: '/systemmgr/admin/function/' + id + '.token',
        method: 'delete'
    });
}




