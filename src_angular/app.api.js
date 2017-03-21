/*
接口定义
 */

const domain = 'http://api.mamatuo.com';

let api = {
  'demo': { method: 'get', url: '/api/demo', desc: 'demo' },
  'loginIn': { method: 'post', url: '/admin/api/login/index/' }, // 登陆
  'accountAdd': { method: 'post', url: '/admin/api/login/reg_account/' }, // 后台开通账号
  'accountChangePassword': { method: 'post', url: '/admin/api/login/admin_password/' }, // 个人修改密码
  'accountList': { method: 'post', url: '/admin/api/login/admin_account/' }, // 权限分配 – 列表
  'accountDel': { method: 'post', url: '/admin/api/login/admin_account_del/' }, // 权限分配 – 删除

  'teacherList': { method: 'post', url: '/admin/api/users/teacher_list/' },
};

if (PRODUCTION) {
  for (let key of Object.keys(api)) {
    api[key].url = domain + api[key].url;
  }
}

export default api;
