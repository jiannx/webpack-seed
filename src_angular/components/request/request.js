/*
接口请求定义
req：请求接口，参照$http参数
data： 请求参数
successCall：请求成功回调
errorCall： 请求错误回调
cfg： 配置
param： 回调带上的参数
示例：
request(req, data, successCall, errorCall, cfg, param)
// 基础调用
request('demo', { id: 0 }, (data) => {});
// 完整调用 包含错误回调，配置，及接口返回参数
request({ method: 'get', url: '/api/demo', timeout: 10000 }, { id: 0 }, (data, res, param) => {}, (data, res, param) => {}, {}, {});
// 函数形式调用
request.demo(data, successCall, errorCall, cfg, param);
 */
import app from 'app.config';
import NeRequest from './ne-request'; // 引入弹出窗，进行错误提示
import api from '../../app.api'; // 接口定义引入
/*
request('getList').success((res)=>{});
request('getList', {}).success((res)=>{}).error(()=>{});
request('getList', {}).async('getList', {}).async('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request('getList', {}).sync('getList', {}).sync('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request({method, url}, {}).success();
request({method, url}).data({}).success();
*/

app.factory('request', function($http) {
    let result = function(req, reqData, successCall, errorCall, cfg) {
        if (typeof req === 'string') {
            let _req = req;
            req = api[req];
            if (typeof req === 'undefined') {
                req = {
                    url: _req,
                    method: 'get'
                };
            }
        }
        return new NeRequest(req, reqData, successCall, errorCall, cfg, $http);
    };
    result.list = function() {
        console.log(api);
    };
    result.api = {};
    for (let key of Object.keys(api)) {
        result.api[key] = function() {};
        result[key] = function(reqData, successCall, errorCall, cfg) {
            return new NeRequest($http, key, reqData, successCall, cfg);
        };
    }
    // let test1 = new NeReq($http, '/ap/get1', { id: 1 })
    //     .success(([res1]) => {
    //         return res1;
    //     })
    //     .sync('/ap/get2', { key: 2 })
    //     .async('/ap/get3')
    //     .success(([res1, res2, res3]) => {
    //         console.log(res1);
    //         console.log(res2);
    //         console.log(res3);
    //         return {
    //             id: 2
    //         };
    //     })
    //     .sync('/ap/get2')
    //     .success(([res1, res2, res3, res4]) => {
    //         console.log(res1);
    //         console.log(res2);
    //         console.log(res3);
    //         console.log(res4);
    //     });
    // let test2 = result('/ap/get2', { id: 3 }, function() {});
    // test2.data({ id: 4 });
    // test2.success();
    // console.log(test1);

    return result;
});
