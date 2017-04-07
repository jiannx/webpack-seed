import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('orderCourseAdvanceCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    order_id: '',
    real_name: '',
    telphone: '',
    status: 0,
    createtime_s: '',
    createtime_e: '',
    course_id: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.statusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '未处理' },
    { id: 2, name: '已处理' },
  ];
  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
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
    $scope.rangTime = { startDate: '', endDate: '' };
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

  $scope.onEdit = function(type, id) {
    $state.go('index.operation.suggest.detail', { type, id });
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('orderCourseAdvanceList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 10 },
      { display: '订单号', field: 'order_id', width: 15 },
      { display: '线上课', field: 'typesid', width: 10 },
      { display: '金额', field: 'order_amount', width: 10 },
      { display: '下单姓名', field: 'real_name', width: 10 },
      { display: '下单手机号码', field: 'telphone', width: 10 },
      { display: '下单时间', field: 'createtime', width: 10 },
      { display: '状态', field: 'status', width: 10 },
      { display: '课程ID', field: 'course_id', width: 5 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ui-sref="index.order.detail({id:${id}, type: 'courseAdvance'})">查看详情</a> `;
          return tpl;
        },
        sort: false,
        width: 10
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
