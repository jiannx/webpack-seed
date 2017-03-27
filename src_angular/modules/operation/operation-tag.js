import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationTagCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation) {
  function getData() {
    request('tagList', { typeid: 1 }).success((res) => {
      $scope.tagList = res.rsm.info;
    });
  }
  getData();

  $scope.onAdd = function(typeid, data) {
    $scope.typeid = typeid;
    $scope.newData = {
      title: '',
      types: typeid
    };
    if (data) {
      Object.assign($scope.newData, data);
    }
    neDialog.confirm({
      title: data ? '编辑标签' : '添加标签',
      content: require('./tpls/operation-tag-add.html'),
      area: ['500px', '300px'],
      scope: $scope,
      yes: (scope, close) => {
        $validation.validate(scope.addTag);
        if (!scope.addTag.$valid) {
          return;
        }
        let url = data ? 'tagEdit' : 'tagAdd';
        request(url, $scope.newData).success(() => {
          getData();
          close();
        });
      }
    });
  };
  $scope.onEdit = function(typeid, index) {

  };
  $scope.onDel = function(typeid, index, id) {
    neDialog.ask({
      content: '确定删除吗?',
      yes: (scope, close) => {
        request('tagDel', { id }).success(() => {
          getData();
          close();
        });
      }
    });
  };
});
