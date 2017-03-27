import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('operationSuggestCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telephone: '',
    status: 0, // 状态0=全部 1未处理 2=已处理
    createtime_s: '',
    createtime_e: '',
    users_name: ''
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.statusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '未处理' },
    { id: 2, name: '已处理' },
  ];
  request('redeemCodeListAmountList').success((res) => {
    $scope.amountList = res.rsm.info || [];
  });

  $scope.onSearch = function() {
    if ($scope.rangTime.startDate !== '') {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.rangTime.startDate.format('YYYY-MM-DD HH:mm'),
        createtime_e: $scope.rangTime.endDate.format('YYYY-MM-DD HH:mm'),
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.rangTime = { startDate: '', endDate: '' };
    $scope.onSearch();
  };

  $scope.onDel = function() {
    // neDialog.ask({
    //   content: '确定删除吗？',
    //   yes: (scope, close) => {
    //     close();
    //   }
    // });
  };

  $scope.onEdit = function(type, id) {
    $state.go('index.operation.suggest.detail', { type, id });
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('suggestList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 10 },
      { display: '反馈人姓名', field: 'real_name', width: 10 },
      { display: '反馈人手机号', field: 'telphone', width: 10 },
      { display: '反馈内容', field: 'content', width: 15 },
      { display: '反馈时间', field: 'createtime', width: 15 },
      { display: '状态', field: 'status', width: 15 },
      { display: '处理人姓名', field: 'user_name', width: 15 }, {
        display: '处理',
        field: function(row) {
          let t = `<a ng-click="onEdit(0, ${row.id})">详情</a> `
          if (row.status === '未处理') {
            t += `<a ng-click="onEdit(1, ${row.id})">处理</a>`;
          }
          return t;
        },
        width: 10
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
