import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleCourseDetailCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.editData = {
    id: id, // 信息ID
    amount: '', // 应结算金额
    reason: '', // 修改原因
  };
  $scope.isEdit = false;

  function getData() {
    request('settlementCourseDetail', { id }).success((res) => {
      $scope.detail = res.rsm.info;
    });
  }
  getData();

  $scope.onEditAmount = function() {
    $scope.isEdit = true;
  };
  $scope.onSubmit = function() {
    request('settlementCourseChangeAmount', $scope.editData).success(() => {
      $scope.onCancel();
      getData();
    });
  };
  $scope.onCancel = function() {
    $scope.isEdit = false;
  };
});
