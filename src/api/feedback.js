import fetch from 'utils/fetch';

export function addFeedback(feedback) {
    return fetch({
        url: '/blogmgr/feedback',
        method: 'post',
        data: feedback
    });
}
