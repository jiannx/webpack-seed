import app from 'app.config';

// 订单管理模块
app.config(($stateProvider) => {
    $stateProvider.state('order', {
            url: '/order',
            abstract: true
        })
        // 课程订单 预付
        .state('order.course-advance', {
            url: '/course/advance',
            views: {
                '@': { template: require('./order-course-advance.html') }
            }
        })
        // 课程订单 次付
        .state('order.course-next', {
            url: '/course/next',
            views: {
                '@': { template: require('./order-course-next.html') }
            }
        })
        // 充值订单 金币
        .state('order.recharge-gold', {
            url: '/recharge/gold',
            views: {
                '@': { template: require('./order-recharge-gold.html') }
            }
        })
        // 充值订单
        .state('order.recharge-monney', {
            url: '/recharge/monney',
            views: {
                '@': { template: require('./order-recharge-monney.html') }
            }
        })
        // 心意订单
        .state('order.mind', {
            url: '/mind',
            views: {
                '@': { template: require('./order-mind.html') }
            }
        });
}).service('orderService', () => {
    this.name = 'orderService';
});
