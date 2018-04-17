import fetch from 'utils/fetch';

const url_prefix = '/timetask';

export function listTask(params) {
    return fetch({
        url: url_prefix + '/admin/tasks.token',
        method: 'get',
        params: params
    });
}


export function addTask(data) {
    return fetch({
        url: url_prefix + '/admin/task.token',
        method: 'post',
        data: data
    });
}


export function editTask(data) {
    return fetch({
        url: url_prefix + '/admin/task/edit.token',
        method: 'put',
        data: data
    });
}


export function switchTaskStatus(params) {
    return fetch({
        url: url_prefix + '/admin/task/' + params.id + '/status.token',
        method: 'put',
        params: {cmd: params.cmd}
    });
}

export function deleteTask(taskId) {
    return fetch({
        url: url_prefix + '/admin/task/delete/' + taskId + '.token',
        method: 'delete'
    });
}


export function listComponentsName() {
    return fetch({
        url: url_prefix + '/admin/mfxcomponent/list.token',
        method: 'get'
    });
}

export function getClassFullName(params) {
    return fetch({
        url: url_prefix + '/admin/mfxcomponent/fullname.token',
        method: 'get',
        params: params
    });
}

export function listClassMethods(params) {
    return fetch({
        url: url_prefix + '/admin/mfxcomponent/methods.token',
        method: 'get',
        params: params
    });
}




