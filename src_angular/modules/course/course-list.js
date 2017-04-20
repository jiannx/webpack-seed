import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('courseListCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telphone: '',
    course_id: '', // (课程编号)
    province: '',
    city: '',
    area: '',
    typesid: 0, // (0=全部 1=线上课 2=线下课)
    customer_service_id: '',
    examine_id: '', // (审核人 0=全部 其他传相对应的审核人ID)
    status: 0, // (状态 0=全部 1=待审核  2=审核通过  3=审核拒绝  4=待开课  5=进行中  6=已完成  7=异常)
    course_cate_id: 0, // (专题ID 0=全部 其他传相对应ID)
    createtime_s: '',
    createtime_e: '',
    communicate_date_s: '',
    communicate_date_e: '',
    communicate_times_s: '',
    communicate_times_e: '',
  };
  $scope.timeSel = [];
  $scope.filterOpt = angular.copy(def);
  $scope.citySel = [];
  request('customerServiceAll', { typesid: 0 }).success((res) => {
    $scope.serviceList = res.rsm.info;
    $scope.serviceList.unshift({ id: '', real_name: '所有客服' });
  });
  request('courseCateList').success((res) => {
    $scope.cateList = res.rsm.info;
  });
  request('courseExamine').success((res) => {
    $scope.examineList = res.rsm.info;
  });
  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });

  console.log($scope.createTimeOpt);

  $scope.onSearch = function() {
    if ($scope.citySel.length > 0) {
      angular.extend($scope.filterOpt, {
        province: $scope.citySel[0],
        city: $scope.citySel[1],
        area: $scope.citySel[2],
      });
    }
    if ($scope.createTime.startDate !== '') {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.createTime.startDate.format('YYYY-MM-DD'),
        createtime_e: $scope.createTime.endDate.format('YYYY-MM-DD'),
      });
    }
    angular.extend($scope.filterOpt, {
      communicate_times_s: $scope.timeSel[0] || '',
      communicate_times_e: $scope.timeSel[1] || '',
    });
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.citySel = [];
    $scope.createTime = { startDate: '', endDate: '' };
    $scope.timeSel = [];
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
    // 0:详情 1:审核
    if (angular.isDefined(type) && angular.isDefined(id)) {
      $state.go('index.course.detail', { id, type });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('courseList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: '编号', field: 'id', width: 5 },
      { display: '姓名', field: 'real_name', width: 10 },
      { display: '手机号', field: 'telphone', width: 10 }, {
        display: '所在地',
        field: function(row) {
          return `${row.province} ${row.city} ${row.area}`;
        },
        width: 15
      },
      { display: '主题', field: 'cate_name', width: 5 },
      { display: '标题', field: 'title', width: 10 },
      { display: '负责客服', field: 'service_name', width: 5 },
      { display: '提交时间', field: 'createtime', width: 10 },
      { display: '状态', field: 'status', width: 5 },
      { display: '上课模式', field: 'typesid', width: 8 },
      { display: '审核人', field: 'nickname', width: 5 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-success" ng-click="onEdit($event, 0, ${id})">查看详情</a> `;
          if (rowData.status === '未审核') {
            tpl += `<a class="bg-primary" ng-click="onEdit($event, 1, ${id})">课程审核</a>`;
          }
          return tpl;
        },
        sort: false,
        width: 12
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
