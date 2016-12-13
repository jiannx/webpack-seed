import app from 'app.config';
import appService from './app.service';
import appCtrl from './app.ctrl';

// 样式引入
require('./scss/bootstrap.scss');
require('./scss/app.scss');
require('./scss/animate.css');


// 组件引入
require('./components/grid/ne-table.js');

// 页面模块
require('./modules/login/login.js'); // 登陆
require('./modules/home/home.js'); // 首页
require('./modules/auth/auth.js'); // 权限管理
require('./modules/user/user.js'); // 用户管理
require('./modules/course/course.js'); // 课程管理
require('./modules/operation/operation.js'); // 运营管理
require('./modules/order/order.js'); // 订单管理
require('./modules/settlement/settlement.js'); // 结算管理

app.run(function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        let name = 'start success';
        console.info(`${name}`);
    })
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
    })
    .controller('appCtrl', appCtrl)
    .service('appService', appService);
