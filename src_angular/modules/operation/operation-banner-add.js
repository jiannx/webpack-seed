import app from 'app.config';
import angular from 'angular';
import api from '../../app.api.js';

app.controller('operationBannerAdd', function($scope, $state, $rootScope, $stateParams, request, neDialog, $validation, uiUploader) {
  let id = $stateParams.id;
  $scope.type = $stateParams.type; // 0:编辑 null: 天剑
  $scope.newData = {
    title: '',
    release_time: '',
    typesid: '',
    weburl: '',
    titlepic: '',
    notes: ''
  };
  if ($scope.type) {
    request('bannerEditDetail', { id }).success((res) => {
      Object.assign($scope.newData, res.rsm.info);
      $scope.imgUrl = api.imgDomain + $scope.newData.titlepic;
      $scope.releaseTime = $scope.newData.release_time;
      $scope.newData.typesid = (parseInt($scope.newData.typesid, 10) === 0) ? -1 : $scope.newData.typesid;
    });
  }
  $scope.releaseTime = '';
  $scope.createTimeOpt = $.extend(true, {}, $rootScope.dataRangePickerOpt, {
    opens: 'left',
    singleDatePicker: true,
  });
  $scope.typeList = angular.copy($rootScope.const.bannerTypeAdd);
  $scope.typeList[0].id = -1;

  $scope.onSubmit = function() {
    let data = angular.copy($scope.newData);
    if (data.typesid === -1) {
      data.typesid = 0;
    }
    if ($scope.releaseTime !== '' && typeof $scope.releaseTime === 'object') {
      angular.extend(data, {
        release_time: $scope.releaseTime.format('YYYY-MM-DD HH:mm'),
      });
    }
    let url = $scope.type ? 'bannerEdit' : 'bannerAdd';
    request(url, data).success(() => {
      $state.go('index.operation.banner');
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
        $scope.newData.titlepic = res.rsm.dataurl;
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
