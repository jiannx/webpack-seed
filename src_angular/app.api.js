/*
接口定义
 */

const domain = 'http://api.mamatuo.com';

let api = {
  imgDomain: 'http://api.mamatuo.com/Uploads', // 图片地址前缀
  upload: { method: 'post', url: '/admin/api/login/avatar_file/' }, // 图片上传

  'demo': { method: 'get', url: '/api/demo', desc: 'demo' },
  'loginIn': { method: 'post', url: '/admin/api/login/index/' }, // 登陆
  'accountAdd': { method: 'post', url: '/admin/api/login/reg_account/' }, // 后台开通账号
  'accountChangePassword': { method: 'post', url: '/admin/api/login/admin_password/' }, // 个人修改密码
  'accountList': { method: 'post', url: '/admin/api/login/admin_account/' }, // 权限分配 – 列表
  'accountDel': { method: 'post', url: '/admin/api/login/admin_account_del/' }, // 权限分配 – 删除
  'accountGroupList': { method: 'post', url: '/admin/api/login/group_info/' }, // 角色列表
  'accountAuthDetail': { method: 'post', url: '/admin/api/login/power_view/' }, // 角色列表
  'accountAuthAdd': { method: 'post', url: '/admin/api/login/power_insert/' }, // 角色列表
  'accountAuthDel': { method: 'post', url: '/admin/api/login/power_del/' }, // 角色列表


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
  'customerServiceDetail': { method: 'post', url: '' }, // 所有客服详情


  'courseList': { method: 'post', url: '/admin/api/course/index/' }, // 课程列表
  'courseCateList': { method: 'post', url: '/admin/api/course/course_cate/' }, // 筛选中课程专题信息
  'courseExamine': { method: 'post', url: '/admin/api/login/examine/' }, // 筛选中审核人的信息
  'courseDetail': { method: 'get', url: '/admin/api/course/view/' }, // 课程详情
  'courseApplyDetail': { method: 'get', url: '/admin/api/course/apply/' }, // 审核详情
  'courseApply': { method: 'post', url: '/admin/api/course/apply_save/' }, // 审核保存

  'courseJoinList': { method: 'post', url: '/admin/api/course/join/' }, // 课程管理 –查看报名
  'courseJoinDetail': { method: 'get', url: '/admin/api/course/join_view/' }, // 课程管理 –查看报名详情

  'bannerList': { method: 'post', url: '/admin/api/operate/index/' }, // 运营位列表
  'bannerAdd': { method: 'post', url: '/admin/api/operate/banner_insert/' }, // 运营位添加
  'bannerEditDetail': { method: 'get', url: '/admin/api/operate/banner_edit/' }, // 运营位 编辑
  'bannerEdit': { method: 'post', url: '/admin/api/operate/banner_edit_save/' }, // 运营位 编辑
  'bannerChangeStatus': { method: 'get', url: '/admin/api/operate/banner_apply/' }, // 运营位 上线下线

  'indicatorsList': { method: 'get', url: '/admin/api/operate/indicators_list/' }, // 指标列表
  'indicatorsAdd': { method: 'post', url: '/admin/api/operate/indicators_insert/' }, // 指标添加
  'indicatorsEdit': { method: 'post', url: '/admin/api/operate/indicators_edit_save/' }, // 指标保存
  'indicatorsDel': { method: 'get', url: '/admin/api/operate/indicators_del/' }, // 指标删除

  'tagList': { method: 'get', url: '/admin/api/operate/friend_tag_list/' }, // 好友标签 列表
  'tagAdd': { method: 'post', url: '/admin/api/operate/friend_tag_insert/' }, // 好友标签 添加
  'tagEdit': { method: 'post', url: '' }, // 好友标签 编辑 TODO
  'tagDel': { method: 'get', url: '' }, // 好友标签 删除 TODO

  'redeemCodeList': { method: 'post', url: '/admin/api/operate/redeem_code_list/' }, // 兑换码
  'redeemCodeListAmountList': { method: 'post', url: '/admin/api/operate/redeem_code_amount/' }, // 列表筛选 金币面额
  'redeemCodeAdd': { method: 'post', url: '/admin/api/operate/redeem_code_insert/' }, // 添加
  'redeemCodeDel': { method: 'get', url: '' },

  'messageList': { method: 'post', url: '/admin/api/operate/activity_info_list/' }, // 活动消息
  'messageAdd': { method: 'post', url: '/admin/api/operate/activity_info_insert/' },
  'messageSend': { method: 'post', url: '/admin/api/operate/activity_info_save/' },

  'integralList': { method: 'post', url: '/admin/api/operate/integral_info_list/' }, // 积分活动
  'integralAdd': { method: 'post', url: '/admin/api/operate/integral_info_insert/' }, // 积分活动
  'integralDetail': { method: 'post', url: '/admin/api/operate/integral_info_edit/' }, // 积分活动
  'integralEdit': { method: 'post', url: '/admin/api/operate/integral_info_edit_save/' }, // 积分活动
  'integralChangeStatus': { method: 'post', url: '/admin/api/operate/integral_info_apply' }, // 积分活动 上线 下线

  'suggestList': { method: 'post', url: '/admin/api/operate/message_list/' }, // 意见反馈
  'suggestDetail': { method: 'get', url: '/admin/api/operate/message_view/' },
  'suggestApply': { method: 'post', url: '/admin/api/operate/message_save/' },

  'orderMindList': { method: 'post', url: '/admin/api/order/index/' }, // 感谢订单
  'orderRechargeList': { method: 'post', url: '/admin/api/order/gold_balance/' }, // 充值订单 金币充值订单、余额充值订单
  'orderRechargeDetail': { method: 'post', url: '/admin/api/order/gold_balance_view/' }, // 充值订单 详情
  'orderRechargeRefund': { method: 'post', url: '' }, // 充值订单 退款

  'orderCourseAdvanceList': { method: 'post', url: '/admin/api/order/course_pre/' }, // 课前预付订单 列表
  'orderCourseAdvanceDetail': { method: 'get', url: '/admin/api/order/course_pre_view/' }, // 课前预付订单 详情
  'orderCourseAdvanceRefund': { method: 'post', url: '/admin/api/order/course_pre_refund_save/' }, // 课前预付订单 退款

  'orderCourseNextList': { method: 'post', url: '/admin/api/order/course_after/' }, // 课前次付订单 列表
  'orderCourseNextDetail': { method: 'get', url: '/admin/api/order/course_after_view/' }, // 课前次付订单 详情
  'orderCourseNextRefund': { method: 'post', url: '' }, // 课前次付订单 退款


  'settlementCourseList': { method: 'post', url: '/admin/api/balance/index/' }, // 结算管理 - 单次课程结算 - 列表
  'settlementCourseSetError': { method: 'get', url: '/admin/api/balance/abnormal/' }, // 单次课程结算 -标记结算异常
  'settlementCourseDetail': { method: 'post', url: '/admin/api/balance/view/' }, // 单次课程结算 - 详情
  'settlementCourseChangeAmount': { method: 'post', url: '/admin/api/balance/modify_amount/' }, // 单次课程结算 - 修改结算金额
  'settlementGoldRecharge': { method: 'post', url: '/admin/api/balance/gold_insert/' }, // 结算管理 -金币充值 - 单个
  'settlementOverageList': { method: 'post', url: '/admin/api/balance/deposit_record/' }, // 余额提现管理 - 列表
  'settlementOverageCheck': { method: 'post', url: '/admin/api/balance/deposit_save/' }, // 余额提现管理 -保存
  'settlementOverageDetail': { method: 'get', url: '/admin/api/balance/deposit_view/' }, // 余额提现管理 - 列表
  'settlementReportGoldAndMoney': { method: 'post', url: '/admin/api/balance/report_info/' }, // 营收报表 –金币与余额的统计
  'settlementReportCourse': { method: 'post', url: '/admin/api/balance/advance_account/' }, // 营收报表 –金币与余额的统计
  'settlementReportWeb': { method: 'post', url: '/admin/api/balance/web_deposit_save/' }, // 营收报表 –平台提现审核提交
};

// if (PRODUCTION) {
//   for (let key of Object.keys(api)) {
//     api[key].url = domain + api[key].url;
//   }
// }

export default api;
