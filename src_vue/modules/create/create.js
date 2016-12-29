import html from './create.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'create',
        };
    }
};

export default {
    path: '/create',
    component: page
};
