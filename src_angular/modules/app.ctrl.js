import app from 'app.config';

app.controller('appCtrl', function($scope, $state, neDialog, request, $validation, appService) {
  let auth = $.parseJSON(appService.getCookie('userAuth'));
  if (!auth) {
    $state.go('login.in');
    return;
  }
  $scope.auth = {};
  for (let item of auth) {
    $scope.auth[item.power] = true;
  }

  $scope.onChangePassword = function() {
    $scope.newData = {
      old_password: '',
      new_password: '',
      again_password: '',
    };
    $scope.identityList = [];
    neDialog.confirm({
      title: '修改密码',
      content: require('./auth/change-password.html'),
      area: ['600px', '400px'],
      yes: (scope, close) => {
        $validation.validate(scope.changePassWord);
        if (!scope.changePassWord.$valid) {
          return;
        }
        if (scope.newData.old_password === scope.newData.new_password) {
          neDialog.alert('原始密码与新密码重复');
          return;
        }
        request('accountChangePassword', scope.newData).success(() => {
          close();
          neDialog.msg('密码修改成功！', { time: 2000 });
          setTimeout(function() {
            // $state.go('login.in');
          }, 1000);
        });
      }
    });
  };
});
