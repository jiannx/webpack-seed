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
  'accountGroupList': { method: 'post', url: '/admin/api/login/group_info/' }, // 角色列表

  'teacherList': { method: 'post', url: '/admin/api/users/teacher_list/' },
  'teacherDetail': { method: 'get', url: '/admin/api/users/teacher_view/' }, // 教师管理 –具体详情
  'teacherAptitudeApply': { method: 'post', url: '/admin/api/users/teacher_aptitude_apply_save/' }, // 教师管理 –资质审核
  'teacherAptitudeApplyDetail': { method: 'get', url: '/admin/api/users/teacher_aptitude_apply/' }, // 教师管理 –资质审核 – 详情
  'teacherStarApply': { method: 'post', url: '/admin/api/users/teacher_star_apply_save/' }, // 教师管理 –星级审核
  'teacherStarApplyDetail': { method: 'get', url: '/admin/api/users/teacher_star_apply/' }, // 教师管理 –星级审核 – 详情
  'studentList': { method: 'post', url: '/admin/api/users/student_list/' }, // 学生管理 – 列表
  'studentDetail': { method: 'get', url: '/admin/api/users/student_view/' }, // 学生管理 – 列表
  'customerServiceAdd': { method: 'post', url: '/admin/api/users/kefu_insert/' }, // 客服管理 – 添加账号
};

// if (PRODUCTION) {
//   for (let key of Object.keys(api)) {
//     api[key].url = domain + api[key].url;
//   }
// }

export default api;
