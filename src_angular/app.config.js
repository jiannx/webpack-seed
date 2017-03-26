/*
angular实例，定义app
*/
import angular from 'angular';

export default angular.module('app', [
  'ui.router', 'daterangepicker', 'validation', 'validation.rule', 'ui.uploader'
]);


/*

浅拷贝
Object.assign({}, source1, source2)

数组遍历
for (let value of array) {
    console.log(value);
}
array.forEach((value, index) => {
    console.log(index);
});
for (let i = 0; i < array.length; i += 1) {
}

对象遍历
for (let key of Object.keys(obj)) {
}

对象拷贝
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
let ab = { ...a, ...b };
// 等同于
let ab = Object.assign({}, a, b);
*/
