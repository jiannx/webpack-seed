import angular from 'angular';
import uirouter from 'angular-ui-router';

export default angular.module('app', [
    uirouter,
]);

/*

let
只在let命令所在的代码块内有效，且必须先声明，不允许重复声明
exp: for (let i = 0; i < 10; i++) {}

const { SourceMapConsumer, SourceNode } = require("source-map");

var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}

fuction def({
    name : 'default',
    age: 20
}){

}
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();

'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true

*/
