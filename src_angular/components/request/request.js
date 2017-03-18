import app from 'app.config';
import layer from 'layer';
import NeRequest from './ne-request';
import api from '../../app.api';

/*
request('getList').success((res)=>{});
request('getList', {}).success((res)=>{}).error(()=>{});
request('getList', {}).async('getList', {}).async('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request('getList', {}).sync('getList', {}).sync('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request({method, url}, {}).success();
request({method, url}).data({}).success();
*/

let loginDialog = null;
let loadingIndex = $('#loading');

app.factory('request', function($http, neDialog) {
  NeRequest.set('type', 'Angular');
  NeRequest.set('showLoading', function() {
    loadingIndex.show();
  });
  NeRequest.set('hideLoading', function() {
    loadingIndex.hide();
  });
  // 当req为字符串时，匹配api中定义的接口
  NeRequest.set('beforeRequset', function(reqData) {
    if (typeof reqData.req === 'string' && api[reqData.req]) {
      reqData.req = api[reqData.req];
    }
    return reqData;
  });
  // 接口返回为未登录状态的全局处理配置
  NeRequest.set('afterSuccessRequset', function(...args) {
    if (args[0].errno === -1) {
      neDialog.alert(`错误信息: ${args[0].err}, Code: ${args[0].errno}`, { icon: 2, title: '数据请求失败' });
      return false;
    }
    return true;
  });
  // 错误提示全局配置
  NeRequest.set('afterErrorRequset', function(...args) {
    let errorInfo = '';
    if (args[0].status === -1) {
      errorInfo = '数据请求失败，请重试。';
    } else if (typeof args[0].data.data === 'string' && args[0].data.data !== '') {
      errorInfo = args[0].data.data;
    } else {
      errorInfo = args[0].data.detail;
    }
    neDialog.alert(`Error Info: ${errorInfo}, Code: ${args[0].status}`, { icon: 2, title: '数据请求失败' });
  });

  let result = function(req, reqData, successCall, errorCall, cfg) {
    return new NeRequest(req, reqData, successCall, errorCall, cfg, $http);
  };

  return result;
});
