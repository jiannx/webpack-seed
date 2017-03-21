import $ from 'jQuery';

const DEF_CFG = {
  showLoading: true
};

const HTTP_OPTION = {
  method: null,
  url: null,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
};

class NeRequest {
  static set(key, value) {
    if (key === 'beforeRequset') {
      NeRequest.beforeRequsetCall = value;
    }
    if (key === 'afterSuccessRequset') {
      NeRequest.afterSuccessRequsetCall = value;
    }
    if (key === 'afterErrorRequset') {
      NeRequest.afterErrorRequsetCall = value;
    }
    if (key === 'httpOption') {
      NeRequest.HTTP_OPTION = value;
    }
    if (key === 'type') {
      NeRequest.type = value;
    }
    if (key === 'showLoading') {
      NeRequest.showLoading = value;
    }
    if (key === 'hideLoading') {
      NeRequest.hideLoading = value;
    }
  }
  constructor(req, reqData, successCall, errorCall, cfg, $http) {
    NeRequest.http = $http;
    this.doneCount = 0; // the count of req has done
    this.doingIndex = 0; // the index of which req is doing
    this.errorIndex = null; // the index of which req is error
    this.reqQueue = []; // {req, reqData, type, successCall}
    this.resQueue = [];
    this.errorCall = null;
    this.config(cfg);
    this.async(req, reqData, successCall, errorCall, cfg);
  }
  config(cfg) {
    this.cfg = Object.assign({}, DEF_CFG, cfg || {});
    return this;
  }
  data(reqData) {
    if (this.doingIndex !== 0 && this.doneCount < this.reqQueue.length) {
      console.warn(this.reqQueue[this.doingIndex - 1].req.url + ' is doning，can not rewrite req data!');
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
    this.reqQueue.push({ req, reqData, cfg, type: 'async', successCall: null });
    if (successCall) {
      this.success(successCall);
    }
    if (errorCall) {
      this.error(errorCall);
    }
    return this;
  }
  sync(req, reqData, successCall, errorCall, cfg) {
    this.reqQueue.push({ req, reqData, cfg, type: 'sync', successCall: null });
    if (successCall) {
      this.success(successCall);
    }
    if (errorCall) {
      this.error(errorCall);
    }
    return this;
  }
  init() {
    this.doneCount = 0;
    this.doingIndex = 0;
    this.errorIndex = null;
    this.resQueue = [];
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
    if (NeRequest.doingCount === 0) {
      NeRequest.hideLoading && NeRequest.hideLoading();
    }
    // 接口报错情况下，直接进行错误回调
    if (this.errorIndex !== null) {
      let isDoSuccess = null;
      if (NeRequest.afterErrorRequsetCall) {
        isDoSuccess = NeRequest.afterErrorRequsetCall(this.resQueue[this.errorIndex], this.errorIndex, this.resQueue);
      }
      if (isDoSuccess !== false) {
        self.errorCall && self.errorCall(this.resQueue[this.errorIndex], this.errorIndex, this.resQueue);
      }
      this.errorIndex = -1; // 多个请求回调的情况下，当一个接口挂了，其他接口不进行回调
      return;
    }
    // 完成所有接口时，调用success
    if (this.doneCount === this.reqQueue.length) {
      let data = [];
      for (let item of this.resQueue) {
        data.push(item.data);
      }
      let isDoSuccess = null;
      if (NeRequest.afterSuccessRequsetCall) {
        isDoSuccess = NeRequest.afterSuccessRequsetCall(...data, this.resQueue);
      }
      if (isDoSuccess !== false) {
        this.reqQueue[this.reqQueue.length - 1].successCall && this.reqQueue[this.reqQueue.length - 1].successCall(...data, this.resQueue);
        return;
      }
    }
    let lastReqResult = null;
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
          if (this.reqQueue[i - 1].successCall) {
            lastReqResult = this.reqQueue[i - 1].successCall(...data, this.resQueue);
          }
        }
      }
      // 所有接口请求前，调用全局配置函数
      if (NeRequest.beforeRequsetCall) {
        let newReq = NeRequest.beforeRequsetCall(this.reqQueue[i]);
        if (newReq && typeof newReq === 'object') {
          this.reqQueue[i] = newReq;
        }
      }
      this.reqQueue[i].req = this._initReq(this.reqQueue[i].req);
      let httpOpt = Object.assign({}, NeRequest.HTTP_OPTION, this.reqQueue[i].req);
      if (this.reqQueue[i].req.method.toUpperCase() === 'GET') {
        httpOpt.params = Object.assign({}, this.reqQueue[i].reqData, lastReqResult);
      } else if (this.reqQueue[i].req.method.toUpperCase() === 'POST') {
        httpOpt.data = $.param(Object.assign({}, this.reqQueue[i].reqData, lastReqResult));
      }

      // 执行请求
      this.doingIndex += 1;
      NeRequest.doingCount += 1;
      if (this.cfg.showLoading) {
        NeRequest.showLoading && NeRequest.showLoading();
      }
      if (NeRequest.type.toUpperCase() === 'ANGULAR') {
        NeRequest.http(httpOpt).then((res) => {
          self.doneCount += 1;
          self.resQueue[i] = res;
          NeRequest.doingCount += -1;
          self._do();
        }, (res) => {
          self.doneCount += 1;
          self.resQueue[i] = res;
          self.errorIndex = i;
          NeRequest.doingCount += -1;
          self._do();
        });
      } else if (NeRequest.type.toUpperCase() === 'JQUERY') {
        httpOpt.success = function(res, status, xhr) {
          self.doneCount += 1;
          self.resQueue[i] = {
            data: res,
            status: status,
            xhr: xhr
          };
          self._do();
        };
        httpOpt.error = function(xhr) {
          self.doneCount += 1;
          self.resQueue[i] = xhr;
          self.errorIndex = i;
          self._do();
        };
        if (this.reqQueue[i].req.method.toUpperCase() === 'GET') {
          httpOpt.data = httpOpt.params;
        } else if (this.reqQueue[i].req.method.toUpperCase() === 'POST') {
          httpOpt.data = JSON.stringify(httpOpt.data);
        }
        $.ajax(httpOpt);
      }
    }
  }
}
NeRequest.HTTP_OPTION = HTTP_OPTION;
NeRequest.type = 'Angular'; // Angular or jQuery
NeRequest.doingCount = 0;

export default NeRequest;
