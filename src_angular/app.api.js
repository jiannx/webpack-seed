/*
接口定义
 */

const domain = 'http://api.mamatuo.com';

let api = {
  imgDomain: 'http://api.mamatuo.com', // 图片地址前缀

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
  'customerServiceList': { method: 'post', url: '/admin/api/users/kefu_list/' }, // 客服列表
  'customerServiceAll': { method: 'get', url: '/admin/api/users/service_info/' }, // 所有客服，用于筛选


  'courseList': { method: 'post', url: '/admin/api/course/index/' }, // 课程列表
  'courseCateList': { method: 'post', url: '/admin/api/course/course_cate/' }, // 筛选中课程专题信息
  'courseExamine': { method: 'post', url: '/admin/api/login/examine/' }, // 筛选中审核人的信息
  'courseDetail': { method: 'get', url: '/admin/api/course/view/' }, // 课程详情
  'courseApplyDetail': { method: 'get', url: '/admin/api/course/apply/' }, // 审核详情
  'courseApply': { method: 'post', url: '/admin/api/course/apply_save/' }, // 审核保存

  'bannerList': { method: 'post', url: '/admin/api/operate/index/' }, // 运营位列表
  'bannerAdd': { method: 'post', url: '/admin/api/operate/banner_insert/' }, // 运营位添加
  'bannerEditDetail': { method: 'get', url: '/admin/api/operate/banner_edit/' }, // 运营位 编辑
  'bannerEdit': { method: 'post', url: '/admin/api/operate/banner_edit_save/' }, // 运营位 编辑
  'bannerChangeStatus': { method: 'get', url: '/admin/api/operate/banner_apply/' }, //运营位 上线下线
};

// if (PRODUCTION) {
//   for (let key of Object.keys(api)) {
//     api[key].url = domain + api[key].url;
//   }
// }

export default api;
