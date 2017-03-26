import app from 'app.config';
import './operation.scss';
import './operation-banner.js';
import './operation-banner-add.js';

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
        // 运营位 添加
        .state('index.operation.banner.add', {
            url: '/add?id?type',
            views: {
                'console@index': { template: require('./operation-banner-add.html') }
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
        // 兑换码 添加
        .state('index.operation.code.add', {
            url: '/add',
            views: {
                'console@index': { template: require('./operation-code-add.html') }
            }
        })
        // 活动消息
        .state('index.operation.message', {
            url: '/message',
            views: {
                'console@index': { template: require('./operation-message.html') }
            }
        })
        // 活动消息 添加
        .state('index.operation.message.add', {
            url: '/add',
            views: {
                'console@index': { template: require('./operation-message-add.html') }
            }
        })
        // 积分管理
        .state('index.operation.integral', {
            url: '/integral',
            views: {
                'console@index': { template: require('./operation-integral.html') }
            }
        })
        // 积分管理 活动添加
        .state('index.operation.integral.add', {
            url: '/add',
            views: {
                'console@index': { template: require('./operation-integral-add.html') }
            }
        })
        // 意见反馈汇总
        .state('index.operation.suggest', {
            url: '/suggest',
            views: {
                'console@index': { template: require('./operation-suggest.html') }
            }
        })
        // 意见反馈汇总 详情
        .state('index.operation.suggest.detail', {
            url: '/detail',
            views: {
                'console@index': { template: require('./operation-suggest-detail.html') }
            }
        });
}).service('operationService', () => {
    this.name = 'operationService';
});
