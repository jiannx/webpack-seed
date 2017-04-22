import app from 'app.config';
import './order-course-advance.js';
import './order-course-next.js';
import './order-detail.js';
import './order-mind.js';
import './order-recharge-gold.js';
import './order-recharge-monney.js';

// 订单管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.order', {
      url: 'order',
      abstract: true
    })
    // 课程订单 详情
    .state('index.order.detail', {
      url: '/detail/:id/:type',
      views: {
        'console@index': { template: require('./order-detail.html') }
      }
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
    })
    .state('index.order.course-advance.detail', {
      url: '/detail/:id/:type',
      views: {
        'console@index': { template: require('./order-detail.html') }
      }
    })
    .state('index.order.course-next.detail', {
      url: '/detail/:id/:type',
      views: {
        'console@index': { template: require('./order-detail.html') }
      }
    })
    .state('index.order.recharge-gold.detail', {
      url: '/detail/:id/:type',
      views: {
        'console@index': { template: require('./order-detail.html') }
      }
    })
    .state('index.order.recharge-monney.detail', {
      url: '/detail/:id/:type',
      views: {
        'console@index': { template: require('./order-detail.html') }
      }
    });
}).service('orderService', () => {
  this.name = 'orderService';
});
