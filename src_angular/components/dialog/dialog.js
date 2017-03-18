import layer from 'layer';

class Dialog {
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
    this.scope = scope;
    opt.success = (layero, index) => {
      if (opt.btn != null) {
        // layero[0].style.height = 'auto';
      }
      // setTimeout(() => {
      if (scope) {
        this.$compile(layero)(scope);
        // scope.$apply();
      }
      if (controller) {
        this.$controller(controller, {
          $scope: scope,
          $element: layero
        });
      }
      // });
      success && success(layero, index);
    };
    if (yes && scope) {
      opt.yes = (index, layero) => {
        if (scope._bat_validate && !scope._bat_validate()) {
          return;
        }
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

export default Dialog;
