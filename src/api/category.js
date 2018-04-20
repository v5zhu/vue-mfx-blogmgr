import fetch from 'utils/fetch';

export function categoryList(token) {
    return fetch({
        url: '/systemmgr/admin/category/list.token',
        method: 'get',
        params: {token}
    });
}

export function categoryAdd(category) {
    return fetch({
        url: '/systemmgr/admin/category/save',
        method: 'post',
        data: category
    });
}

