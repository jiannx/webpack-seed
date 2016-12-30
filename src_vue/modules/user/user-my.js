import html from './user-my.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'user-my',
        };
    }
};

export default {
    path: '/user/my',
    component: page
};
