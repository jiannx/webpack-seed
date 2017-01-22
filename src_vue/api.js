// const ip = 'http://101.201.121.40';
const host = '/app/?/api1.0';

const api = {
    'demo': { method: 'get', url: '/api/demo', desc: 'demo' },
    'login': { method: 'post', url: '/login/login_process/', desc: '登陆' },
    'imgUpload': { method: 'post', url: '/login/avatar_file/', desc: '图片上传' },
    'courseAdd': { method: 'post', url: '/index/course_insert/', desc: '课程创建' },
    'courseTypeList': { method: 'post', url: '/found/cateinfo/', desc: '课程分类' },
    'courseDetail': { method: 'post', url: '/index/view/', desc: '课程详情' },
    'courseJoin': { method: 'post', url: '/found/course_join_insert/', desc: '课程报名' },
    'userInfo': { method: 'post', url: '/users/index/', desc: '个人信息' },
    'foundIndex': { method: 'post', url: '/found/index/', desc: '发现首页' },
    'indexBanner': { method: 'post', url: '/index/banner/', desc: 'banner' }
};

for (let key of Object.keys(api)) {
    api[key].url = host + api[key].url;
}

export default api;
