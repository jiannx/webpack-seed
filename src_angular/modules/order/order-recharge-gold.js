import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('orderRechargeGoldCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    source: 1, // 金币充值
    order_id: '',
    real_name: '',
    telphone: '',
    status: 0,
    createtime_s: '',
    createtime_e: '',
    types: 0,
  };
  $scope.typeList = [
    { id: 0, name: '全部' },
    { id: 1, name: '支付宝' },
    { id: 2, name: '微信' },
    { id: 3, name: '平台-兑换码' },
    { id: 4, name: '钱包金额' },
    { id: 5, name: '平台-系统赠送' },
    { id: 6, name: '平台-人工充值' },
  ];
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.statusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '未处理' },
    { id: 2, name: '已处理' },
  ];
  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });
  request('redeemCodeListAmountList').success((res) => {
    $scope.amountList = res.rsm.info || [];
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
    $scope.rangTime = { startDate: '', endDate: '' };
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

  $scope.onEdit = function(type, id) {
    $state.go('index.operation.suggest.detail', { type, id });
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('orderRechargeList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 15 },
      { display: '订单号', field: 'pay_order', width: 15 },
      { display: '金额', field: 'amount', width: 10 },
      { display: '下单人', field: 'real_name', width: 10 },
      { display: '下单手机号码', field: 'telphone', width: 10 },
      { display: '支付方式', field: 'types', width: 10 },
      { display: '时间', field: 'createtime', width: 10 },
      { display: '状态', field: 'status', width: 10 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ui-sref="index.order.detail({id:${id}, type: 'gold'})">查看详情</a> `;
          return tpl;
        },
        sort: false,
        width: 10
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
