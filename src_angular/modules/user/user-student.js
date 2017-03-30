import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

// 学生列表
app.controller('studentListCtrl', function($scope, $state, $stateParams, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telephone: '',
    province: '',
    city: '',
    area: '',
    teacher_star: 0,
    customer_service_id: '',
    invite_userid: 0,
    card_number: 0,
  };
  $scope.filterOpt = angular.copy(def);
  $scope.citySel = [];
  request('customerServiceAll', { typesid: 1 }).success((res) => {
    $scope.serviceList = res.rsm.info;
    $scope.serviceList.unshift({ id: '', real_name: '所有客服' });
  });

  $scope.onSearch = function() {
    if ($scope.citySel.length > 0) {
      angular.extend($scope.filterOpt, {
        province: $scope.citySel[0],
        city: $scope.citySel[1],
        area: $scope.citySel[2],
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.citySel = [];
    $scope.onSearch();
  };

  $scope.onEdit = function(event, type, id) {
    // 0:详情 1:资质审核 2:星级审核
    if (angular.isDefined(type) && angular.isDefined(id)) {
      $state.go('index.user.student.detail', { id });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('studentList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
    { display: 'ID', field: 'id', width: 5 },
      { display: '姓名', field: 'real_name', width: 10 },
      { display: '手机号', field: 'telphone', width: 10 }, {
        display: '所在地',
        field: function(row) {
          return `${row.province} ${row.city} ${row.area}`;
        },
        width: 15
      },
      { display: '邀请码', field: 'invite_userid', width: 5 },
      { display: '实名认证', field: 'card_number', width: 5 },
      { display: '客服', field: 'customer_service_id', width: 5 },
      { display: '积分', field: 'integral', width: 5 },
      { display: '活跃时长', field: 'active_time', width: 5 },
      { display: '会员卡号', field: 'card_id', width: 9 },
      { display: '学校', field: 'school', width: 8 },
      { display: '年级', field: 'current_grade', width: 8 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="btn-control" ng-click="onEdit($event, 0, ${id})">详情</a> `;
          return tpl;
        },
        sort: false,
        width: 5
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
