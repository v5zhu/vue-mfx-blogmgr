import fetch from 'utils/fetch';

export function settingRolePermission(data) {
    return fetch({
        url: '/systemmgr/admin/role/permission.token',
        method: 'post',
        data: data
    });
}

export function addRolePermission(data) {
    return fetch({
        url: '/systemmgr/admin/role/permission.token',
        method: 'post',
        data: data
    });
}


export function deleteRolePermission(roleId, permissionId) {
    return fetch({
        url: '/systemmgr/admin/role/' + roleId + 'permission/' + permissionId + '.token',
        method: 'delete'
    });
}




