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
import layer from 'layer'; // 引入弹出窗，进行错误提示
import app from 'app.config';
import api from '../../app.api'; // 接口定义引入
/*
request('getList').success((res)=>{});
request('getList', {}).success((res)=>{}).error(()=>{});
request('getList', {}).async('getList', {}).async('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request('getList', {}).sync('getList', {}).sync('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
request({method, url}, {}).success();
request({method, url}).data({}).success();
*/

let loadingIndex = null;

const showLoading = function() {
    if (!loadingIndex) {
        loadingIndex = layer.load(1);
    }
    // layer.alert('数据请求失败，请重试。', { icon: 0 });
};

const hideLoading = function() {
    layer.close(loadingIndex);
    loadingIndex = null;
};
// 默认配置
const defaultCfg = {
    showLoading: true, // 显示等待状态
    showError: true, // 显示错误信息
};

// 登陆验证
const checkLogin = function() {
    let isLogin = true;
    // layer.open({
    //     content: '请先登陆，<a href="/auth/openid/login">跳转到登陆页面</a>',
    //     btn: [],
    //     scrollbar: false,
    //     closeBtn: 0
    // });
    return isLogin;
};

let HTTP_OPTION = {
    method: null,
    url: null,
    timeout: 60000,
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
};

class NeRequest {
    constructor($http, req, reqData, successCall, errorCall, cfg) {
        this.http = $http;
        this.doneCount = 0;
        this.doingIndex = 0; // the index of which req is done
        this.reqQueue = []; // {req, type, successCall}
        this.resQueue = [];
        this.errorCall = null;
        req = this._initReq(req);

        this.async(req, reqData, successCall, errorCall, cfg);
    }
    data(reqData) {
        if (this.doingIndex !== 0 && this.doneCount < this.reqQueue.length) {
            console.warn(this.reqQueue[this.doingIndex - 1].req.url + ' is doning，can not rewrite reqdata!');
        } else {
            this.doneCount = 0;
            this.doingIndex = 0;
            this.reqQueue[this.reqQueue.length - 1].reqData = reqData;
        }
        return this;
    }
    success(successCall) {
        this.reqQueue[this.reqQueue.length - 1].successCall = successCall;
        this._do();
        return this;
    }
    error(errorCall) {
        this.errorCall = errorCall;
        return this;
    }
    async(req, reqData, successCall, errorCall, cfg) {
        req = this._initReq(req);
        this.reqQueue.push({ req, reqData, cfg, type: 'async', successCall: null });
        if (successCall) {
            this.success(successCall);
        }
        return this;
    }
    sync(req, reqData, successCall, errorCall, cfg) {
        req = this._initReq(req);
        this.reqQueue.push({ req, reqData, cfg, type: 'sync', successCall: null });
        if (successCall) {
            this.success(successCall);
        }
        return this;
    }
    _initReq(req) {
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
        return req;
    }
    _do() {
        let self = this;
        // 完成所有接口时，调用success
        if (this.doneCount === this.reqQueue.length) {
            hideLoading();
            let data = [];
            for (let item of this.resQueue) {
                data.push(item.data);
            }
            this.reqQueue[this.reqQueue.length - 1].successCall && this.reqQueue[this.reqQueue.length - 1].successCall(...data, this.resQueue);
            return;
        }
        let lastSuccessResult = null;
        for (let i = this.doingIndex; i < this.reqQueue.length; i += 1) {
            // 完成项等于进行项时，执行下一个接口
            if (this.reqQueue[i].type === 'sync' && this.doneCount < this.doingIndex) {
                break;
            }
            // 当本次接口为同步请求时，获取前一个successcCall的返回参数作为本次请求的参数，返回参数的优先级大于请求配置时传入的参数（即覆盖原先参数）
            if (this.reqQueue[i].type === 'sync' && this.doneCount === this.doingIndex) {
                if ((i - 1) >= 0 && this.reqQueue[i - 1].successCall) {
                    let data = [];
                    for (let item of this.resQueue) {
                        data.push(item.data);
                    }
                    lastSuccessResult = this.reqQueue[i - 1].successCall && this.reqQueue[i - 1].successCall(...data, this.resQueue);
                }
            }
            let httpOpt = Object.assign({}, HTTP_OPTION, this.reqQueue[i].req);
            if (this.reqQueue[i].req.method.toUpperCase() === 'GET') {
                httpOpt.params = Object.assign({}, this.reqQueue[i].reqData, lastSuccessResult);
            } else if (this.reqQueue[i].req.method.toUpperCase() === 'POST') {
                httpOpt.data = Object.assign({}, this.reqQueue[i].reqData, lastSuccessResult);
            }
            // 执行请求
            this.doingIndex += 1;
            showLoading();
            this.http(httpOpt).then((res) => {
                self.doneCount += 1;
                self.resQueue[i] = res;
                self._do();
            }, (res) => {
                self.errorCall && self.errorCall(res);
            });
        }
    }
}

app.factory('request', function($http) {
    let result = function(req, reqData, successCall, errorCall, cfg) {
        return new NeRequest($http, req, reqData, successCall, cfg);
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
