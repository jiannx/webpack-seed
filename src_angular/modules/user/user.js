import app from 'app.config';
import './user-teacher.js';
import './user-teacher-detail.js';
import './user-student.js';
import './user-student-detail.js';
import './user-service.js';

// 用户管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.user', {
      url: 'user',
      abstract: true
    })
    // 教师管理
    .state('index.user.teacher', {
      url: '/teacher',
      views: {
        'console@index': { template: require('./user-teacher.html') }
      }
    })
    // 教师管理 审核及详情
    .state('index.user.teacher.detail', {
      url: '/detail?id?type',
      views: {
        'console@index': { template: require('./user-teacher-detail.html') }
      }
    })
    // 学生管理
    .state('index.user.student', {
      url: '/student',
      views: {
        'console@index': { template: require('./user-student.html') }
      }
    })
    .state('index.user.student.detail', {
      url: '/detail?id',
      views: {
        'console@index': { template: require('./user-student-detail.html') }
      }
    })
    // 客服管理
    .state('index.user.service', {
      url: '/service',
      views: {
        'console@index': { template: require('./user-service.html') }
      }
    })
    // 客服管理 添加
    .state('index.user.service.add', {
      url: '/add',
      views: {
        'console@index': { template: require('./user-service-add.html') }
      }
    })
    // 客服管理 详情
    .state('index.user.service.detail', {
      url: '/detail',
      views: {
        'console@index': { template: require('./user-service-detail.html') }
      }
    });
}).service('userService', () => {
  this.name = 'userService';
});
