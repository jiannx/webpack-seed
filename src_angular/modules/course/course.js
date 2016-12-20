import app from 'app.config';

// 课程管理模块
app.config(($stateProvider) => {
    $stateProvider.state('course', {
            url: '/course',
            template: require('../console.html'),
            abstract: true
        })
        // 课程列表
        .state('course.list', {
            url: '/list',
            views: {
                'console': { template: require('./course-list.html') }
            }
        })
        // 课程详情
        .state('course.detail', {
            url: '/detail',
            views: {
                'console': { template: require('./course-detail.html') }
            }
        })
        // 课程审核
        .state('course.check', {
            url: '/check',
            views: {
                'console': { template: require('./course-detail.html') }
            }
        });
}).service('courseService', () => {
    this.name = 'courseService';
});
