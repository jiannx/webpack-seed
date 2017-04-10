import app from 'app.config';
import angular from 'angular';
import moment from 'moment';

app.controller('settleGoldCtrl', function($scope, $state, $stateParams, $rootScope, request, neDialog, neTable) {

  $scope.newData = {
    telphone: '', // 手机号码
    amount: '', // 充值金币
  };

  $scope.onSubmit = function() {
    request('settlementGoldRecharge', $scope.newData).success(() => {
      neDialog.msg('添加成功');
      $scope.newData = {
        telphone: '', // 手机号码
        amount: '', // 充值金币
      };
    });
  };
  $scope.onUpload = function() {
    neDialog.alert('暂时不支持批量导入功能');
  };
});
