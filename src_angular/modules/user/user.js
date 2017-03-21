import app from 'app.config';
import angular from 'angular';

// 用户管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.user', {
      url: 'user',
      abstract: true
    })
    // 教师管理
    .state('index.user.teacher', {
      url: '/teacher',
      views: {
        'console@index': { template: require('./user-teacher.html') }
      }
    })
    // 教师管理 审核及详情
    .state('index.user.teacher.detail', {
      url: '/detail',
      views: {
        'console@index': { template: require('./user-teacher-detail.html') }
      }
    })
    // 学生管理
    .state('index.user.student', {
      url: '/student',
      views: {
        'console@index': { template: require('./user-student.html') }
      }
    })
    .state('index.user.student.detail', {
      url: '/detail',
      views: {
        'console@index': { template: require('./user-student-detail.html') }
      }
    })
    // 客服管理
    .state('index.user.service', {
      url: '/service',
      views: {
        'console@index': { template: require('./user-service.html') }
      }
    })
    // 客服管理 添加
    .state('index.user.service.add', {
      url: '/add',
      views: {
        'console@index': { template: require('./user-service-add.html') }
      }
    })
    // 客服管理 详情
    .state('index.user.service.detail', {
      url: '/detail',
      views: {
        'console@index': { template: require('./user-service-detail.html') }
      }
    });
}).service('userService', () => {
  this.name = 'userService';
});

// 教师列表
app.controller('teacherListCtrl', function($scope, request, neDialog, neTable, appService) {
  let grid = null;
  let def = {
    real_name: '',
    telephone: '',
    province: '',
    city: '',
    area: '',
    teacher_star: 0,
    customer_service_id: 0,
    invite_userid: 0,
    aptitude_apply: 0,
    teacher_star_apply: 0,
    card_number: 0,
    communicate_date_s: '2017-01-01',
    communicate_date_e: '2017-04-01',
    communicate_times_s: '00:00',
    communicate_times_e: '00:00',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.serviceList = [
    { id: 0, name: '所有客服' }
  ];
  $scope.inviteList = [
    { id: 0, name: '全部' },
    { id: 1, name: '是' },
    { id: 2, name: '否' }
  ];
  $scope.applyList = [
    { id: 0, name: '全部' },
    { id: 1, name: '未提交' },
    { id: 2, name: '待审核' },
    { id: 3, name: '审核通过' },
    { id: 4, name: '审核拒绝' },
  ];
  $scope.starApplyList = [
    { id: 0, name: '全部' },
    { id: 1, name: '待审核' },
    { id: 2, name: '升星' },
    { id: 3, name: '降星' },
  ];
  $scope.cardList = [
    { id: 0, name: '全部' },
    { id: 1, name: '是' },
    { id: 2, name: '否' },
  ];


  $scope.onSearch = function() {
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.onSearch();
  };

  $scope.onDel = function() {
    neDialog.ask({
      content: '确定删除吗？',
      yes: (scope, close) => {
        close();
      }
    });
  };

  $scope.onEdit = function() {
    neDialog.confirm({
      title: '权限编辑',
      scope: $scope,
      area: ['700px', '500px'],
      content: require('./tmpl/edit-auth.html'),
      yes: (scope, close) => {
        close();
      }
    });
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('teacherList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id' },
      { display: '账户', field: 'account' },
      { display: '组名', field: 'group_name' },
      { display: '昵称', field: 'nickname' }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          return `<a class="btn-control" ng-click="onEdit($event, 0, ${id})" title="编辑" ><i class="fa fa-pencil-square-o"></i>&nbsp;</a>
          <a class="btn-control" ng-click="onDel(onDel, 5, ${id})" title="删除" ><i class="fa fa-trash-o"></i>&nbsp;</a>`;
        },
        sort: false
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
