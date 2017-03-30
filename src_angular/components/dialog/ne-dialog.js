/*
NeDialog
基于layer，添加绑定scope及controller，对事件的重写，以angular方式实现
示例:
neDialog.confirm(opt);
opt: 参考layer.open的参数，如{}, {content:'hello word'}, {content:'hello word', btn: null}(底部无按钮)
在layer.open对象参数的基础上添加两个参数
{
    scope： 需要绑定的scope
    controlller：需要绑定的control，string or function。当传入该参数时，建议$scope传入的为当前$scope的子对象，防止controlller中操作污染源$scope。$scope.$new()
}
窗口关闭：
yes事件回调中添加了一个参数，可直接调用该方法关闭窗口，也可以使用neDialog.close(index)，或者layer原生layer.close(index)
yes: function(close, index) {}

$scope.name = 'hello word';
neDialog.confirm({
    content: '<div class="ne-dialog">{{name}}</div>',
    scope: $scope,
    controller : 'testCtrl',
    yes: function(scope, close, index, dom) {
        $scope.name = 'ne-dialog';
        close();
    },
});
 */

import angular from 'angular';
import Dialog from './dialog.js';
import app from 'app.config';
import layer from 'layer';

app.factory('neDialog', function($compile, $controller, $rootScope) {
  let result = {
    confirm: function(opt) {
      return new Dialog($compile, $controller, $rootScope).confirm(opt);
    },
    // 确认框，是否删除
    ask: function(opt) {
      Object.assign(opt, { icon: 0, type: 0, });
      result.confirm(opt);
    },
    // 提示框
    alert: function(opt) {
      if (typeof opt === 'string') {
        opt = {
          content: opt
        };
      }
      Object.assign(opt, { icon: 0, type: 0, btn: ['确定'] });
      return result.confirm(opt);
    },
    // 确认框，是否删除
    msg: function(str, opt = {}) {
      return layer.msg(str, Object.assign(opt, {
        time: 3000,
      }));
    },
  };
  return result;
});
