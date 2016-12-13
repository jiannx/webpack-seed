import app from 'app.config';
import './app.service';
import './app.ctrl';
// 样式引入
import './scss/bootstrap.scss';
import './scss/app.scss';
import './scss/animate.css';
// 组件引入
import './components/grid/ne-table';
// 页面模块
import './modules/login/login'; // 登陆
import './modules/home/home'; // 首页
import './modules/auth/auth'; // 权限管理
import './modules/user/user'; // 用户管理
import './modules/course/course'; // 课程管理
import './modules/operation/operation'; // 运营管理
import './modules/order/order'; // 订单管理
import './modules/settlement/settlement'; // 结算管理

app.run(function($rootScope, $state, $stateParams, appService) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        let name = 'App start success!';
        console.info(`${name}`);
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    });
