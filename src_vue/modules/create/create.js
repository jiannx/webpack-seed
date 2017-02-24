import html from './create.html';

let data = {
  newCourse: {
    typesid: 1, // (1=线上课 2=线下课)
    course_cate_id: '', // (课程专题)
    title: '', // (课程标题)
    solve_problem: '', // (主要解决问题)
    target: '', // (课程目标)
    related_content: '', // (课程涉及内容)
    future_significance: '', // (课程对未来的意义)
    key_index: '', // (实现目标关键指标)
    facility: 3, // (难易度 1=困难  2=适中  3=简单)
    grade: '', // (适用年级)
    lectures_num: '', // (授课人数)
    textbook_version: '', // (教材版本)
    guest_crowd: '', // (嘉宾人群会员ID)
    course_date: ['2016-09-12', '2016-09-12'], // (选择课程日期 json方式["2016-09-12","2016-09-13"])
    course_times: '', // (课程时间  传9:00-12:00)
    is_graduation: 1, // (是否有结业考核 1=有 0=无)
    examination_form: '', // (考核形式)
    examination_date: '', // (考核日期)
    examination_times: '', // (考核时间)
    course_area: '', // (地区)
    course_address: '', // (详细地址)
    charging_one: '', // (计费标准（X元/人/次）)
    charging_all: '', // (计算标准（X元/人）)
    charging_types: '', // (计算标准(1=课前全额预付 2=课后单次付费))
    communicate_date: '', // (选择沟通日期)
    communicate_times: '', // (选择沟通时间)
  }
};


const page = {
  template: html,
  created: function() {},
  data: function() {
    return data;
  },
  methods: {
    onSubmit: function() {
      console.log(data.newCourse);
    }
  }
};

export default [{
  path: '/create',
  component: page
}];
