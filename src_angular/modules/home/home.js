import app from 'app.config';

// 首页
app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/home',
        template: require('../console.html')
    }).state('home.index', {
        url: '/index',
        views: {
            'console': { template: require('./home.html') }
        }
    });
});

app.service('homeService', () => {
    this.name = 'homeService';
});

app.controller('homeCtrl', ($scope, neDialog) => {
    $scope.$on('login.success', function() {
        $scope.name = 'home';
        $scope.$apply();
    });
});
