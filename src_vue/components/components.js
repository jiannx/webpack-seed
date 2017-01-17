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

export default { request };
