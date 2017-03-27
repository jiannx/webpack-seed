import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationTargetCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation) {
  function getData() {
    request('indicatorsList', { typeid: 1 }).success((res) => {
      $scope.actionList = res.rsm.info;
    });
    request('indicatorsList', { typeid: 2 }).success((res) => {
      $scope.timeList = res.rsm.info;
    });
    request('indicatorsList', { typeid: 3 }).success((res) => {
      $scope.specialList = res.rsm.info;
    });
  }
  getData();

  $scope.onAdd = function(typeid, data) {
    $scope.typeid = typeid;
    $scope.newData = {
      title: '',
      score: '',
      typeid: typeid
    };
    if (data) {
      Object.assign($scope.newData, data);
    }
    neDialog.confirm({
      title: data ? '编辑指标' : '添加指标',
      content: require('./tpls/operation-target-add.html'),
      area: ['500px', '300px'],
      scope: $scope,
      yes: (scope, close) => {
        $validation.validate(scope.addTarget);
        if (!scope.addTarget.$valid) {
          return;
        }
        let url = data ? 'indicatorsEdit' : 'indicatorsAdd';
        request(url, $scope.newData).success(() => {
          getData();
          close();
        });
      }
    });
  };
  $scope.onEdit = function(typeid, index) {

  };
  $scope.onDel = function(typeid, index) {
    let id = null;
    if (typeid === 1) {
      id = $scope.actionList[index].id;
    } else if (typeid === 2) {
      id = $scope.timeList[index].id;
    } else if (typeid === 3) {
      id = $scope.specialList[index].id;
    }
    neDialog.ask({
      content: '确定删除吗?',
      yes: (scope, close) => {
        request('indicatorsDel', { id }).success(() => {
          getData();
          close();
        });
      }
    });
  };
});
