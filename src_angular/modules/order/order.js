import app from 'app.config';

// 订单管理模块
app.config(($stateProvider) => {
    $stateProvider.state('index.order', {
            url: 'order',
            abstract: true
        })
        // 课程订单 预付
        .state('index.order.course-advance', {
            url: '/course/advance',
            views: {
                'console@index': { template: require('./order-course-advance.html') }
            }
        })
        // 课程订单 次付
        .state('index.order.course-next', {
            url: '/course/next',
            views: {
                'console@index': { template: require('./order-course-next.html') }
            }
        })
        // 充值订单 金币
        .state('index.order.recharge-gold', {
            url: '/recharge/gold',
            views: {
                'console@index': { template: require('./order-recharge-gold.html') }
            }
        })
        // 充值订单
        .state('index.order.recharge-monney', {
            url: '/recharge/monney',
            views: {
                'console@index': { template: require('./order-recharge-monney.html') }
            }
        })
        // 心意订单
        .state('index.order.mind', {
            url: '/mind',
            views: {
                'console@index': { template: require('./order-mind.html') }
            }
        });
}).service('orderService', () => {
    this.name = 'orderService';
});
