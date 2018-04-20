import fetch from 'utils/fetch';

export function linkList(token) {
    return fetch({
        url: '/systemmgr/links',
        method: 'get',
        params: {token}
    });
}
