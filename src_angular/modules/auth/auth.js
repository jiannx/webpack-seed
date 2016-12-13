import app from 'app.config';
import './account-list';


// 权限管理模块
app.config(($stateProvider) => {
    $stateProvider.state('auth', {
        url: '/auth',
        abstract: true
    }).state('auth.account-add', {
        url: '/account/add',
        views: {
            '@': { template: require('./account-add.html') }
        }
    }).state('auth.account-list', {
        url: '/account/list',
        views: {
            '@': { template: require('./account-list.html') }
        },
    }).state('auth.change-password', {
        url: '/change-password',
        views: {
            '@': { template: require('./change-password.html') }
        }
    });
}).service('authService', () => {
    this.name = 'authService';
});
