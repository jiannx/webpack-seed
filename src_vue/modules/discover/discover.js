import { request, dataRangOpt } from 'app.components';
import _ from 'lodash';
import discoverHtml from './discover.html';
import detailHtml from './course-detial.html';

let discoverData = {
  name: 'discover',
  course: new Array(5),
  provinceList: [{ name: '232' }],
  cityList: [],
  areaList: [],

  filter: {
    page: 1,
    typesid: 1,
    course_cate_id: 2,
    grade: '1',
    facility: '难',
    course_times: '',
    course_area: '',


    country: '中国',
    province: '',
    city: '',
    area: ''
  }
};

let detailData = {
  name: 'discoverDetail',
  course: new Array(5)
};

const page = {
  template: discoverHtml,
  created: function() {
    request('vendor/china.json').success((res) => {
      discoverData.provinceList = res;
    });
    $(function() {
      $('input[name="daterange"]').daterangepicker(_.assignIn({}, dataRangOpt(), {}));
    });

    this.onRefresh();
  },
  data: function() {
    return discoverData;
  },
  methods: {
    onRefresh: function() {
      request('foundIndex', discoverData.filter).success(() => {

      });
    },
    onChinaChange: function(type) {
      if (type === 'province') {
        let pro = _.find(discoverData.provinceList, { 'name': discoverData.filter.province });
        discoverData.cityList = pro.city;
        discoverData.filter.city = '';
        discoverData.areaList = [];
        discoverData.filter.area = '';
      } else if (type === 'city') {
        let city = _.find(discoverData.cityList, { 'name': discoverData.filter.city });
        discoverData.areaList = city.area;
        discoverData.filter.area = '';
      } else if (type === 'area') {
        this.onRefresh();
      }
    },
    onSelTime: function() {
      $('input[name="daterange"]').click();
    },
  }
};
const detail = {
  template: detailHtml,
  created: function() {

  },
  data: function() {
    return detailData;
  }
};

export default [{
  path: '/discover',
  component: page
}, {
  path: '/discover/detail',
  component: detail
}];
