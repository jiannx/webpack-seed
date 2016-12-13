/*
接口请求定义
req：请求接口
data： 请求参数
successCall：请求成功回调
errorCall： 请求错误回调
cfg： 配置
param： 回调带上的参数
示例：
request.do(req, data, successCall, errorCall, cfg, param)
// 基础调用
request.do('demo', { id: 0 }, (data) => {});
// 完整调用 包含错误回调，配置，及接口返回参数
request.do({ method: 'get', url: '/api/demo', timeout: 10000 }, { id: 0 }, (data, res, param) => {}, (data, res, param) => {}, {}, {});
 */

import layer from 'layer'; // 引入弹出窗，进行错误提示
import app from 'app.config';
import api from '../app.api'; // 接口定义引入

// 默认配置
const defaultCfg = {
    showLoading: true, // 显示等待状态
    showError: true, // 显示错误信息
};

// 登陆验证
const checkLogin = function() {
    // layer.open({
    //     content: '请先登陆，<a href="/auth/openid/login">跳转到登陆页面</a>',
    //     btn: [],
    //     scrollbar: false,
    //     closeBtn: 0
    // });
    return true;
};

// angular http处理数据
const angularGetData = function(http, req, data, successCall, errorCall) {
    const httpOpt = {
        method: null,
        url: null,
        timeout: 60000,
        headers: {
            'Content-Type': 'text/plain;charset=UTF-8'
        }
    };
    // 如果需要配置timeout，header等其他参数，在req中配置，参照$http参数
    Object.assign(httpOpt, req);
    if (req.method === 'get' || req.method === 'GET') {
        httpOpt.params = data;
    } else if (req.method === 'post' || req.method === 'POST') {
        httpOpt.data = data;
    }
    http(httpOpt).then((res) => {
        successCall(res);
    }, (res) => {
        errorCall(res);
    });
};

class Request {
    constructor($http) {
        this.$http = $http;
        this.name = '2323';
        this.layerCount = 0;
        this.loadingLayer = null;
        this.errorLayer = null;
        console.log('create request service success!');
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
        angularGetData(this.$http, req, data, (res) => {
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
        this.layerCount += 1;
        layer.close(this.loadingLayer);
        this.loadingLayer = layer.load(1);
    }

    // 移除等待状态
    removeLoading() {
        this.layerCount -= 1;
        if (this.layerCount === 0) {
            layer.close(this.loadingLayer);
        }
    }

    // 显示错误弹窗
    showError(error) {
        layer.close(this.errorLayer);
        this.errorLayer = layer.alert('数据请求失败，请重试。', { icon: 0 });
    }
}

Request.$injector = ['$http'];

export default app.service('request', Request).name;
