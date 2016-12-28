import app from 'app.config';

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
        // 学生管理
        .state('index.user.student', {
            url: '/student',
            views: {
                'console@index': { template: require('./user-student.html') }
            }
        })
        // 客服管理
        .state('index.user.service', {
            url: '/service',
            views: {
                'console@index': { template: require('./user-service.html') }
            }
        });
}).service('userService', () => {
    this.name = 'userService';
});
