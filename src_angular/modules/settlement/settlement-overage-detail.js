import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleOverageDetailCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.editData = {
    id: id, // 信息ID
    amount: '', // 应结算金额
    reason: '', // 修改原因
  };
  $scope.isEdit = false;

  function getData() {
    request('settlementOverageDetail', { id }).success((res) => {
      $scope.detail = res.rsm.info;
    });
  }
  getData();

  $scope.onCheck = function(type) {
    if (type === 1) {
      neDialog.ask({
        content: `确认用户余额${$scope.detail.account_balance}, 本次申请提现金额${$scope.detail.amount}`,
        yes: (scope, close) => {
          request('settlementOverageCheck', { id, types: 1 }).success(() => {
            close();
            getData();
          });
        }
      });
    } else if (type === 2) {
      neDialog.ask({
        content: '标记为打款异常？',
        yes: (scope, close) => {
          request('settlementOverageCheck', { id, types: 2 }).success(() => {
            close();
            getData();
          });
        }
      });
    }
  };
});
