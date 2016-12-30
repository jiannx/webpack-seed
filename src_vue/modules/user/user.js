import html from './user.html';
import my from './user-my';
import growing from './user-growing';

const page = {
    template: html,
    created: function() {},
    data: function() {
        return {
            name: 'user',
        };
    }
};

let routes = [{
    path: '/user',
    component: page
}];

routes.push(my);
routes.push(growing);

export default routes;
