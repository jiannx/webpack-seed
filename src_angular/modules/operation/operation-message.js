import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('messageListCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    title: '',
    weburl: '',
    contents: '',
  };

  $scope.onSearch = function() {
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
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

  $scope.onEdit = function(id) {
    request('messageSend', { id }).success(() => {
      $scope.onSearch();
    });
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('messageList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'ID', field: 'id', width: 10 },
      { display: '标题', field: 'title', width: 20 },
      { display: '网址', field: 'weburl', width: 20 },
      { display: '内容', field: 'contents', width: 20 },
      { display: '状态', field: 'status', width: 15 }, {
        display: '操作',
        field: function(row) {
          if (row.status === '发送') {
            return `<a class="bg-primary" ng-click="onEdit(${row.id})">发送</a>`;
          }
        },
        width: 15
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    },
    btns: '<a type="button" class="btn btn-primary btn-sm" ui-sref="index.operation.message.add">新增</a>'
  });
});
