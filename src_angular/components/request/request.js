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
request.get('/api/get/list', {}).success();
request.post('/api/add', {}).success();
request({method, url}, {}).success();
*/

let loadingIndex = null;

const showLoading = function() {

};

const hideLoading = function() {

};
let HTTP_OPTION = {
    method: null,
    url: null,
    timeout: 60000,
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
};

class NeReq {
    constructor($http, req, reqData, cfg, params) {
        this.http = $http;
        this.req = req;
        this.reqData = reqData;
        this.cfg = cfg;
        this.params = params;
        this.didCount = 0;
        this.didIndex = 0; // the index of which req is done
        this.reqQueue = []; // {req, type, successCall}
        this.resQueue = [];
        this.errorCall = null;

        this.async(req, reqData, cfg, params);
    }
    success(successCall) {
        this.reqQueue[this.reqQueue.length - 1].successCall = successCall;
        return this;
    }
    error(errorCall) {
        this.errorCall = errorCall;
        return this;
    }
    async(req, reqData, cfg, params) {
        this.reqQueue.push({ req, reqData, cfg, params, type: 'async', successCall: null });
        return this;
    }
    sync(req, reqData, cfg, params) {
        this.reqQueue.push({ req, reqData, cfg, params, type: 'sync', successCall: null });
        return this;
    }
    _init(req) {
        if (typeof req === 'string') {

        } else if (typeof req === 'object') {

        }
    }
    _do() {
        let doing = this.doingIndex;
        let self = this;
        // 完成项等于所有接口时，调用success
        if (this.didCount === this.reqQueue.length) {
            this.reqQueue[this.reqQueue.length - 1].successCall && this.reqQueue[this.reqQueue.length - 1].successCall(...this.resQueue);
            return;
        }
        for (let i = doing; i < this.reqQueue.length; i += 1) {
            // 完成项等于进行项时，执行下一个接口
            if (this.reqQueue[i].type === 'sync' && this.didCount < this.doingIndex) {
                break;
            }
            let lastSuccessResult = null;
            if ((i - 1) >= 0 && this.reqQueue[i - 1].successCall) {
                lastSuccessResult = this.reqQueue[i - 1].successCall && this.reqQueue[i - 1].successCall(...this.resQueue);
            }
            this.doingIndex += 1;
            let httpOpt = Object.assign({}, HTTP_OPTION, this.reqQueue[i].req);
            if (this.reqQueue[i].req.method.toUpperCase() === 'GET') {
                httpOpt.params = Object.assign({}, this.reqQueue[i].reqData, lastSuccessResult);
            } else if (this.reqQueue[i].req.method.toUpperCase() === 'POST') {
                httpOpt.data = Object.assign({}, this.reqQueue[i].reqData, lastSuccessResult);
            }
            this.http(this.reqQueue[i]).then((res) => {
                self.didCount += 1;
                self.resQueue[i] = res;
                self._do();
            }, (res) => {
                self.errorCall(res);
            });
        }
    }
}

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

// angular http处理数据
const getData = function(http, req, data, successCall, errorCall) {
    let httpOpt = {
        method: null,
        url: null,
        timeout: 60000,
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };
    Object.assign(httpOpt, req);

    if (req.method.toUpperCase() === 'GET') {
        httpOpt.params = data;
    } else if (req.method.toUpperCase() === 'POST') {
        httpOpt.data = data;
    }
    http(httpOpt).then((res) => {
        successCall(res);
    }, (res) => {
        errorCall(res);
    });
};

class NeRequest {
    constructor($http) {
        this.http = $http;
        this.loadingCount = 0;
        this.loadingLayer = null;
        this.errorLayer = null;
        this.api = {};
        for (let key of Object.keys(api)) {
            this.api[key] = (data, successCall, errorCall, cfg, param) => {
                this.do(api[key], data, successCall, errorCall, cfg, param);
            };
        }
    }

    // 获取数据
    do(req, data, successCall, errorCall, cfg, param) {
        if (typeof req === 'string') {
            req = api[req];
            if (typeof req === 'undefined') {
                console.error('Request Error: 未定义接口');
                return;
            }
        }
        cfg = Object.assign({}, defaultCfg, cfg);
        if (cfg.showLoading) {
            this.addLoading();
        }
        getData(this.http, req, data, (res) => {
            if (cfg.showLoading) {
                this.removeLoading();
            }
            if (!checkLogin(res)) {
                return;
            }
            successCall && successCall(res.data, param, res);
        }, (res) => {
            if (cfg.showLoading) {
                this.removeLoading();
            }
            if (cfg.showError) {
                this.showError(res);
            }
            errorCall && errorCall(res.data, param, res);
        });
    }

    // 添加等待状态
    addLoading() {
        if (this.loadingCount === 0) {
            this.loadingLayer = layer.load(1);
        }
        this.loadingCount += 1;
    }

    // 移除等待状态
    removeLoading() {
        this.loadingCount -= 1;
        if (this.loadingCount === 0) {
            layer.close(this.loadingLayer);
        }
    }

    // 显示错误弹窗
    showError(error) {
        layer.close(this.errorLayer);
        this.errorLayer = layer.alert('数据请求失败，请重试。', { icon: 0 });
    }

    // 查看所有接口
    list() {
        console.log(api);
    }
}
app.factory('request', function($http) {
    let neRequest = new NeRequest($http);
    let request = function(req, data, successCall, errorCall, cfg, param) {
        neRequest.do.call(neRequest, req, data, successCall, errorCall, cfg, param);
    };
    for (let key of Object.keys(neRequest.api)) {
        request[key] = neRequest.api[key];
    }
    request.api = neRequest.api;
    request.list = function() {
        neRequest.list.call(neRequest);
    };
    return request;
});
