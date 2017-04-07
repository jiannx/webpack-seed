import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('orderDetailCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  let id = $stateParams.id;
  let type = $stateParams.type;
  $scope.type = type;

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

  $scope.onRefund = function() {
    if (type === 'gold' || type === 'money') {
      request('orderRechargeRefund', { id }).success((res) => {
        getData();
      });
    } else if (type === 'courseAdvance') {
      request('orderCourseAdvanceRefund', { id }).success((res) => {
        getData();
      });
    } else if (type === 'courseNext') {
      request('orderCourseNextRefund', { id }).success((res) => {
        getData();
      });
    }
  };
});
