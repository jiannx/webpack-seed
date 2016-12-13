import app from 'app.config';
import './operation.scss';

// 运营管理模块
app.config(($stateProvider) => {
    $stateProvider.state('operation', {
            url: '/operation',
            abstract: true
        })
        // 运营位
        .state('operation.banner', {
            url: '/banner',
            views: {
                '@': { template: require('./operation-banner.html') }
            }
        })
        // 指标
        .state('operation.target', {
            url: '/target',
            views: {
                '@': { template: require('./operation-target.html') }
            }
        })
        // 标签
        .state('operation.tag', {
            url: '/tag',
            views: {
                '@': { template: require('./operation-tag.html') }
            }
        })
        // 兑换码
        .state('operation.code', {
            url: '/code',
            views: {
                '@': { template: require('./operation-code.html') }
            }
        })
        // 活动消息
        .state('operation.message', {
            url: '/message',
            views: {
                '@': { template: require('./operation-message.html') }
            }
        })
        // 积分管理
        .state('operation.integral', {
            url: '/integral',
            views: {
                '@': { template: require('./operation-integral.html') }
            }
        });
}).service('operationService', () => {
    this.name = 'operationService';
});
