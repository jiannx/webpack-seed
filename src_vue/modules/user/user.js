import html from './user.html';
import my from './user-my';
import myCourseDetail from './user-my-detail';
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
routes.push(myCourseDetail);

export default routes;
