import html from './home.html';

const page = {
    template: html,
    created: function() {
    },
    data: function() {
        return {
            name: 'home'
        };
    }
};

export default {
    path: '/home',
    component: page
};
