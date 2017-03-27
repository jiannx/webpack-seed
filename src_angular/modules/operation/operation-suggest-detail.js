import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationSuggestDetailCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation, uiUploader) {
  let id = $stateParams.id;
  $scope.type = $stateParams.type; // 0详情，1处理
  $scope.newData = {
    id: id,
    reply_note: '',
  };
  if (id) {
    request('suggestDetail', { id }).success((res) => {
      $scope.detail = res.rsm.info;
    });
  }

  $scope.onSubmit = function() {
    request('suggestApply', $scope.newData).success(() => {
      $state.go('index.operation.suggest');
    });
  };
});
