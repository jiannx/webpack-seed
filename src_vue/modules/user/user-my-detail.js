import html from './user-my-detail.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'user-my-detail',
        };
    }
};

export default {
    path: '/user/my/detail',
    component: page
};
