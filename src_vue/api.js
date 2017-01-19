// const ip = 'http://101.201.121.40';
const host = '/app/?/api1.0';

const api = {
    'demo': { method: 'get', url: '/api/demo', desc: 'demo' },
    'foundIndex': { method: 'post', url: '/found/index/', desc: '发现首页' },
    'indexBanner': { method: 'post', url: '/index/banner/', desc: 'banner' }
};

for (let key of Object.keys(api)) {
    api[key].url = host + api[key].url;
}

export default api;
