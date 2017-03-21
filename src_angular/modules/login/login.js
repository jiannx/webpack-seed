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
    username: '',
    password: '',
    seccode_verify: ''
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

  $scope.onLoginIn = function() {
    if (!validate()) {
      return;
    }
    console.log('do logining');
    request('loginIn', $scope.loginData).success((res) => {
      if (res.errno === 1) {
        $state.go('index');
      }
    });
  };
});
