import app from 'app.config';
import './account-list';


// 权限管理模块
app.config(($stateProvider) => {
    $stateProvider.state('auth', {
        url: '/auth',
        template: require('../console.html'),
        abstract: true
    }).state('auth.account-add', {
        url: '/account/add',
        views: {
            'console': { template: require('./account-add.html') }
        }
    }).state('auth.account-list', {
        url: '/account/list',
        views: {
            'console': { template: require('./account-list.html') }
        },
    }).state('auth.change-password', {
        url: '/change-password',
        views: {
            'console': { template: require('./change-password.html') }
        }
    });
}).service('authService', () => {
    
    this.name = 'authService';
});
