import fetch from 'utils/fetch';

export function addFeedback(feedback) {
    return fetch({
        url: '/systemmgr/feedback',
        method: 'post',
        data: feedback
    });
}
