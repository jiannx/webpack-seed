import app from 'app.config';
import moment from 'moment';

let cfg = {
  opens: 'right',
  timePicker: true,
  timePicker24Hour: true,
  ranges: {
    '今天': [moment().hour(0).minute(0), moment()],
    '昨天': [moment().subtract(1, 'days').hour(0).minute(0), moment().subtract(1, 'days').hour(23).minute(59)],
    '最近7天': [moment().subtract(6, 'days').hour(0).minute(0), moment()],
    '最近30天': [moment().subtract(29, 'days').hour(0).minute(0), moment()],
    '本月': [moment().startOf('month'), moment().endOf('month')],
    '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  locale: {
    format: 'YYYY-MM-DD HH:mm',
    applyLabel: '确定',
    cancelLabel: '取消',
    customRangeLabel: '自定义',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  }
};

app.directive('datePicker', ['$filter', function($filter) {
  return {
    restrict: 'AE',
    scope: {
      data: '=',
      time: '=',
      dataTime: '=',
      dataStart: '=',
      timeStart: '=',
      dataTimeStart: '=',
      dataEnd: '=',
      timeEnd: '=',
      dataTimeEnd: '=',
      type: '@', // single, range  默认:range
      options: '='
    },
    template: require('./tpl.html'),
    link: function(scope, elm, attrs, ctrl) {
      scope.releaseTime = '';
      Object.assign(scope.options, cfg);
      console.log(scope.options);
    }
  };
}]);
