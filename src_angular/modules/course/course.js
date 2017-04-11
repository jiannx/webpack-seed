import app from 'app.config';

import './course.scss';
import './course-list.js';
import './course-detail.js';
import './course-join.js';
import './course-join-detail.js';

// 课程管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.course', {
      url: 'course',
      template: require('../console.html'),
      abstract: true
    })
    // 课程列表
    .state('index.course.list', {
      url: '/list',
      views: {
        'console@index': { template: require('./course-list.html') }
      }
    })
    // 课程详情
    .state('index.course.detail', {
      url: '/detail?id?type',
      views: {
        'console@index': { template: require('./course-detail.html') }
      }
    })
    // 课程审核
    .state('index.course.check', {
      url: '/check',
      views: {
        'console@index': { template: require('./course-detail.html') }
      }
    })
    // 报名查看
    .state('index.course.join', {
      url: '/join',
      views: {
        'console@index': { template: require('./course-join.html') }
      }
    })
    // 报名查看 详情
    .state('index.course.join.detail', {
      url: '/detail/:id',
      views: {
        'console@index': { template: require('./course-join-detail.html') }
      }
    });
}).service('courseService', () => {
  this.name = 'courseService';
});
