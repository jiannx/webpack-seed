import html from './user-my-detail-link.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'user-my-detail-lin',
        };
    }
};

export default {
    path: '/user/my/detail/link',
    component: page
};
