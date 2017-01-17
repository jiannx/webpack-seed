// const ip = 'http://101.201.121.40';
const host = '/app/?/api1.0';

const api = {
    'demo': { method: 'get', url: '/api/demo', desc: 'demo' },
    'foundIndex': { method: 'get', url: '/found/index/', desc: '发现首页' }
};

for (let key of Object.keys(api)) {
    api[key].url = host + api[key].url;
}

export default api;
