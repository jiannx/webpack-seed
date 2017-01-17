import app from 'app.config';

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
            url: '/detail',
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
        .state('index.enter-name', {
            url: '/enter-name',
            views: {
                'console@index': { template: require('./enter-name.html') }
            }
        });
}).service('courseService', () => {
    this.name = 'courseService';
});
