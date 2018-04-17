import fetch from 'utils/fetch';

export function linkList(token) {
    return fetch({
        url: '/blogmgr/links',
        method: 'get',
        params: {token}
    });
}
