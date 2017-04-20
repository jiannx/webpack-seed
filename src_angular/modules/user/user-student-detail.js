import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 学生详情 包含审核
app.controller('studentDetailCtrl', function($scope, $state, $stateParams, request, neDialog, neTable, appChartService) {
  let id = $stateParams.id;
  $scope.detail = {};

  request('studentDetail', { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });
  request('studentDetailActive', { id }).success((res) => {
    let data = [];
    for (let x of res.rsm.info) {
      data.push({
        data: x.time_sum,
        time: x.day_info
      });
    }
    appChartService.line('active-grid', {
      '活跃时长': data
    });
  });
});
