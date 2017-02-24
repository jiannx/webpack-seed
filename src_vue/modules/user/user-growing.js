import html from './user-growing.html';

const page = {
  template: html,
  created: function() {},
  data: function() {
    return {
      name: 'user-growing',
    };
  }
};

export default {
  path: '/user/growing',
  component: page
};
