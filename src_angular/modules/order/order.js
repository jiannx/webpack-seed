import app from 'app.config';

// 订单管理模块
app.config(($stateProvider) => {
    $stateProvider.state('order', {
            url: '/order',
            abstract: true
        })
        // 课程订单
        .state('order.course', {
            url: '/course',
            views: {
                '@': { template: require('./order-course.html') }
            }
        })
        // 充值订单
        .state('order.recharge', {
            url: '/recharge',
            views: {
                '@': { template: require('./order-recharge.html') }
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
