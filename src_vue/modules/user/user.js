import html from './user.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'user',
        };
    }
};

export default {
    path: '/user',
    component: page
};
