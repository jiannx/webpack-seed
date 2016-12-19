import app from 'app.config';
import './modules/app.service';
import './modules/app.ctrl';
// // 样式引入
import './scss/bootstrap.scss';
import './scss/app.scss';
import './scss/animate.css';
// // 组件引入
import './components/components';
// // 页面模块
import './modules/login/login'; // 登陆
import './modules/home/home'; // 首页
import './modules/auth/auth'; // 权限管理
import './modules/user/user'; // 用户管理
import './modules/course/course'; // 课程管理
import './modules/operation/operation'; // 运营管理
import './modules/order/order'; // 订单管理
import './modules/settlement/settlement'; // 结算管理

app.run(($rootScope, $state, $stateParams) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    // 初始化项目的一些数据
    $rootScope.appData = {
        isInited: false
    };
    let name = 'App start success!';
    console.info(`${name}`);

    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $rootScope.appData.isInited = true;
        event.preventDefault();
    });
}).config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
});
