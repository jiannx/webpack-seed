import './scss/share.scss';

// http://10.240.35.78:9021/share.html?type=course&id=45&url=weixin://http://weixin.qq.com
// http://api.mamatuo.com/build/share.html?type=course&id=45&url=mmt://api.mamatuo.com/app/api1.0/found/view
// http://api.mamatuo.com/build/share.html?type=inviteCode&code=100
// mmt://api.mamatuo.com/app/api1.0/found/view?courseId=XXX
// http://127.0.0.1:9021/share.html?type=login&code=100
// http://127.0.0.1:9021/share.html?type=loginFail

function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

let type = getQueryString('type');
let id = getQueryString('id');
let code = getQueryString('code');
let url = getQueryString('url');

let data = {
  type,
  id,
  code,
  rsm: { name: 2 },
  isSuccess: true,
  errMsg: '',
  login: {
    checkCodeStatus: 0, // 获取验证码按钮状态
    isAgree: true, // 是否同意协议
    data: {
      telphone: '',
      validCode: '',
      password: '',
      invite_code: code,
      agree_deal: 1
    }
  }
};

if (type === 'course') {
  document.title = '妈妈托-课程分享';
  data.type = 'course';
}
if (type === 'inviteCode') {
  // document.title = '妈妈托-邀请码';
  // data.type = 'inviteCode';
  document.title = '妈妈托-注册';
  data.type = 'login';
}
if (type === 'login') {
  document.title = '妈妈托-注册';
  data.type = 'login';
}
if (type === 'loginSuccess') {
  document.title = '妈妈托-注册成功';
  data.type = 'loginSuccess';
}
if (type === 'loginFail') {
  document.title = '妈妈托-注册失败';
  data.type = 'loginFail';
}

let vm = new Vue({
  el: '#content',
  data: function() {
    return data;
  },
  created: function() {
    let self = this;
    this.rsm.name = 3;
    if (type === 'course') {
      $.get('/admin/api/course/share_view/', { id }, function(res) {
        if (res.errno === -1) {
          self.isSuccess = false;
          self.errMsg = res.err;
        } else {
          self.$set(data, 'rsm', res.rsm.info);
        }
      }, 'json');
    }
  },
  updated: function() {
    document.getElementById('content').style.display = 'block';
  },
  methods: {
    // 打开app
    open: function() {
      let _this = this;
      if (!url) {
        alert('url 为空');
        return;
      }
      let ifr = document.createElement('iframe');
      ifr.src = url + '&courseId=' + id;
      ifr.style.display = 'none';
      document.body.appendChild(ifr);
      window.setTimeout(function() {
        alert('打开失败：' + ifr.src);
        document.body.removeChild(ifr);
        _this.download();
      }, 1000);
    },
    // 下载
    download: function() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      if (isAndroid) {
        // window.location = 'http://www.baidu.com';
      }
      if (isiOS) {
        // window.location = 'http://www.baidu.com';
      }
    },
    // 跳转到登陆页面
    linkToLogin: function() {
      window.location = 'share.html?type=login&code=' + code;
    },
    linkToLoginSuccess: function() {
      window.location = 'share.html?type=loginSuccess';
    },
    linkToLoginFail: function() {
      window.location = 'share.html?type=loginFail';
    },
    // 获取验证码读秒
    validTiming: function() {
      let self = this;
      setTimeout(function() {
        data.login.checkCodeStatus = data.login.checkCodeStatus - 1;
        if (data.login.checkCodeStatus > 0) {
          self.validTiming();
        }
      }, 1000);
    },
    // 获取验证码
    getValidCode: function() {
      let _this = this;
      $.ajax({
        url: '/app/api1.0/login/get_validcode/',
        type: 'post',
        data: {
          telphone: data.login.data.telphone,
          types: 1,
          // app_types: 2
        },
        dataType: 'json',
        success: function(res) {
          if (res.errno === -1) {
            alert(res.err);
          } else {
            data.login.checkCodeStatus = 60;
            _this.validTiming();
          }
        }
      });
    },
    // 注册
    signUp: function() {
      let _this = this;
      let d = data.login.data;
      if (d.telphone === '') {
        alert('请输入手机号');
        return;
      }
      if (d.validCode === '') {
        alert('请输入验证码');
        return;
      }
      if (d.password === '') {
        alert('请设置密码');
        return;
      }
      $.ajax({
        url: '/app/api1.0/login/get_user_register/',
        type: 'post',
        data: d,
        dataType: 'json',
        success: function(res) {
          if (res.errno === -1) {
            if (res.err === '你输入的手机号码已经存在') {
              _this.linkToLoginFail();
            } else {
              alert(res.err);
            }
          } else {
            _this.linkToLoginSuccess();
          }
        }
      });
    },
    toggleAgree: function() {
      if (this.login.data.agree_deal === 0) {
        this.login.data.agree_deal = 1;
      } else {
        this.login.data.agree_deal = 0;
      }
    }
  },
  computed: {
    teacherStar: function() {
      if (data.rsm.teacher_star) {
        let allNum = Math.floor(data.rsm.teacher_star);
        let yu = data.rsm.teacher_star % allNum;
        let res = [];
        for (let i = 0; i < 5; i += 1) {
          if (i < allNum) {
            res.push(1);
          } else if (yu !== 0 && i === allNum && yu > 0.0001) {
            res.push(yu);
          } else {
            res.push(0);
          }
        }
        return res;
      }
      return [];
    },
    validMsg: function() {
      if (data.login.checkCodeStatus === 0) {
        return '获取验证码';
      }
      return data.login.checkCodeStatus + 's后重新获取';
    }
  }
});
