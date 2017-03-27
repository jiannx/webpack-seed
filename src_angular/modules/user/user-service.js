import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 客服列表
app.controller('serviceListCtrl', function($scope, $state, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telephone: '',
    province: '',
    city: '',
    area: '',
    teacher_star: 0,
    customer_service_id: 0,
    invite_userid: 0,
    aptitude_apply: 0,
    teacher_star_apply: 0,
    card_number: 0,
    communicate_date_s: '',
    communicate_date_e: '',
    communicate_times_s: '',
    communicate_times_e: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.citySel = [];

  $scope.onSearch = function() {
    if ($scope.citySel.length > 0) {
      angular.extend($scope.filterOpt, {
        province: $scope.citySel[0],
        city: $scope.citySel[1],
        area: $scope.citySel[2],
      });
    }
    if ($scope.rangTime.startDate !== '') {
      angular.extend($scope.filterOpt, {
        communicate_date_s: $scope.rangTime.startDate.format('YYYY-MM-DD'),
        communicate_date_e: $scope.rangTime.endDate.format('YYYY-MM-DD'),
        communicate_times_s: $scope.rangTime.startDate.format('HH:mm'),
        communicate_times_e: $scope.rangTime.endDate.format('HH:mm'),
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.citySel = [];
    $scope.rangTime = { startDate: '', endDate: '' };
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

  $scope.onEdit = function(event, type, id) {
    // 0:详情 1:资质审核 2:星级审核
    if (angular.isDefined(type) && angular.isDefined(id)) {
      $state.go('index.user.teacher.detail', { id, type });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('customerServiceList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: '姓名', field: 'real_name', width: 20 },
      { display: '手机号', field: 'telphone', width: 20 }, {
        display: '所在地',
        field: function(row) {
          return `${row.province} ${row.city} ${row.area}`;
        },
        width: 20
      },
      { display: '服务人群', field: 'service_groups', width: 20 },
      { display: '实名认证', field: 'card_number', width: 10 },
      { display: '服务人数', field: 'service_count', width: 10 },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});


// 客服详情
app.controller('serviceDetailCtrl', function($scope, $state, $stateParams, request, neDialog, neTable) {
  let id = $stateParams.id;
  $scope.detail = {};

  request('studentDetail', { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });
});

// 客服添加
app.controller('serviceAddCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  $scope.addData = {
    real_name: '', // 姓名
    card_number: '', // 身份证号码
    telphone: '', // 手机号码
    password: '', // 密码
    sex: '', // 性别 1=男 2=女
    province: '', // 省
    city: '', // 市
    area: '', // 县、区
    service_groups: '', //服务人群  1=学生 2=教师
  };
  $scope.serviceGroup = angular.copy($rootScope.const.serviceGroup);
  $scope.serviceGroup.splice(0, 1);
  $scope.citySel = [];
  $scope.onSubmit = function() {
    angular.extend($scope.addData, {
      province: $scope.citySel[0],
      city: $scope.citySel[1],
      area: $scope.citySel[2],
    });
    request('customerServiceAdd', $scope.addData).success(() => {
      $state.go('index.user.service');
    });
  };
});