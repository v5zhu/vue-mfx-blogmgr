import fetch from 'utils/fetch';

export function roleTree() {
    return fetch({
        url: '/blogmgr/admin/role/tree.token',
        method: 'get'
    });
}

export function listRole(params) {
    return fetch({
        url: '/blogmgr/admin/role/list.token',
        method: 'get',
        params: params
    });
}


export function addRole(data) {
    return fetch({
        url: '/blogmgr/admin/role.token',
        method: 'post',
        data: data
    });
}


export function editRole(data) {
    return fetch({
        url: '/blogmgr/admin/role.token',
        method: 'put',
        data: data
    });
}

export function deleteRole(id) {
    return fetch({
        url: '/blogmgr/admin/role/' + id + '.token',
        method: 'delete'
    });
}




