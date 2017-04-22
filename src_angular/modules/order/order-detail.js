import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('orderDetailCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  let id = $stateParams.id;
  let type = $stateParams.type;
  $scope.type = type;

  $scope.refundData = {
    id: id,
    amount: '', // 退款金额
    refund_reason: ''
  };

  function getData() {
    if (type === 'gold' || type === 'money') {
      request('orderRechargeDetail', { id }).success((res) => {
        $scope.detail = res.rsm.info;
      });
    } else if (type === 'courseAdvance') {
      request('orderCourseAdvanceDetail', { id }).success((res) => {
        $scope.detail = res.rsm.info;
      });
    } else if (type === 'courseNext') {
      request('orderCourseNextDetail', { id }).success((res) => {
        $scope.detail = res.rsm.info;
      });
    }
  }
  getData();

  let layer = null;
  $scope.onRefundSubmit = function() {
    if (type === 'gold' || type === 'money') {
      request('orderRechargeRefund', { id }).success((res) => {
        getData();
        layer.close();
      });
    } else if (type === 'courseAdvance') {
      request('orderCourseAdvanceRefund', $scope.refundData).success((res) => {
        getData();
        layer.close();
      });
    } else if (type === 'courseNext') {
      request('orderCourseNextRefund', { id }).success((res) => {
        getData();
        layer.close();
      });
    }
  };

  $scope.onRefund = function() {
    layer = neDialog.confirm({
      title: '退款',
      content: require('./tpls/refund.html'),
      scope: $scope,
      area: ['500px', '300px'],
      btn: null,
      yes: function(scope, close) {
        close();
      }
    });
  };
});
