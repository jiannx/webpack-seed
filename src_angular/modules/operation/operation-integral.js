import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('integralListCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    title: '',
    status: 0, // 状态 0=全部 1=失效  2=生效
    createtime_s: '',
    createtime_e: ''
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };
  $scope.statusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '失效' },
    { id: 2, name: '生效' },
  ];

  $scope.onSearch = function() {
    if ($scope.rangTime.startDate) {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.rangTime.startDate.format('YYYY-MM-DD HH:mm'),
        createtime_e: $scope.rangTime.endDate.format('YYYY-MM-DD HH:mm'),
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
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

  $scope.onEdit = function(type, id) {
    if (type === 1) {
      request('integralChangeStatus', { id, types: 1 }).success(() => {
        $scope.onSearch();
      });
    } else if (type === 2) {
      request('integralChangeStatus', { id, types: 2 }).success(() => {
        $scope.onSearch();
      });
    } else if (type === 0) {
      $state.go('index.operation.integral.add', { id });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('integralList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 20 },
      { display: '标题', field: 'title', width: 20 },
      { display: '发布时间', field: 'release_time', width: 20 },
      { display: '状态', field: 'status', width: 20 }, {
        display: '操作',
        field: function(row) {
          let t = `<a ng-click="onEdit(0, ${row.id})">编辑</a> `;
          if (true) {
            t += `<a ng-click="onEdit(1, ${row.id})">上线</a> `;
          }
          if (true) {
            t += `<a ng-click="onEdit(2, ${row.id})">下线</a>`
          }
          return t;
        },
        width: 20
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    }
  });
});
