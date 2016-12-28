import app from 'app.config';

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
