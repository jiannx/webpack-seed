import app from 'app.config';
import './operation.scss';

// 运营管理模块
app.config(($stateProvider) => {
    $stateProvider.state('index.operation', {
            url: 'operation',
            abstract: true
        })
        // 运营位
        .state('index.operation.banner', {
            url: '/banner',
            views: {
                'console@index': { template: require('./operation-banner.html') }
            }
        })
        // 指标
        .state('index.operation.target', {
            url: '/target',
            views: {
                'console@index': { template: require('./operation-target.html') }
            }
        })
        // 标签
        .state('index.operation.tag', {
            url: '/tag',
            views: {
                'console@index': { template: require('./operation-tag.html') }
            }
        })
        // 兑换码
        .state('index.operation.code', {
            url: '/code',
            views: {
                'console@index': { template: require('./operation-code.html') }
            }
        })
        // 活动消息
        .state('index.operation.message', {
            url: '/message',
            views: {
                'console@index': { template: require('./operation-message.html') }
            }
        })
        // 积分管理
        .state('index.operation.integral', {
            url: '/integral',
            views: {
                'console@index': { template: require('./operation-integral.html') }
            }
        });
}).service('operationService', () => {
    this.name = 'operationService';
});
