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
    service_groups: 0,
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
    if ($scope.rangTime.startDate) {
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
    if (type === 0 && angular.isDefined(id)) {
      $state.go('index.user.service.detail', { id, type });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('customerServiceList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 5 },
      { display: '姓名', field: 'real_name', width: 15 },
      { display: '手机号', field: 'telphone', width: 15 }, {
        display: '所在地',
        field: function(row) {
          return `${row.province} ${row.city} ${row.area}`;
        },
        width: 20
      },
      { display: '实名认证', field: 'card_number', width: 10 },
      { display: '服务人群', field: 'service_groups', width: 10 },
      { display: '服务人数', field: 'service_count', width: 10 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ng-click="onEdit($event, 0, ${id})">查看详情</a> `;
          return tpl;
        },
        sort: false,
        width: 15
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});


// 客服详情
app.controller('serviceDetailCtrl', function($scope, $state, $stateParams, request, neDialog, $rootScope, neTable) {
  let id = $stateParams.id;
  let grid = null;
  $scope.detail = {};

  $scope.createTime = { startDate: moment().subtract(7, 'day').hour(0).minute(0), endDate: moment().hour(0).minute(0) };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    opens: 'left',
    // locale: {
    //   format: 'YYYY-MM-DD',
    // }
  });

  request('customerServiceDetail', { id }).success((res) => {
    $scope.detail = res.rsm.info;
  });

  function getData() {
    request('customerServiceDetailSettlement', {
      id,
      start_day: $scope.createTime.startDate.format('YYYY-MM-DD HH:mm'),
      end_day: $scope.createTime.endDate.format('YYYY-MM-DD HH:mm')
    }).success((res) => {
      $scope.detailSettlement = res.rsm;
      grid.setData({
        page_total: 1,
        records: res.rsm.info.length,
        page_now: 1,
        page_rows: 20,
        info: res.rsm.info
      });
    });
  }


  $scope.$watch('createTime', function() {
    getData();
  });
  grid = neTable.create({
    parent: '#settlement-grid',
    scope: $scope,
    withCheckBox: false,
    withPage: false,
    isInit: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 20 },
      { display: '课后单次付费', field: 'charging_types', width: 20 },
      { display: '结算金额', field: 'amount', width: 20 },
      { display: '下单账号', field: 'telphone', width: 20 },
      { display: '结算时间', field: 'createtime', width: 20 },
    ],
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
