import fetch from 'utils/fetch';

export function register(user) {
    return fetch({
        url: '/blogmgr/user/register',
        method: 'post',
        data: user
    });
}

export function login(loginData) {
    return fetch({
        url: '/blogmgr/user/login',
        method: 'put',
        data: loginData
    });
}

export function setUserRole(data) {
    return fetch({
        url: '/blogmgr/admin/user/role.token',
        method: 'put',
        data: data
    });
}

export function listUser(params) {
    return fetch({
        url: '/blogmgr/admin/user/list.token',
        method: 'get',
        params: params
    });
}


export function modifyUser(user) {
    return fetch({
        url: '/blogmgr/user/modify.token',
        method: 'put',
        data: user
    });
}

export function deleteUser(id) {
    return fetch({
        url: '/blogmgr/admin/delete/user/' + id + '.token',
        method: 'delete'
    });
}

export function modifyPassword(user) {
    return fetch({
        url: '/blogmgr/user/password/modify.token',
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
        url: '/blogmgr/admin/login',
        method: 'post',
        data
    });
}

export function logout(token) {
    return fetch({
        url: '/blogmgr/user/logout.token',
        method: 'put',
        params: token
    });
}

export function getInfo(token) {
    return fetch({
        url: '/blogmgr/admin/userInfo',
        method: 'get',
        params: {token}
    });
}

export function getAuthorInfo(params) {
    return fetch({
        url: '/blogmgr/author',
        method: 'get',
        params: params
    });
}


