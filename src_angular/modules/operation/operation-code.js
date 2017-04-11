import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('redeemCodeListCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    code_name: '',
    code_amount: '',
    status: 0, // 状态 0=全部 1=未使用 2=失效 3=已使用
    createtime_s: '',
    createtime_e: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.statusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '未使用' },
    { id: 2, name: '失效' },
    { id: 3, name: '已使用' },
  ];
  request('redeemCodeListAmountList').success((res) => {
    $scope.amountList = res.rsm.info || [];
  });

  $scope.onSearch = function() {
    if ($scope.rangTime.startDate) {
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

  $scope.onEdit = function(event, type, id) {
    // 0:详情 1:审核
    if (angular.isDefined(type) && angular.isDefined(id)) {
      $state.go('index.course.detail', { id, type });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('redeemCodeList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 10 },
      { display: '兑换码', field: 'code_name', width: 20 },
      { display: '金额', field: 'code_amount', width: 10 },
      { display: '有效期', field: 'validity', width: 15 },
      { display: '状态', field: 'status', width: 15 },
      { display: '使用账号', field: 'telphone', width: 15 },
      { display: '使用时间', field: 'use_times', width: 15 },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    },
    btns: '<a type="button" class="btn btn-primary btn-sm" ui-sref="index.operation.code.add">生成新兑换码</a>'
  });
});
