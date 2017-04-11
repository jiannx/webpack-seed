import app from 'app.config';
import angular from 'angular';
import moment from 'moment';
import api from '../../app.api.js';

app.controller('operationBannerCtrl', function($scope, $state, $rootScope, request, neDialog, neTable) {
  let grid = null;
  let def = {
    title: '',
    status: 0,
    typesid: 0,
    createtime_s: '',
    createtime_e: '',
  };
  $scope.filterOpt = angular.copy(def);
  $scope.rangTime = { startDate: '', endDate: '' };

  $scope.onSearch = function() {
    if ($scope.rangTime.startDate) {
      angular.extend($scope.filterOpt, {
        createtime_s: $scope.rangTime.startDate.format('YYYY-MM-DD HH:mm'),
        createtime_e: $scope.rangTime.endDate.format('YYYY-MM-DD HH:mm'),
      });
    } else {
      angular.extend($scope.filterOpt, {
        createtime_s: '',
        createtime_e: '',
      });
    }
    grid.setHttpData($scope.filterOpt);
  };

  $scope.onReset = function() {
    $scope.filterOpt = angular.copy(def);
    $scope.rangTime = { startDate: '', endDate: '' };
    $scope.onSearch();
  };
  $scope.bannerStatusList = [
    { id: 0, name: '全部' },
    { id: 1, name: '下线' },
    { id: 2, name: '上线' },
  ];

  $scope.onDel = function() {
    // neDialog.ask({
    //   content: '确定删除吗？',
    //   yes: (scope, close) => {
    //     close();
    //   }
    // });
  };

  $scope.onEdit = function(event, type, id) {
    // 0:编辑 1:上线 2:下线
    if (type === 0) {
      $state.go('index.operation.banner.add', { id, type });
    }
    if (type === 1) {
      neDialog.ask({
        content: '确认要上线吗？',
        yes: (scope, close) => {
          request('bannerChangeStatus', { id: id, types: 1 }).success(() => {
            $scope.onSearch();
            close();
          });
        }
      });
    }
    if (type === 2) {
      neDialog.ask({
        content: '确认要下线吗？',
        yes: (scope, close) => {
          request('bannerChangeStatus', { id: id, types: 0 }).success(() => {
            $scope.onSearch();
            close();
          });
        }
      });
    }
  };

  grid = neTable.create({
    parent: '#grid',
    scope: $scope,
    http: request('bannerList'),
    httpData: $scope.filterOpt,
    withCheckBox: false,
    columnDefs: [
      { display: 'id', field: 'id', width: 5 },
      { display: '标题', field: 'title', width: 10 }, {
        display: '图片',
        field: function(row) {
          return `<a href="${api.imgDomain + row.titlepic}" target="_blank">${row.titlepic}</a>`;
        },
        width: 25
      }, {
        display: '链接地址',
        field: function(row) {
          return `<a href="${row.weburl}" target="_blank">${row.weburl}</a>`;
        },
        width: 25
      },
      { display: '发布时间', field: 'release_time', width: 20 }, {
        display: '操作',
        field: function(rowData) {
          let id = rowData.id;
          let tpl = `<a class="bg-primary" ng-click="onEdit($event, 0, ${id})">编辑 </a> `;
          if (true) {
            tpl += `<a class="bg-success" ng-click="onEdit($event, 1, ${id})">上线 </a>`;
          }
          if (true) {
            tpl += `<a class="bg-warning" ng-click="onEdit($event, 2, ${id})">下线 </a>`;
          }
          return tpl;
        },
        sort: false,
        width: 15
      },
    ],
    onResHandler: function(resData) {
      return resData.rsm;
    },
    btns: '<a class="btn btn-primary btn-sm" ui-sref="index.operation.banner.add">添加运营位</a>'
  });
});
