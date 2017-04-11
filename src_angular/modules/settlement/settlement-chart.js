import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleChartCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, appChartService) {
  $scope.createTime = { startDate: moment().subtract(7, 'day').hour(0).minute(0), endDate: moment().hour(0).minute(0) };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });

  function getData() {
    request('settlementReportGoldAndMoney', {
      start_day: $scope.createTime.startDate.format('YYYY-MM-DD'),
      end_day: $scope.createTime.endDate.format('YYYY-MM-DD')
    }).success((res) => {
      $scope.detail = res.rsm;
      let goldIn = [];
      let goldOut = [];
      let moneyIn = [];
      let moneyOut = [];
      for (let item of res.rsm.gold_list) {
        goldIn.push({ data: item.gold_recharge, time: item.createtime }); // 充值
        goldOut.push({ data: item.gold_consume, time: item.createtime }); // 消费
      }
      for (let item of res.rsm.amount_info) {
        moneyIn.push({ data: item.balance_count, time: item.createtime }); // 充值
        moneyOut.push({ data: item.deposit_count, time: item.createtime }); // 消费
      }
      appChartService.line('chart1', {
        '充值金币': goldIn,
        '消费金币': goldOut
      });
      appChartService.line('chart2', {
        '充值余额': moneyIn,
        '申请提现': moneyOut
      });
    });
    request('settlementReportCourse').success((res) => {
      $scope.tableData = res.rsm;
    });
  }
  // getData();

  $scope.onTixian = function() {
    let sco = null;
    let lay = null;
    $scope.amount = '';
    $scope.onSubmit = function() {
      request('settlementReportWeb', { amount: sco.amount }).success(() => {
        lay.close();
      });
    };
    lay = neDialog.confirm({
      title: '平台提现',
      scope: $scope,
      content: require('./tpls/tixian.html'),
      area: ['400px', '200px'],
      btn: null,
      success: (...arg) => {
        sco = arg[2];
      }
    });
  };
  $scope.$watch('createTime', function() {
    getData();
  });
});
