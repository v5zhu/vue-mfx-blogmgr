import fetch from 'utils/fetch';

export function deleteLog(id) {
    return fetch({
        url: '/blogmgr/admin/log/delete/' + id + '.token',
        method: 'delete'
    });
}


export function logList(params) {
    return fetch({
        url: '/blogmgr/admin/log/list.token',
        method: 'get',
        params: params
    });
}
