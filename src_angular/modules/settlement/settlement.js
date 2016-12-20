import app from 'app.config';

// 结算管理模块
app.config(($stateProvider) => {
    $stateProvider.state('settlement', {
            url: '/settlement',
            template: require('../console.html'),
            abstract: true
        })
        // 课程结算
        .state('settlement.course', {
            url: '/course',
            views: {
                'console': { template: require('./settlement-course.html') }
            }
        })
        // 金币结算
        .state('settlement.gold', {
            url: '/gold',
            views: {
                'console': { template: require('./settlement-gold.html') }
            }
        })
        // 余额结算
        .state('settlement.overage', {
            url: '/overage',
            views: {
                'console': { template: require('./settlement-overage.html') }
            }
        })
        // 营收报表
        .state('settlement.chart', {
            url: '/chart',
            views: {
                'console': { template: require('./settlement-chart.html') }
            }
        });
}).service('settlementService', () => {
    this.name = 'settlementService';
});
