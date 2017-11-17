import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleOverageCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telphone: '',
    customer_service_id: 0, // 客服ID
    examine_id: 0, // 提现操作人 0=全部 其他 ID（这个之前也有）
    status: 0, // 提现状态 0=全部 1=待打款 2=已打款 3=打款异常
    createtime_s: '',
    createtime_e: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.statusList = [ // 结算状态
    { id: 0, name: '全部' },
    { id: 1, name: '待打款' },
    { id: 2, name: '已打款' },
    { id: 3, name: '打款异常' },
  ];
  $scope.chargingTypesList = [ // 结算状态
    { id: 0, name: '全部' },
    { id: 1, name: '课前全额预付' },
    { id: 2, name: '课后单次付费' },
  ];
  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });
  request('customerServiceAll', { typesid: 0 }).success((res) => {
    $scope.serviceList = res.rsm.info;
    $scope.serviceList.unshift({ id: 0, real_name: '所有客服' });
  });
  request('courseExamine').success((res) => {
    $scope.examineList = res.rsm.info;
  });

  $scope.onSearch = function() {
    if ($scope.createTime.startDate) {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.createTime.startDate.format('YYYY-MM-DD'),
        createtime_e: $scope.createTime.endDate.format('YYYY-MM-DD'),
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.createTime = { startDate: '', endDate: '' };
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

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('settlementOverageList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 5 },
      { display: '订单号', field: 'order_no', width: 10, isTitle: true },
      { display: '账户余额', field: 'account_balance', width: 5 },
      { display: '账户所有人', field: 'real_name', width: 10 },
      { display: '手机号', field: 'telphone', width: 10, isTitle: true },
      { display: '负责客服', field: 'customer_service_name', width: 5 },
      { display: '提现金额', field: 'amount', width: 10 },
      { display: '提现账户', field: 'cash_account', width: 10, isTitle: true },
      { display: '提现申请日期', field: 'createtime', width: 10, isTitle: true },
      { display: '提现状态', field: 'status', width: 5 },
      { display: '提现操作人', field: 'nickname', width: 10 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ui-sref="index.settlement.overage.detail({ id:${id} })">查看详情</a> `;
          return tpl;
        },
        sort: false,
        width: 10
      },
    ],
    onResHandler: function(resData) {
      // resData.rsm.info = [{ id: 1 }];
      return resData.rsm;
    }
  });
});
