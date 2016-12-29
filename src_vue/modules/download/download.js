import html from './download.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'download',
        };
    }
};

export default {
    path: '/download',
    component: page
};
