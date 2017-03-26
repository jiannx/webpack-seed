import angular from 'angular';

// 项目变更需重新配置以下参数
const KEY = {
  // 响应参数定义
  list: 'info',
  curPage: 'page_now',
  pageCount: 'page_total',
  totalCount: 'records',
  // 请求参数定义
  httpCurPage: 'page', // 页码
  orderType: 'sort_type',
  orderBy: 'sort_col',
  orderDesc: 'desc',
  orderAsc: 'asc',
};

const OPTIONS = {
  parent: null, // 必填。父节点(string) '#divId'
  // http or data必填一项
  http: null, // 获取数据的请求 在request中定(string or func)
  httpData: {}, // 选填。请求参数(object)
  data: null, // 传入所有数据，通过表格进行分页(object)

  scope: null, // 选填。父scope，如果定义，则使用父scope，如果未定义，创建新scope($scope)
  isInit: true, // 选填。是否进行数据初始化(bool)

  // 必填。列定义，display列头(string)，field列需要显示的内容(func or string)，isTitle是否添加title属性(bool)，width列宽度(number)，sort排序字段(string)
  columnDefs: [
    // { display: 'ID', field: 'id', isTitle: false, width: 20, sort: 'id' }
  ],

  // 选填 样式定义
  theme: null,

  // 选填。下方滚动面板，当置为true时，slidePanel才有效。请在onRowClick中调用showSlidePanel(index)来显示该面板
  withSlidePanel: false,
  slidePanel: {
    height: '200px', // 面板高度 '100px' (string)
    autoHideOthers: true, // 当显示一个下拉面板时，自动隐藏其他下拉面板
    field: null, // cell内容创建函数，function(rowData, rowIndex, colIndex) {}
  },
  // 选填。每行是否有checkbox
  withCheckBox: true, // 是否有选择框
  // 选填。是否包含底部分页信息
  withPage: true,
  page: {
    withInfo: true, // 包含共几页等信息
    withNumber: true, // 包含分页按钮
    custom: null // 自定义分页 function(numberBtnsDom, pageInfoDom){ return dom}
  },

  // 选填。加载服务器数据之前的处理程序，可以用来格式化数据。function(res) {return res;}
  onResHandler: null,
  // 选填。选中行事触发事件  function(selArray) {},
  onSelect: null,
  // 选填。单行点击事件 function(rowData, rowIndex, slidePanelId, slidePanelCellIds) {}
  // 回调参数：rowData当前行数据，rowIndex当前行序号，slidePanelId当前行下拉面板id，slidePanelCellIds当前下拉面板中cell id的数组集合
  onRowClick: null
};

class Table {
  constructor(opts, $rootScope, $compile, $controller) {
    this.$rootScope = $rootScope;
    this.$compile = $compile;
    this.$controller = $controller;
    this.opts = angular.extend({}, OPTIONS, opts);
    this.id = 'ne-table' + new Date().getTime();

    this.scope = this.opts.scope ? this.opts.scope.$new() : $rootScope.$new();
    this.scope.data = {};
    this.scope.totalCount = 0;
    this.scope.curPage = 1;
    this.scope.pageCount = 1;
    this.scope.gridData = [];
    this.scope.columnDefs = this.opts.columnDefs;
    this.scope.http = this.opts.http;
    this.scope.httpData = this.opts.httpData;
    this.scope.rowSelect = [];
    this.scope.rowSelectAll = false;
    this.scope.jumpTo = null;

    this.bindUI();
    this.renderUI();

    // 是否创建时直接获取数据
    if (this.opts.isInit) {
      if (this.opts.data != null) {
        this.setData(this.opts.data);
      } else {
        this.getData();
      }
    }
  }

  close() {
    this.scope.$destroy();
    this.$grid.remove();
  }

