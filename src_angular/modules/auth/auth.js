import app from 'app.config';
import './account-list';

// 权限管理模块
app.config(($stateProvider) => {
    $stateProvider.state('index.auth', {
        url: 'auth',
        abstract: true
    }).state('index.auth.account-add', {
        url: '/account/add',
        views: {
            'console@index': { template: require('./account-add.html') }
        }
    }).state('index.auth.account-list', {
        url: '/account/list',
        views: {
            'console@index': { template: require('./account-list.html') }
        },
    }).state('index.auth.change-password', {
        url: '/change-password',
        views: {
            'console@index': { template: require('./change-password.html') }
        }
    });
}).service('authService', () => {
    this.name = 'authService';
});
