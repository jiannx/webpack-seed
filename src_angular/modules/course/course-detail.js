import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 教师详情 包含审核
app.controller('courseDetailCtrl', function($scope, $state, $stateParams, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.type = $stateParams.type; // 0:详情 1:审核
  $scope.detail = {};
  let req = ['courseDetail', 'courseApplyDetail'];

  request(req[$scope.type], { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });

  // 审核数据
  $scope.applyData = {
    id: id,
    types: '', // 类型 1=通过 2=拒绝
    examine_refuse: '', // 拒绝原因（types=2时填写）
    scale_teacher: '', // 老师比例（types=1时填写）
    scale_web: '', // 平台比例（types=1时填写）
  };
  $scope.applyType = [
    { id: 1, name: '通过' },
    { id: 2, name: '拒绝' }
  ];

  $scope.onApplySubmit = function() {
    // console.log($scope.applyData);
    request('courseApply', $scope.applyData).success(() => {
      $state.go('index.course.list');
    });
  };
});
