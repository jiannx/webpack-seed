import app from 'app.config';

// 首页
app.config(($stateProvider) => {
    $stateProvider
        .state('home', {
            url: '/home',
            template: require('./home.html')
        });
}).service('homeService', () => {
    this.name = 'homeService';
}).controller('homeCtrl', ($scope) => {
    $scope.name = 'home';
});
