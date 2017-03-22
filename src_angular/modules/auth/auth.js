import app from 'app.config';
import angular from 'angular';

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
    $scope.groupList.push({ id: '其他', name: '其他' });
  });
  $scope.newData = {
    nickname: '',
    account: '',
    mobile: '',
    password: '',
    group_name: '',
    group_name2: ''
  };
  $scope.identityList = [];
  $scope.onSubmit = function() {
    let data = angular.copy($scope.newData);
    if (data.group_name === '其他') {
      data.group_name = data.group_name2;
    }
    delete data.group_name2;
    request('accountAdd', data).success(() => {
      $state.go('index.auth.account-list');
    });
  };
});

// 权限列表
app.controller('accountListCtrl', function($scope, request, neDialog, neTable, appService) {
  let grid = null;
  $scope.filterOpt = {
    account: '',
    nickname: '',
    group_name: ''
  };

  $scope.onSearch = function() {
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = {
      account: '',
      nickname: '',
      group_name: ''
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
    http: request('accountList'),
    httpData: {},
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id' },
      { display: '账户', field: 'account' },
      { display: '组名', field: 'groupid' },
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
