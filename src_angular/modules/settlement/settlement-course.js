import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleCourseCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telphone: '',
    customer_service_id: 0, // 客服ID
    charging_types: 0, // 付款方式 0=全部 1=课前全额预付 2=课后单次付费
    status: 0, // 结算状态 0=全部 1=待结算  2=已结算  3=结算异常
    createtime_s: '',
    createtime_e: '',
    course_id: '', // 课程ID
    typesid: 0 // 上课模式 1=线上课 2=线下课
  };
  $scope.filterOpt = angular.copy(def);
  $scope.statusList = [ // 结算状态
    { id: 0, name: '全部' },
    { id: 1, name: '待结算' },
    { id: 2, name: '已结算' },
    { id: 3, name: '结算异常' },
  ];
  $scope.chargingTypesList = [ // 结算状态
    { id: 0, name: '全部' },
    { id: 1, name: '课前全额预付' },
    { id: 2, name: '课后单次付费' },
  ];
  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });
  request('customerServiceAll', { typesid: 2 }).success((res) => {
    $scope.serviceList = res.rsm.info;
    $scope.serviceList.unshift({ id: 0, real_name: '所有客服' });
  });

  $scope.onSearch = function() {
    if ($scope.createTime.startDate) {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.createTime.startDate.format('YYYY-MM-DD'),
        createtime_e: $scope.createTime.endDate.format('YYYY-MM-DD'),
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.createTime = { startDate: '', endDate: '' };
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

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('settlementCourseList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 7 },
      { display: '课程ID', field: 'course_id', width: 8 },
      { display: '老师', field: 'real_name', width: 10 },
      { display: '老师手机号码', field: 'telphone', width: 10 },
      { display: '付款方式', field: 'charging_types', width: 10 },
      { display: '日期', field: 'createtime', width: 10 },
      { display: '上课模式', field: 'typesid', width: 10 },
      { display: '状态', field: 'status', width: 10 },
      { display: '结算金额', field: 'teacher_amount', width: 5 },
      { display: '客服姓名', field: 'customer_service_name', width: 10 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ui-sref="index.settlement.course.detail({ id:${id} })">查看详情</a> `;
          return tpl;
        },
        sort: false,
        width: 10
      },
    ],
    onResHandler: function(resData) {
      // resData.rsm.info = [{ id: 1 }];
      return resData.rsm;
    }
  });
});
