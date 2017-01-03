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

app.factory('request', function($http) {
    NeRequest.set('type', 'Angular');
    // 当req为字符串时，匹配api中定义的接口
    NeRequest.set('beforeRequset', function(reqData) {
        if (typeof reqData.req === 'string' && api[reqData.req]) {
            reqData.req = api[reqData.req];
        }
        return reqData;
    });
    // 接口返回为未登录状态的全局处理配置
    NeRequest.set('afterSuccessRequset', function(...args) {

    });
    // 错误提示全局配置
    NeRequest.set('afterErrorRequset', function(...args) {
        layer.alert('数据请求失败，请重试。 Code:' + args[0].status, { icon: 2 });
    });

    let result = function(req, reqData, successCall, errorCall, cfg) {
        return new NeRequest(req, reqData, successCall, errorCall, cfg, $http);
    };

    return result;
});
