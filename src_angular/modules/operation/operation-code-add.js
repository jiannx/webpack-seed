import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationCodeAddCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation, uiUploader) {
  $scope.newData = {
    code_sum: '',
    code_amount: '',
    note: '',
  };
  $scope.onSubmit = function() {
    request('redeemCodeAdd', $scope.newData).success(() => {
      $state.go('index.operation.code');
    });
  };
});
