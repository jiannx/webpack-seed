import html from './home.html';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'home',
            course: new Array(8),
            active: new Array(4)
        };
    }
};

export default [{
    path: '/home',
    component: page
}];
