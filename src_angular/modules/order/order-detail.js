import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('orderDetailCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {
  let id = $stateParams.id;
  let type = $stateParams.type;

  if (type === 'gold' || type === 'money') {
    request('orderRechargeDetail', { id }).success((res) => {
      $scope.detail = res.rsm.info;
    });
  }
});
