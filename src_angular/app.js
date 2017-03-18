import app from 'app.config';
import './modules/app.service';
import './modules/app.ctrl';
// 样式引入
import './scss/bootstrap.scss';
import './scss/app.scss';
import './scss/animate.css';
// 组件引入
import './components/components';
// 页面模块
import './modules/error/error'; // 错误页面
import './modules/login/login'; // 登陆
import './modules/home/home'; // 首页
import './modules/auth/auth'; // 权限管理
import './modules/user/user'; // 用户管理
import './modules/course/course'; // 课程管理
import './modules/operation/operation'; // 运营管理
import './modules/order/order'; // 订单管理
import './modules/settlement/settlement'; // 结算管理

app.run(($rootScope, $state, $stateParams, appService) => {
  console.info('App start success!');

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  // 初始化数据
  $rootScope.appData = {
    isLogin: false
  };

  // 验证登陆状态，如果已登录，广播登陆；未登录则进行跳转
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (!toState.name.includes('login')) {
      appService.checkLogin(() => {
        $rootScope.$broadcast('login.success', {});
      }, () => {
        $state.go('login.in');
      });
    }
  });

  $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {

  });

  // if error, redirect to 404
  $rootScope.$on('$stateChangeError', function() {
    $state.go('404');
  });
}).config(($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('index', {
    url: '/',
    template: require('./modules/console.html'),
  });
});
