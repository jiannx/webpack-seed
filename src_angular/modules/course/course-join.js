import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('courseJoinCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    real_name: '',
    telphone: '',
    course_id: '', // (课程编号)
    province: '',
    city: '',
    area: '',
    typesid: 0, // (0=全部 1=线上课 2=线下课)
    course_cate_id: 0, // (专题ID 0=全部 其他传相对应ID)
    createtime_s: '',
    createtime_e: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.citySel = [];

  request('courseCateList').success((res) => {
    $scope.cateList = res.rsm.info;
  });

  $scope.createTime = { startDate: '', endDate: '' };
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    timePicker: false,
    timePicker24Hour: false,
    locale: {
      format: 'YYYY-MM-DD',
    }
  });

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
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.citySel = [];
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

  $scope.onEdit = function(event, type, id) {
    // 0:详情 1:审核
    if (angular.isDefined(type) && angular.isDefined(id)) {
      $state.go('index.course.join.detail', { id });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('courseJoinList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: '课程编号', field: 'id', width: 5 },
      { display: '姓名', field: 'real_name', width: 10 },
      { display: '手机号', field: 'telphone', width: 10 }, {
        display: '所在地',
        field: function(row) {
          return `${row.province} ${row.city} ${row.area}`;
        },
        width: 15
      },
      { display: '专题', field: 'cate_name', width: 5 },
      { display: '标题', field: 'title', width: 10 },
      { display: '课程总费用', field: 'charging_all', width: 5 },
      { display: '审核时间', field: 'examine_time', width: 10 },
      { display: '上课模式', field: 'typesid', width: 5 },
      { display: '已报名人数', field: 'have_sum', width: 10 },
      { display: '课程进度', field: 'course_pre', width: 5 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="btn-control" ng-click="onEdit($event, 0, ${id})">详情</a> `;
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
