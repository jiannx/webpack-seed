import app from 'app.config';

// 结算管理模块
app.config(($stateProvider) => {
    $stateProvider.state('settlement', {
            url: '/settlement',
            abstract: true
        })
        // 课程结算
        .state('settlement.course', {
            url: '/course',
            views: {
                '@': { template: require('./settlement-course.html') }
            }
        })
        // 金币结算
        .state('settlement.gold', {
            url: '/gold',
            views: {
                '@': { template: require('./settlement-gold.html') }
            }
        })
        // 余额结算
        .state('settlement.overage', {
            url: '/overage',
            views: {
                '@': { template: require('./settlement-overage.html') }
            }
        })
        // 营收报表
        .state('settlement.chart', {
            url: '/chart',
            views: {
                '@': { template: require('./settlement-chart.html') }
            }
        });
}).service('settlementService', () => {
    this.name = 'settlementService';
});