  renderUI() {
    this.$grid = angular.element(`<div class="ui-grid ${this.opts.theme}" id="${this.id}"></div>`);
    this.$header = angular.element("<div class='ui-grid-header'></div>");
    this.$gridList = angular.element("<div class='ui-grid-list'></div>");
    this.$grid.append(this.$header).append(this.$gridList);
    if (this.opts.withPage) {
      this.$grid.addClass('with-bottom');
      this.$gridBottom = angular.element("<div class='ui-grid-bottom'></div>");
      this.$grid.append(this.$gridBottom);
    }

    // 如果获取到了父节点，则添加表格，如果未获取到，则在请求之后添加表格
    const tryAdd = (count) => {
      if (angular.element(`#${this.id}`).length > 0) {
        return;
      }
      if (count > 50) {
        console.warn('neTable创建失败，未找到父节点');
      } else if (angular.element(this.opts.parent).length > 0) {
        angular.element(this.opts.parent).append(this.$grid);
      } else {
        setTimeout(() => { tryAdd(count + 1); }, 100);
      }
    };
    tryAdd(0);

    // 只创建表头，等待获取到数据后再创建表格
    this.createHeader();
  }

  // 列表的ui操作以jq dom操作实现，是否选中以数据双向绑定实现
  refreshGrid() {
    this.createList();
    this.createBottom();
  }
  createList() {
    this.$gridList.empty();
    this.scope.rowSelectAll = false;
    this.scope.rowSelect = [];
    let equalWidth = ((1 / this.opts.columnDefs.length) * 100) + '%';

    this.scope.gridData.forEach((rowData, index) => {
      this.scope.rowSelect[index] = false;
      let $row = angular.element(`<div class='ui-grid-row' ng-class='{"ui-grid-row-select": rowSelect[${index}]}'></div>`);
      this.$gridList.append($row);
      this.opts.columnDefs.forEach((colum) => {
        let cellWidth = colum.width ? (colum.width + '%') : equalWidth;
        let $cell = angular.element(`<div class='ui-grid-row-cell' ng-click='rowClick(${index})' style='width: ${cellWidth}'></div>`);

        if (typeof colum.field === 'string') {
          $cell.append(rowData[colum.field]);
        } else if (typeof colum.field === 'function') {
          $cell.append(colum.field(rowData, index, this.scope.data));
        }
        if (angular.isDefined(colum.isTitle) === true) {
          if (angular.isFunction(colum.isTitle) === true) {
            $cell.attr('title', colum.isTitle(rowData, this.scope.data));
          } else if (colum.isTitle === true) {
            $cell.attr('title', rowData[colum.field]);
          }
        }
        $row.append($cell);
      });
      $row.append('<div class="clearfix"></div>');

      if (this.opts.withCheckBox === true) {
        $row.addClass('ui-grid-hasCheck');
        $row.append(`<div class='ui-grid-check'><input type='checkbox' ng-change='checkChange()' ng-model='rowSelect[${index}]'></div>`);
      }
      if (this.opts.withSlidePanel === true) {
        let $slidePanel = angular.element(`<div class="ui-grid-row-down-panel" style="height:${this.opts.slidePanel.height}" id="${this.getSlidePanelId(index)}"></div>`);
        $row.append($slidePanel);
        this.opts.columnDefs.forEach((colum, columIndex) => {
          let cellWidth = colum.width ? (colum.width + '%') : equalWidth;
          let $cell = angular.element(`<div class="ui-grid-row-cell" style="width: ${cellWidth}" id="${this.getSlidePanelCellId(index, columIndex)}"></div>`);
          if (this.opts.slidePanel.field && typeof this.opts.slidePanel.field === 'function') {
            $cell.append(this.opts.slidePanel.field(rowData, index, columIndex));
          }
          $slidePanel.append($cell);
        });
        $slidePanel.append('<div class="clearfix"></div>');
      }
    });
    if (this.scope.gridData.length === 0) {
      this.$gridList.append('<div class="ui-grid-list-no-data">无数据</div>');
    }
    this.$compile(this.$gridList)(this.scope);
  }
  getSlidePanelId(index) {
    return `${this.id}-slidepanel-${index}`;
  }
  getSlidePanelCellId(rowIndex, cellIndex) {
    return `${this.getSlidePanelId(rowIndex)}-${cellIndex}`;
  }
  showSlidePanel(index) {
    angular.element(`#${this.getSlidePanelId(index)}`).slideDown();
    if (this.opts.slidePanel.autoHideOthers === true) {
      this.scope.gridData.forEach((rowData, i) => {
        if (i !== index) {
          angular.element(`#${this.getSlidePanelId(i)}`).slideUp();
        }
      });
    }
  }
  hideSlidePanel(index) {
    if (index) {
      angular.element(`#${this.getSlidePanelId(index)}`).slideUp();
    } else {
      this.scope.gridData.forEach((rowData, i) => {
        angular.element(`#${this.getSlidePanelId(i)}`).slideUp();
      });
    }
  }
  bindUI() {
    // 单行选择按钮
    this.scope.checkChange = (index) => {
      this.scope.rowSelect[index] = true;
      let count = 0;
      this.scope.rowSelect.forEach((item) => {
        count += Number(item);
      });
      this.scope.rowSelectAll = (count === this.scope.rowSelect.length);
      this.opts.onSelect && this.opts.onSelect.call(this, this.getSelect());
    };
    // 单行点击事件
    this.scope.rowClick = (index) => {
      this.scope.rowSelect.forEach((item, i) => {
        this.scope.rowSelect[i] = (i !== index) ? false : !this.scope.rowSelect[i];
      });
      this.scope.rowSelectAll = (this.scope.rowSelect.length === 1) ? this.scope.rowSelect[index] : false;
      this.opts.onSelect && this.opts.onSelect.call(this, this.getSelect());
      let slidePanelIds = [];
      this.opts.columnDefs.forEach((colum, columIndex) => {
        slidePanelIds.push(this.getSlidePanelCellId(index, columIndex));
      });
      this.opts.onRowClick && this.opts.onRowClick.call(this, this.scope.gridData[index], index, this.getSlidePanelId(index), slidePanelIds);
    };

    // 全选按钮
    this.scope.checkAllChange = () => {
      this.scope.rowSelect.fill(this.scope.rowSelectAll);
      this.opts.onSelect && this.opts.onSelect.call(this, this.getSelect());
    };
    // 排序点击事件
    this.scope.SortAscDesc = (colData, index) => {
      let orderType = KEY.orderAsc;
      if (typeof colData.sort !== 'string') {
        console.info('请配置排序字段');
        return;
      }
      let clickHeader = this.$header.find('.ui-grid-header-cell').eq(index);
      let others = clickHeader.siblings();
      if (clickHeader.hasClass('ui-grid-down')) {
        clickHeader.removeClass('ui-grid-down').addClass('ui-grid-up');
        others.removeClass('ui-grid-up').removeClass('ui-grid-down');
        orderType = KEY.orderAsc;
      } else {
        clickHeader.removeClass('ui-grid-up').addClass('ui-grid-down');
        others.removeClass('ui-grid-up').removeClass('ui-grid-down');
        orderType = KEY.orderDesc;
      }
      this.scope.httpData[KEY.orderBy] = colData.sort;
      this.scope.httpData[KEY.orderType] = orderType;
      this.getData();
    };
    // 页面跳转事件
    this.scope.pageTo = (num) => {
      if (num === '...') {
        return;
      }
      if (num === '上一页') {
        this.scope.httpData[KEY.httpCurPage] = this.scope.curPage > 1 ? (this.scope.curPage - 1) : 1;
      } else if (num === '下一页') {
        this.scope.httpData[KEY.httpCurPage] = this.scope.curPage < this.scope.pageCount ? (this.scope.curPage + 1) : this.scope.pageCount;
      } else {
        this.scope.httpData[KEY.httpCurPage] = num;
      }
      this.getData();
    };
    // 页面跳转事件
    this.scope.goClick = () => {
      if (this.scope.jumpTo > this.scope.pageCount) {
        this.scope.jumpTo = this.scope.pageCount;
      }
      this.scope.httpData[KEY.httpCurPage] = this.scope.jumpTo;
      this.getData();
    };
  }

