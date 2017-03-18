import app from 'app.config';

import './login.scss';

// 登陆
app.config(($stateProvider) => {
  $stateProvider.state('login', {
    url: '/login',
    abstract: true
  }).state('login.in', {
    url: '/in',
    views: {
      '@': { template: require('./login.html') }
    }
  }).state('login.register', {
    url: '/register',
    views: {
      '@': { template: require('./login.html') }
    }
  }).state('login.forget-password', {
    url: '/forget-password',
    views: {
      '@': { template: require('./login.html') }
    }
  });
}).controller('loginInCtrl', ($scope, $state, request) => {
  $scope.needCheckCode = true;
  $scope.errorMessage = '';

  $scope.loginData = {
    username: 'admin',
    password: 'admin',
    seccode_verify: '123'
  };

  const errorMessage = {
    needAccount: '请填写用户名',
    needPassword: '请填写密码',
    needCheckcode: '请填写验证码',
    accoutOrPasswordErreor: '账户名或密码错误'
  };

  function validate() {
    if ($scope.loginData.username === '') {
      $scope.errorMessage = errorMessage.needAccount;
      return false;
    }
    if ($scope.loginData.password === '') {
      $scope.errorMessage = errorMessage.needPassword;
      return false;
    }
    if ($scope.needCheckCode && $scope.loginData.seccode_verify === '') {
      $scope.errorMessage = errorMessage.needCheckcode;
      return false;
    }
    return true;
  }

  $scope.onInputChange = function() {
    $scope.errorMessage = '';
  };
  $.post('http://127.0.0.1:9021/admin/api/login/index/', {"username":"admin","password":"admin","seccode_verify":"123"}, function(){

  });

  $scope.onLoginIn = function() {
    if (!validate()) {
      return;
    }
    request('loginIn', $scope.loginData).success(()=>{

    });
    console.log('do login');
    // $state.go('index');
  };
});
