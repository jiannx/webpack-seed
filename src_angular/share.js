function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function showCourse(id) {

}

function showInviteCode() {
  document.title = '邀请码';
  let html = '<div class="text-center"><h3>课程名称</h3></div>';
  html += `<div class="row"><div class="col-xs-2">课程ID: </div><div class="col-xs-2">${id}</div></div>`;
  $('#content').html(html);
}


let type = getQueryString('type');
let id = getQueryString('id');
let code = getQueryString('code');
let data = { type, id, code };

if (type === 'course') {
  document.title = '课程分享';
  data.type = 'course';
}
if (type === 'inviteCode') {
  document.title = '邀请码';
  data.type = 'inviteCode';
}

var vm = new Vue({
  el: '#content',
  data: data
});
