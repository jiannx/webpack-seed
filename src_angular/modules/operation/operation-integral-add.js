import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('integralAddCtrl', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation, uiUploader) {
  let id = $stateParams.id;
  $scope.type = $stateParams.type; // 0:编辑 null: 天剑
  $scope.newData = {
    title: '',
    release_time: '',
    img: '',
    contents: '',
  };
  if (id) {
    request('integralDetail', { id }).success((res) => {
      Object.assign($scope.newData, res.rsm.info);
      $scope.releaseTime = $scope.newData.release_time;
      $scope.imgUrl = $scope.newData.img;
      editor.$txt.append($scope.newData.contents);
    });
  }
  $scope.releaseTime = '';
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    singleDatePicker: true,
  });
  let editor = new wangEditor('wangEditor');
  editor.create();

  $scope.onSubmit = function() {
    if ($scope.releaseTime !== '') {
      angular.extend($scope.newData, {
        release_time: $scope.releaseTime.format('YYYY-MM-DD HH:mm'),
      });
    }
    $scope.newData.contents = editor.$txt.html();
    if ($scope.newData.contents === '' || $scope.newData.contents === '<p><br></p>') {
      neDialog.alert('内容不能为空');
      return;
    }
    let url = id ? 'integralEdit' : 'integralAdd';
    request(url, $scope.newData).success(() => {
      $state.go('index.operation.integral');
    });
  };
  $scope.onUpload = function() {
    uiUploader.startUpload({
      url: api.upload.url,
      concurrency: 2,
      headers: {
        'Accept': 'application/json'
      },
      paramName: 'image',
      onCompleted: function(file, response) {
        let res = JSON.parse(response);
        $scope.newData.img = res.rsm.dataurl;
        $scope.imgUrl = res.rsm.imgurl;
        $scope.$apply();
      }
    });
  };
  let element = document.getElementById('upload');
  $scope.onReSel = function() {
    element.click();
  };
  element.addEventListener('change', function(e) {
    let files = e.target.files;
    uiUploader.addFiles(files);
    $scope.files = uiUploader.getFiles();
    $scope.$apply();
    $scope.onUpload();
  });
});
