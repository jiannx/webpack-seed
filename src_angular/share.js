import './scss/share.scss';


function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

let type = getQueryString('type');
let id = getQueryString('id');
let code = getQueryString('code');
let data = { type, id, code, rsm: { name: 2 }, isSuccess: true, errMsg: '' };

if (type === 'course') {
  document.title = '妈妈托 - 课程分享';
  data.type = 'course';
}
if (type === 'inviteCode') {
  document.title = '邀请码';
  data.type = 'inviteCode';
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
        if (res.errno == -1) {
          self.isSuccess = false;
          self.errMsg = res.err
        } else {
          self.$set(data, 'rsm', res.rsm.info);
        }
      }, 'json');
    }
  },
  methods: {
    open: function() {
      console.log('open');
      let ifr = document.createElement('iframe');
      ifr.src = 'weixin://http://weixin.qq.com';
      ifr.style.display = 'none';
      document.body.appendChild(ifr);
      window.setTimeout(function() {
        console.log('222');
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        document.body.removeChild(ifr);
        // window.location = 'http://www.baidu.com';
      }, 1000);
    }
  }
});
