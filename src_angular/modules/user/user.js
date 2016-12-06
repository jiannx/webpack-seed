import app from 'app.config';

// 用户管理模块
app.config(($stateProvider) => {
    $stateProvider.state('user', {
            url: '/user',
            abstract: true
        })
        // 教师管理
        .state('user.teacher', {
            url: '/teacher',
            views: {
                '@': { template: require('./user-teacher.html') }
            }
        })
        // 学生管理
        .state('user.student', {
            url: '/student',
            views: {
                '@': { template: require('./user-student.html') }
            }
        })
        // 客服管理
        .state('user.service', {
            url: '/service',
            views: {
                '@': { template: require('./user-service.html') }
            }
        });
}).service('userService', () => {
    this.name = 'userService';
});
