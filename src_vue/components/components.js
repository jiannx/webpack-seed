import layer from 'layer';
import _ from 'lodash';
import NeRequest from './request/ne-request';
import api from '../api.js';

NeRequest.set('beforeRequset', function(reqData) {
    if (typeof reqData.req === 'string' && api[reqData.req]) {
        reqData.req = api[reqData.req];
    }
    return reqData;
});
NeRequest.set('afterSuccessRequset', function(...args) {

});
NeRequest.set('afterErrorRequset', function(...args) {
    // layer.alert(`Error Info: ${args[0].data.data}, Code: ${args[0].status}`, { icon: 2, title: '数据请求失败' });
});

export function request(req, reqData, successCall, errorCall, cfg) {
    return new NeRequest(req, reqData, successCall, errorCall, cfg);
}
export function dataRangOpt() {
    return {
        // opens: 'right',
        maxDate: new Date(),
        timePicker: false,
        timePicker24Hour: true,
        // ranges: {
        //     '今天': [moment().hour(0).minute(0), moment()],
        //     '昨天': [moment().subtract(1, 'days').hour(0).minute(0), moment().subtract(1, 'days').hour(23).minute(59)],
        //     '最近7天': [moment().subtract(6, 'days').hour(0).minute(0), moment()],
        //     '最近30天': [moment().subtract(29, 'days').hour(0).minute(0), moment()],
        //     // 'This Month': [moment().startOf('month'), moment().endOf('month')],
        //     '上个月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        // },
        locale: {
            format: 'YYYY-MM-DD',
            applyLabel: '确定',
            cancelLabel: '取消',
            customRangeLabel: '自定义',
            daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
            monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        }
    };
}

export default { request };
