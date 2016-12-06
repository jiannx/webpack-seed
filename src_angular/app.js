import app from 'app.config';

// 样式引入
require('./scss/bootstrap.scss');
require('./scss/app.scss');

// 组件引入

// 页面模块
require('./modules/login/login.js'); // 登陆
require('./modules/home/home.js'); // 首页
require('./modules/auth/auth.js'); // 权限管理
require('./modules/user/user.js'); // 用户管理
require('./modules/course/course.js'); // 课程管理
require('./modules/operation/operation.js'); // 运营管理
require('./modules/order/order.js'); // 订单管理
require('./modules/settlement/settlement.js'); // 结算管理

app.run(($rootScope, $state, $stateParams) => {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    let name = 'start success';
    console.info(`${name}`);
}).config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise('/home');
}).controller('appCtrl', ($scope) => {

});
