import app from 'app.config';
import angular from 'angular';

const authList = [
  { id: '01-001', name: '权限管理-后台账号开通' },
  { id: '01-002', name: '权限管理-权限分配' },
  { id: '02-001', name: '用户管理-教师管理' },
  { id: '02-002', name: '用户管理-学生管理' },
  { id: '02-003', name: '用户管理-区域运营管理' },
  { id: '03-001', name: '课程管理-课程管理' },
  { id: '03-002', name: '课程管理-报名查看' },
  { id: '04-001', name: '运营管理-运营位管理' },
  { id: '04-002', name: '运营管理-指标管理' },
  { id: '04-003', name: '运营管理-好友标签管理' },
  { id: '04-004', name: '运营管理-兑换码管理' },
  { id: '04-005', name: '运营管理-活动消息管理' },
  { id: '04-006', name: '运营管理-积分活动管理' },
  { id: '04-007', name: '运营管理-意见反馈汇总' },
  { id: '05-001', name: '订单管理-课前预付订单' },
  { id: '05-002', name: '订单管理-课后次付订单' },
  { id: '05-003', name: '订单管理-金币充值订单' },
  { id: '05-004', name: '订单管理-余额充值订单' },
  { id: '05-005', name: '订单管理-感谢订单' },
  { id: '06-001', name: '结算管理-单次课程结算' },
  { id: '06-002', name: '结算管理-金币充值' },
  { id: '06-003', name: '结算管理-余额提现管理' },
  { id: '06-004', name: '结算管理-营收报表' },
];

// 权限管理模块
app.config(($stateProvider) => {
  $stateProvider.state('index.auth', {
    url: 'auth',
    abstract: true
  }).state('index.auth.account-add', {
    url: '/account/add',
    views: {
      'console@index': { template: require('./account-add.html') }
    }
  }).state('index.auth.account-list', {
    url: '/account/list',
    views: {
      'console@index': { template: require('./account-list.html') }
    },
  }).state('index.auth.change-password', {
    url: '/change-password',
    views: {
      'console@index': { template: require('./change-password.html') }
    }
  });
}).service('authService', () => {
  this.name = 'authService';
});


// 账户添加
app.controller('accountAdd', function($scope, $state, $rootScope, request, neDialog, $validation) {
  $scope.groupList = angular.copy($rootScope.const.group);
  request('accountGroupList').success((res) => {
    $scope.groupList = [];
    for (let item of res.rsm.info) {
      $scope.groupList.push({
        id: item.id,
        name: item.title
      });
    }
    $scope.groupList.push({ id: -1, name: '其他' });
  });
  $scope.newData = {
    nickname: '',
    account: '',
    mobile: '',
    password: '',
    groupid: '',
    group_name: '',
  };
  $scope.identityList = [];
  $scope.onSubmit = function() {
    let data = angular.copy($scope.newData);
    if (data.groupid === -1) {
      data.groupid = 0;
    }
    request('accountAdd', data).success(() => {
      neDialog.msg('提交成功！请进入权限分配菜单配置用户权限');
      $state.go('index.auth.account-list');
    });
  };
});

// 权限列表
app.controller('accountListCtrl', function($scope, $rootScope, request, neDialog, neTable, appService) {
  let grid = null;
  $scope.filterOpt = {
    account: '',
    nickname: '',
    groupid: ''
  };

  $scope.onSearch = function() {
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = {
      account: '',
      nickname: '',
      groupid: ''
    };
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
  appService.constUpdate();

  $scope.onEdit = function() {
    if (!$scope.selList || $scope.selList.length === 0) {
      neDialog.alert('请选择要编辑的用户');
      return;
    }
    $scope.authList = angular.copy(authList); // 所有权限

    function getData() {
      request('accountAuthDetail', { userid: $scope.selUser.id }).success((res) => {
        $scope.ownAuth = []; // 已拥有权限
        // res.rsm.info = ['01-001', '01-002'];
        for (let item of authList) {
          let f = res.rsm.info.find(x => x.power == item.id);
          if (f) {
            $scope.ownAuth.push({
              id: item.id,
              name: item.name,
              idPost: f.id
            });
          }
        }
      });
    }
    $scope.selUser = $scope.selList[0];
    $scope.onAuthAdd = function() {
      let list = [];
      for (let item of $scope.authList) {
        if (item.isAdd) {
          list.push(item.id);
        }
      }
      request('accountAuthAdd', ({ id: JSON.stringify(list), userid: $scope.selUser.id })).success(() => {
        $scope.authList = angular.copy(authList);
        getData();
      })
    };
    $scope.onAuthDel = function() {
      let list = [];
      for (let item of $scope.ownAuth) {
        if (item.isDel) {
          list.push(item.idPost);
        }
      }
      request('accountAuthDel', { id: JSON.stringify(list), userid: $scope.selUser.id }).success(() => {
        getData();
      })
    };
    getData();
    neDialog.confirm({
      title: '权限编辑',
      scope: $scope,
      area: ['700px', '500px'],
      btn: null,
      content: require('./tmpl/edit-auth.html'),
    });
  };
  $scope.onDel = function() {};

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('accountList'),
    httpData: {},
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id' },
      { display: '姓名', field: 'nickname' },
      { display: '账户', field: 'account' },
      { display: '角色', field: 'groupid' }, {
        display: '拥有权限',
        field: function(row) {
          let ids = [];
          let names = [];
          row.power.forEach((x) => {
            ids.push(x.power);
            names.push(x.title);
          });
          return `<span title="${names.join(',')}">${ids.join(',')}</span>`;
        }
      },
      // {
      //   display: '操作',
      //   field: function(rowData) {
      //     let id = rowData.id;
      //     return `<a class="btn-control" ng-click="onEdit($event, 0, ${id})">权限编辑</a>`;
      //   },
      //   sort: false
      // },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    },
    onSelect: function(list) {
      $scope.selList = list;
    },
    btns: `<button class="btn btn-danger btn-sm" ng-click="onDel()"><i class="fa fa-trash-o"></i> 删除</button>
          <button class="btn btn-primary btn-sm" ng-click="onEdit($event, 0)"><i class="fa fa-pencil"></i> 权限编辑</button>`
  });
});

// 密码修改
app.controller('accountChangePasswordCtrl', function($scope, $state, request, neDialog, $validation) {
  $scope.newData = {
    old_password: '',
    new_password: '',
    again_password: '',
  };
  $scope.identityList = [];
  $scope.onSubmit = function() {
    if ($scope.newData.old_password === $scope.newData.new_password) {
      neDialog.alert('原始密码与新密码重复');
      return;
    }
    request('accountChangePassword', $scope.newData).success(() => {
      $state.go('login.in');
    });
  };
});
