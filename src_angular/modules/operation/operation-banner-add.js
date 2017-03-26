import app from 'app.config';
import angular from 'angular';

app.controller('operationBannerAdd', function($scope, $state, $rootScope, request, neDialog, $validation, uiUploader) {
  $scope.newData = {
    title: '',
    release_time: '',
    typesid: '',
    weburl: '',
    titlepic: '',
    notes: ''
  };
  $scope.releaseTime = '';
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    singleDatePicker: true,
  });
  $scope.typeList = angular.copy($rootScope.const.bannerTypeList);
  $scope.typeList.splice(0, 1);

  $scope.onSubmit = function() {
    if ($scope.releaseTime !== '') {
      angular.extend($scope.newData, {
        release_time: $scope.releaseTime.format('YYYY-MM-DD HH:mm'),
      });
    }
    request('bannerAdd', $scope.newData).success(() => {
      $state.go('index.operation.banner');
    });
  };
  $scope.onUpload = function() {
    uiUploader.startUpload({
      url: '/admin/api/login/avatar_file/',
      concurrency: 2,
      headers: {
        'Accept': 'application/json'
      },
      paramName: 'image',
      onCompleted: function(file, response) {
        let res = JSON.parse(response);
        $scope.newData.titlepic = res.rsm.dataurl;
        $scope.imgUrl = res.rsm.imgurl;
        console.log(res);
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
    console.log($scope.files);
    $scope.$apply();
    $scope.onUpload();
  });
});
