import fetch from 'utils/fetch';

export function settingRolePermission(data) {
    return fetch({
        url: '/blogmgr/admin/role/permission.token',
        method: 'post',
        data: data
    });
}

export function addRolePermission(data) {
    return fetch({
        url: '/blogmgr/admin/role/permission.token',
        method: 'post',
        data: data
    });
}


export function deleteRolePermission(roleId, permissionId) {
    return fetch({
        url: '/blogmgr/admin/role/' + roleId + 'permission/' + permissionId + '.token',
        method: 'delete'
    });
}