  createHeader() {
    this.$header.empty();

    let equalWidth = ((1 / this.scope.columnDefs.length) * 100) + '%';
    let cellWidth = (this.scope.columnDefs[0].width) ? '{{col.width}}%' : equalWidth;
    this.$header.append(`<div class="ui-grid-header-cell" ng-repeat="col in columnDefs track by $index" ng-click="SortAscDesc(col, $index)" style="width: ${cellWidth}">{{col.display}}</div>`);

    // 添加全选按钮
    if (this.opts.withCheckBox === true) {
      this.$header.addClass('ui-grid-hasCheck');
      this.$header.append("<div class='ui-grid-check'><input type='checkbox' class='checkAll' ng-model='rowSelectAll' ng-change='checkAllChange()'></div>");
    }
    // 定时控制表头宽度
    this.interval = setInterval(() => {
      if (angular.element(`#${this.id}`).length === 0) {
        clearInterval(this.interval);
        this.close();
        return;
      }
      let w = this.$gridList[0].offsetWidth;
      if (this.$gridList.find('.ui-grid-row').length > 0) {
        w = this.$gridList.find('.ui-grid-row').eq(0)[0].offsetWidth;
      }
      this.$header.css({
        width: w
      });
    }, 500);

    this.$compile(this.$header)(this.scope);
  }

