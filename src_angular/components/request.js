import app from 'app.config';

app.service('request', ($http, $state, $stateParams, $cookies, uiloading, uidialog) => {
    // 接口定义
    this._urls = {
        // '' : { method: 'post', url: ''},
    };
    const isProd = false; // 是否发布

    let errorAlert = null; // 错误弹框
    let loginAlert = null; // 登陆弹框

    // 请求错误信息显示
    function showError(errorInfo) {
        if (errorAlert) {
            errorAlert.close();
        }
        errorAlert = uidialog.alert(errorInfo);
    }
    // 是否登陆验证
    function checkLogin(resData) {
        if (isProd && (resData.status === 203 || resData.status === '203' || !$cookies.get('user_name'))) {
            if (!loginAlert) {
                loginAlert = uidialog.open({
                    template: '未登陆，<a href="/auth/openid/login">跳转到登陆页面</a>',
                    hasClose: false,
                    size: { width: 350, height: 140 },
                });
            }
            return false;
        }
        return true;
    }

    function Req(opt) {
        this.d = function(data, callback, errCallback, config, param) {
            uiloading.show();
            let timeout = 10000; // 请求超时时间
            if (config && angular.isDefined(config.isShowLoading) && config.isShowLoading === false) {
                uiloading.hide();
            }
            if (config && angular.isDefined(config.timeout)) {
                timeout = config.timeout;
            }
            const httpOpt = {
                method: opt.method,
                url: opt.url,
                timeout: timeout,
                headers: {
                    'Content-Type': 'text/plain;charset=UTF-8'
                }
            };
            if (opt.method === 'get') {
                httpOpt.params = data;
            } else if (opt.method === 'post') {
                httpOpt.data = data;
            }

            $http(httpOpt).then(function successCall(resData) {
                uiloading.hide();
                if (!checkLogin(resData)) {
                    return;
                }
                callback && callback(resData.data, param);
            }, function errorCall(resData) {
                uiloading.hide();
                if (!checkLogin(resData)) {
                    return;
                }
                if (errCallback) {
                    errCallback(resData);
                } else {
                    if (resData.status === -1) {
                        showError('数据请求失败，请重试。');
                    } else {
                        if (typeof resData.data.data === 'string') {
                            showError(resData.data.data);
                        } else {
                            showError(resData.data.detail);
                        }
                    }
                }
            });
        };
    }
    for (let key in this._urls) {
        this[key] = new Req(this._urls[key]).d;
    }
    this.test = function() {
        console.log(this);
    };
});
