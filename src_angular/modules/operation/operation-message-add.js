import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationMessageAddCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation, uiUploader) {
  $scope.newData = {
    title: '',
    weburl: '',
    contents: '',
  };
  // let editor = new wangEditor('wangEditor');
  // editor.create();
  $scope.onSubmit = function() {
    // $scope.newData.contents = editor.$txt.html();
    // if ($scope.newData.contents === '' || $scope.newData.contents === '<p><br></p>') {
    //   neDialog.alert('内容不能为空');
    // }
    // console.log($scope.newData.contents);
    request('messageAdd', $scope.newData).success(() => {
      $state.go('index.operation.message');
    });
  };
});