  createBottom() {
    if (!this.opts.withPage) {
      return;
    }
    let LENGTH = 4;
    this.$gridBottom.empty();
    this.scope.isShow = !this.opts.onlyInfoPage;

    let $numBtns = angular.element('<div class="ui-grid-bottom-page">' +
      '<a class="page" ng-click="pageTo(\'上一页\')">上一页</a>' +
      '<a class="page-num" ng-repeat="num in pageList track by $index" ng-class="{sel:curPage == num}" ng-click="pageTo(num)">{{num}}</a>' +
      '<a class="page" ng-click="pageTo(\'下一页\')">下一页</a>' +
      '</div>');
    let $pageInfo = angular.element('<div class="ui-grid-bottom-info">共&nbsp{{totalCount}}&nbsp条，{{pageCount}}页</div>');
    this.scope.pageList = [];
    let sNum = this.scope.curPage - LENGTH;
    let eNum = this.scope.curPage + LENGTH;
    sNum = sNum < 1 ? 1 : sNum;
    eNum = eNum > this.scope.pageCount ? this.scope.pageCount : eNum;
    if (sNum >= 2) {
      this.scope.pageList.push(1);
      if (sNum > 2) {
        this.scope.pageList.push('...');
      }
    }
    for (let i = sNum; i <= eNum; i += 1) {
      this.scope.pageList.push(i);
    }
    if (eNum === (this.scope.pageCount - 1)) {
      this.scope.pageList.push(this.scope.pageCount);
    }
    if (eNum < (this.scope.pageCount - 1)) {
      this.scope.pageList.push('...');
      this.scope.pageList.push(this.scope.pageCount);
    }
    // this.scope.pageList.push('下一页');
    if (this.opts.page.custom && typeof this.opts.page.custom === 'function') {
      this.$gridBottom.append(this.opts.page.custom($numBtns, $pageInfo));
    } else {
      if (this.opts.page.withInfo) {
        this.$gridBottom.append($pageInfo);
      }
      if (this.opts.page.withNumber) {
        this.$gridBottom.append($numBtns);
      }
    }
    this.$compile(this.$gridBottom)(this.scope);
  }
  getData() {
    let scope = this.scope;
    let that = this;
    // this.$grid.addClass('blur');
    scope.http.config({ showLoading: true }).data(scope.httpData).success(function(data) {
      that.$grid.removeClass('blur');
      if (that.opts.onResHandler) {
        scope.data = that.opts.onResHandler(data);
      } else {
        scope.data = data;
      }

      scope.gridData = scope.data[KEY.list];
      scope.pageCount = parseInt(scope.data[KEY.pageCount], 10);
      scope.curPage = parseInt(scope.data[KEY.curPage], 10);
      scope.totalCount = parseInt(scope.data[KEY.totalCount], 10);
      that.refreshGrid();
    }).error(() => {
      that.$grid.removeClass('blur');
    });
  }
  setData(data) {
    let scope = this.scope;
    let that = this;
    scope.data = data;
    scope.gridData = data[KEY.list];
    scope.pageCount = data[KEY.pageCount];
    scope.curPage = data[KEY.curPage];
    scope.totalCount = data[KEY.totalCount];
    that.refreshGrid();
  }
  refresh() {
    this.getData();
    this.opts.onSelect && this.opts.onSelect([]);
  }

  // 获取选中行
  getSelect() {
    let res = [];
    let self = this;
    this.scope.rowSelect.forEach(function(item, i) {
      if (item) {
        res.push(self.scope.gridData[i]);
      }
    });
    return res;
  }

  // 重设http请求及数据
  setHttp(http, httpData) {
    this.scope.http = http;
    this.setHttpData(httpData);
  }

  // 重设http请求 数据
  setHttpData(httpData) {
    this.scope.httpData = angular.copy(httpData);
    this.getData();
  }
}

export default Table;
