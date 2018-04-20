import fetch from 'utils/fetch';

export function recordMilestone(milestone) {
    return fetch({
        url: '/systemmgr/milestone/record.token',
        method: 'post',
        data: milestone
    });
}

export function modifyMilestone(milestone) {
    return fetch({
        url: '/systemmgr/milestone/modify.token',
        method: 'put',
        data: milestone
    });
}

export function completeMilestone(id) {
    return fetch({
        url: '/systemmgr/complete/milestone/' + id + '.token',
        method: 'put'
    });
}

export function deleteMilestone(id) {
    return fetch({
        url: '/systemmgr/milestone/' + id + '.token',
        method: 'delete'
    });
}


export function milestoneList(params) {
    return fetch({
        url: '/systemmgr/milestone/list.open',
        method: 'get',
        params: params
    });
}
