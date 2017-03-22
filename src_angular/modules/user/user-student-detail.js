import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 学生详情 包含审核
app.controller('studentDetailCtrl', function($scope, $state, $stateParams, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.detail = {};

  request('studentDetail', { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });
});
