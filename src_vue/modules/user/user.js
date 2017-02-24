import html from './user.html';
import my from './user-my';
import growing from './user-growing';
import myCourseDetail from './user-my-detail';
import myCourseDetailLink from './user-my-detail-link';

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
routes.push(myCourseDetailLink);

export default routes;
