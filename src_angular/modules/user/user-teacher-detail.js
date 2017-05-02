import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 教师详情 包含审核
app.controller('teacherDetailCtrl', function($scope, $state, $stateParams, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.type = $stateParams.type; // 0:详情 1:资质审核 2:星级审核
  $scope.detail = {};
  let req = ['teacherDetail', 'teacherAptitudeApplyDetail', 'teacherStarApplyDetail'];

  request(req[$scope.type], { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });

  // 星级评审
  $scope.starApplyData = {
    userid: $stateParams.id, // 会员ID（老师）
    pronunciation: '', // 发音、语音语调
    teaching_material: '', // 对应教材熟练度
    yearning_degree: '', // 对教育向往度
    intentions: '', // 用心度
  };
  $scope.newScore = null;
  // 获取新评分
  $scope.onScoreChange = function() {
    $scope.newScore = null;
    let d = [$scope.starApplyData.pronunciation, $scope.starApplyData.teaching_material, $scope.starApplyData.yearning_degree, $scope.starApplyData.intentions];
    if (d[0] !== '' && d[1] !== '' && d[2] !== '' && d[3] !== '' && !isNaN(d[0]) && !isNaN(d[1]) && !isNaN(d[2]) && !isNaN(d[3])) {
      d.map(function(key, i) {
        d[i] = Number(d[i], 10);
      });
      if (d[0] <= 5 && d[1] <= 5 && d[2] <= 5 && d[3] <= 5) {
        $scope.newScore = ((d[0] + d[1] + d[2] + d[3]) / 4).toFixed(1);
      }
    }
    console.log($scope.newScore);
  };
  $scope.onScoreSubmit = function() {
    request('teacherStarApply', $scope.starApplyData).success(() => {
      $state.go('index.user.teacher');
    });
  };

  // 资质审核
  $scope.aptitudeData = {
    id: '', // 认证ID
    userid: $stateParams.id, // 会员ID（老师）
    types: '', // 类型 1=通过 2=拒绝（等2时，需要填写原因）
    refuse_note: '', // 拒绝原因
  };
  $scope.onAptitudeSubmit = function() {
    $scope.aptitudeData.id = $scope.detail.members_certify.id;
    request('teacherAptitudeApply', $scope.aptitudeData).success(() => {
      $state.go('index.user.teacher');
    });
  };
});
