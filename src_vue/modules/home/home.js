import html from './home.html';
import { dialog } from '../../components/components.js';

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
