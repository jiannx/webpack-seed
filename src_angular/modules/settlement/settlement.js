import app from 'app.config';
import './settlement-chart.js';
import './settlement-course.js';
import './settlement-course-detail.js';
import './settlement-gold.js';
import './settlement-overage.js';
import './settlement-overage-detail.js';

// 结算管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.settlement', {
      url: 'settlement',
      abstract: true
    })
    // 课程结算
    .state('index.settlement.course', {
      url: '/course',
      views: {
        'console@index': { template: require('./settlement-course.html') }
      }
    })
    // 课程结算
    .state('index.settlement.course.detail', {
      url: '/detail/:id',
      views: {
        'console@index': { template: require('./settlement-course-detail.html') }
      }
    })
    // 金币结算
    .state('index.settlement.gold', {
      url: '/gold',
      views: {
        'console@index': { template: require('./settlement-gold.html') }
      }
    })
    // 余额结算
    .state('index.settlement.overage', {
      url: '/overage',
      views: {
        'console@index': { template: require('./settlement-overage.html') }
      }
    })
    // 余额结算
    .state('index.settlement.overage.detail', {
      url: '/detail/:id',
      views: {
        'console@index': { template: require('./settlement-overage-detail.html') }
      }
    })
    // 营收报表
    .state('index.settlement.chart', {
      url: '/chart',
      views: {
        'console@index': { template: require('./settlement-chart.html') }
      }
    });
}).service('settlementService', () => {
  this.name = 'settlementService';
});
