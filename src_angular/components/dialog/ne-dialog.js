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

import app from 'app.config';
import layer from 'layer';
import './ne-dialog.scss';

class NeDialog {
    constructor($compile, $controller, $rootScope) {
        this.$compile = $compile;
        this.$controller = $controller;
        this.$rootScope = $rootScope;
        this.index = null;
        this._def_opt = {
            type: 1,
            // skin: 'layui-layer-molv',
            btn: ['确定', '取消'], // If the button is not needed, set to null
        };
    }
    confirm(opt = {}) {
        opt = Object.assign({}, this._def_opt, opt);
        let { success, yes, cancel, end, full, min, restore, scope, controller } = opt;
        if (!scope) {
            scope = this.$rootScope.$new();
        } else {
            scope = scope.$new();
        }
        opt.success = (layero, index) => {
            if (opt.btn != null) {
                // layero[0].style.height = 'auto';
            }
            setTimeout(() => {
                if (scope) {
                    this.$compile(layero)(scope);
                }
                if (controller) {
                    this.$controller(controller, {
                        $scope: scope,
                        $element: layero
                    });
                }
            });

            success && success(layero, index);
        };
        if (yes && scope) {
            opt.yes = (index, layero) => {
                scope.$apply(yes(scope, () => { layer.close(index); }, index, layero));
            };
        }
        if (cancel && scope) {
            opt.cancel = (index) => {
                scope.$apply(cancel(index));
            };
        }
        if (end && scope) {
            opt.end = () => {
                scope.$apply(end());
            };
        }
        if (full && scope) {
            opt.full = () => {
                scope.$apply(full());
            };
        }
        if (min && scope) {
            opt.min = () => {
                scope.$apply(min());
            };
        }
        if (restore && scope) {
            opt.restore = () => {
                scope.$apply(restore());
            };
        }
        this.index = layer.open(opt);
        return this;
    }
    close() {
        this.scope.$destroy();
        layer.close(this.index);
    }
}

app.factory('neDialog', function($compile, $controller, $rootScope) {
    let result = {
        confirm: function(opt) {
            return new NeDialog($compile, $controller, $rootScope).confirm(opt);
        }
    };
    return result;
});
