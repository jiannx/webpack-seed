import app from 'app.config';

// 登陆
app.config(($stateProvider) => {
    $stateProvider.state('login', {
        url: '/login',
        template: require('./login.html')
    });
}).controller('loginCtrl', ($scope) => {
    $scope.name = 'loginCtrl';
});
