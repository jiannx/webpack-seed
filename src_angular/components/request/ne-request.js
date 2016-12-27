import layer from 'layer'; // 引入弹出窗，进行错误提示
/*
new NeRequest('getList').success((res)=>{});
new NeRequest('getList', {}).success((res)=>{}).error(()=>{});
new NeRequest('getList', {}).async('getList', {}).async('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
new NeRequest('getList', {}).sync('getList', {}).sync('getList', {}).success((res1, res2, res3)=>{}).error(()=>{});
new NeRequest({method, url}, {}).success();
new NeRequest({method, url}).data({}).success();
new NeRequest({ method: 'get', url: '/api/demo', timeout: 10000 }, { id: 0 }, (data, res, param) => {}, (data, res, param) => {}, {}, {});
*/

let loadingIndex = null;

// 显示等待框
const showLoading = function() {
    if (!loadingIndex) {
        loadingIndex = layer.load(1);
    }
};

// 隐藏等待框
const hideLoading = function() {
    layer.close(loadingIndex);
    loadingIndex = null;
};

// 显示接口报错信息
const showError = function(res) {
    layer.alert('数据请求失败，请重试。 Code:' + res.status, { icon: 2 });
};

// 接口请求成功，但是数据错误
const showDataError = function(res) {};

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

// 默认配置
const defaultCfg = {
    showLoading: true, // 显示等待状态
    showError: true, // 显示错误信息
};

let HTTP_OPTION = {
    method: null,
    url: null,
    timeout: 10000,
    headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
    }
};

class NeRequest {
    constructor(req, reqData, successCall, errorCall, cfg, $http) {
        this.http = $http;
        this.doneCount = 0;
        this.doingIndex = 0; // the index of which req is done
        this.errorIndex = null;
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
            this.init();
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
    init() {
        this.doneCount = 0;
        this.doingIndex = 0;
        this.errorIndex = null;
    }
    _initReq(req) {
        if (typeof req === 'string') {
            let _req = req;
            req = {
                url: _req,
                method: 'get'
            };
        }
        return req;
    }
    _do() {
        let self = this;
        if (this.errorIndex === -1) {
            return;
        }
        // 接口报错情况下，直接进行错误回调
        if (this.errorIndex !== null) {
            hideLoading();
            showError(this.resQueue[this.errorIndex], this.errorIndex, this.resQueue);
            self.errorCall && self.errorCall(this.resQueue[this.errorIndex], this.errorIndex, this.resQueue);
            this.errorIndex = -1; // 多个请求回调的情况下，当一个接口挂了，其他接口不进行回调
            return;
        }
        // 完成所有接口时，调用success
        if (this.doneCount === this.reqQueue.length) {
            hideLoading();
            let data = [];
            for (let item of this.resQueue) {
                data.push(item.data);
            }
            showDataError();
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
                self.doneCount += 1;
                self.resQueue[i] = res;
                self.errorIndex = i;
                self._do();
            });
        }
    }
}

export default NeRequest;
