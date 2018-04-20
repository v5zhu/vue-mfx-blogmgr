import fetch from 'utils/fetch';

export function register(user) {
    return fetch({
        url: '/systemmgr/user/register',
        method: 'post',
        data: user
    });
}

export function login(loginData) {
    return fetch({
        url: '/systemmgr/user/login',
        method: 'put',
        data: loginData
    });
}

export function setUserRole(data) {
    return fetch({
        url: '/systemmgr/admin/user/role.token',
        method: 'put',
        data: data
    });
}

export function listUser(params) {
    return fetch({
        url: '/systemmgr/admin/user/list.token',
        method: 'get',
        params: params
    });
}


export function modifyUser(user) {
    return fetch({
        url: '/systemmgr/user/modify.token',
        method: 'put',
        data: user
    });
}

export function deleteUser(id) {
    return fetch({
        url: '/systemmgr/admin/delete/user/' + id + '.token',
        method: 'delete'
    });
}

export function modifyPassword(user) {
    return fetch({
        url: '/systemmgr/user/password/modify.token',
        method: 'put',
        data: user
    });
}

export function loginByEmail(loginName, password) {
    const data = {
        loginName,
        password
    };
    return fetch({
        url: '/systemmgr/admin/login',
        method: 'post',
        data
    });
}

export function logout(token) {
    return fetch({
        url: '/systemmgr/user/logout.token',
        method: 'put',
        params: token
    });
}

export function getInfo(token) {
    return fetch({
        url: '/systemmgr/admin/userInfo',
        method: 'get',
        params: {token}
    });
}

export function getAuthorInfo(params) {
    return fetch({
        url: '/systemmgr/author',
        method: 'get',
        params: params
    });
}


