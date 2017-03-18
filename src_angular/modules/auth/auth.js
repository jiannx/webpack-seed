import app from 'app.config';

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
app.controller('accountAdd', function($scope, request, neDialog, $validation) {
  $scope.newData = {
    name: '',
    account: '',
    phone: '',
    password: '',
    role: ''
  };
  $scope.identityList = [];
  $scope.onSubmit = function() {
    console.log();
  };
});

// 权限列表
app.controller('accountListCtrl', function($scope, request, neDialog, neTable) {
  let grid = null;
  $scope.gridList = [];
  $scope.gridSel = [];
  $scope.filterOpt = {};

  $scope.onSearch = function() {
    $scope.onEdit();
  };

  $scope.onReset = function() {

  };

  $scope.onAdd = function() {

  };

  $scope.onDel = function() {
    neDialog.ask({
      content: '确定删除吗？',
      yes: (scope, colse) => {
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
    // isInit: false,
    columnDefs: [
      { display: 'ID', field: 'id' },
      { display: '姓名', field: 'name' },
      { display: '账号', field: 'name' },
      { display: '角色', field: 'name' },
      { display: '权限', field: 'name' }, {
        display: '操作',
        field: function(rowData) {
          var id = rowData.id;
          return `<a class="btn-control" ng-click="onEdit($event, 0, ${id})" title="编辑" ><i class="fa fa-pencil-square-o"></i>&nbsp;</a>
                        <a class="btn-control" ng-click="onOperateClick(onDel, 5, ${id})" title="删除" ><i class="fa fa-trash-o"></i>&nbsp;</a>`;
        },
        sort: false
      },
    ],
    resHandler: function(resData) {
      $scope.gridList = resData.data.data;
      return resData.data;
    },
    onSelect: function(array) {
      $scope.gridSel = array;
    }
  });
});
