# ES6 Class NeRequest, Angular Factory request

## 项目介绍
同步请及异步请求插件，包含 NeRequest的定义及注入到angular中

## Angualr中使用与参照NeRequest
所有接口的统一错误处理

```
// Demo
request(req, data, successCall, errorCall, cfg);
request('getList').success((res) => {});
request('getList', {}, (res) => {});
request.data({id: 0});

```

## NeRequest
同步请及异步请求插件，默认使用ajax。如果在Angular中使用，请在构造函数中传入$http

### 基础用法（以下调用均忽略$http参数）
```
new NeRequest(req, data, successCall, errorCall, cfg, $http);
/*
参数：
req：string or object。必填。 如果为字符串，则优先匹配api.js中定义的接口 { getList: {method:'get', url:'/api/get/list'} }；如果未匹配到，则自动创建 {method:'get', url: req} 对象作为参数。如果传入参数为对象 则不做处理（该对象中必须包含method, url。参照Angualr $http参数）
data: object。选填，默认空对象。 发送到后台的请求数据
successCall: function。选填，默认空函数。 请求成功回调函数 (resData1, resData2, resData3, ..., [res])
errorCall: function。选填，默认空函数。 请求失败回调函数 (errorResData, errorIndex, [res])
cfg: object。选填，默认对象{showLoading: true}。接口一些配置
$http：angular $http service。选填，如果angular，请传入$http。默认使用$.ajax
*/

// 全局事件配置，一般用于配置一些全局的成功回调及错误回调，例如未登录，错误提示等
NeRequest.set('type', 'Angular'); // 设置模式，angular or jquery。默认Angular
NeRequest.set('beforeRequset', function(reqData) {}); // 所有接口请求前调用，参数为当前请求的配置对象，如果该函数返回一个对象，将替换原先接口配置对象
NeRequest.set('afterSuccessRequset', function(...args) {}); // 所有接口请求完成后调用，如果该函数返回false，将不执行原先的successCall函数
NeRequest.set('afterErrorRequset', function(...args) {}); // 接口请求出错后调用，如果该函数返回false，将不执行原先的errorCall函数
NeRequest.set('httpOption', {}); // 接口全局参数配置，例如Angular中：{method: null, url: null, timeout: 10000, headers: {'Content-Type': 'textplain;charset=UTF-8'} }

//demo
new NeRequest('getList').success((res) => {});
new NeRequest('/api/get', {id: 1}).success((res) => {});
new NeRequest('getList', {}, (res) => {});
new NeRequest('getList', {}).success((res) => {}).error((res) => {});
new NeRequest({
    method: 'get',
    url: '/api/get'
  }, { id: 1}, (successRes)=>{}, (errorRes)=>{}, {showLoading: true});
```

### 高级用法
- 重设请求参数
```
new NeRequest('getList', {id: 1, name: 'xx'}).data({id: 2}).success((res) => {});
// data中传入的参数会完全替换原先的参数对象，即传到后台的数据为{id: 2}
new NeRequest('getList', {id: 1}).success().data({id: 2}).success((res) => {});
// 该请求会报错，当调用success时，请求已经发起，此时设置data将失败。
// 请在请求完成之后再次调用data及success
```

- 异步请求
```
new NeRequest('getList').async('getName').async('getUser').success((res1, res2, res3, resArray)=>{})
// N个请个同时发起，当所有请求完成之后，依次将返回值作为参数传入success中
// 第N+1个参数为N个请求返回的原始数据数组，包含status，headers等数据
```

- 同步请求
```
new NeRequest('getList').sync('getName').sync('getUser').success((res1, res2, res3, resArray)=>{})
// N个请个依次发起，第一个请求结束后，执行第二个.....依次将返回值作为参数传入success中
// 第N+1个参数为N个请求返回的原始数据数组，包含status，headers等数据
```

- 上一次请求返回数据作为下一次请求参数
```
new NeRequest('getName', {id: 0})
.success((res1)=>{
  return {name: 'zz'};
})
.sync('getScore')
.success((res1, res2)=>{
  return {score: 90};
})
.sync('getList', {score: 80})
.success((res1, res2, res3, resArray)=>{});
// 先执行 getName 参数为{id: 0}
// 完成后执行 getScore 参数为 {name: 'zz'}
// 完成后执行 getList 参数为 {score: 90}
// 获取前一个successc的返回参数作为本次请求的参数，返回参数的优先级大于请求配置时传入的参数（即覆盖原先参数, 浅拷贝）
```

- 同步异步混合
```
new NeRequest('getA')
.async('getB')
.sync('getC')
.sync('getD')
.success(()=>{
    return { id: 0};
})
.async('getE')
.async('getF')
.success((resA, resB, resC, resD, resE, resF, resArray)=>{});
// getA 与 getB 执行
// 完成后 getC执行
// 完成后 getD执行
// 完成后 getE，getF执行, E, F的参数都为 D 返回的参数{ id: 0}
```
