import app from 'app.config';
import angular from 'angular';
import './ne-table.scss';

/*
传入 http或者data，两个都存在的情况下，忽略http
 */

const OPTIONS = {
    parent: null, // 父节点 '#divId'
    class: null,
    striped: null, // 隔行变色，TODO待添加
    http: null, // 获取数据的请求 在request中定
    httpData: null, // 请求参数
    data: null, // 传入所有数据，通过表格进行分页
    hasCheckBox: true, // 是否有选择框
    scope: null, // 父scope，如果定义，则使用父scope，如果未定义，创建新scope
    isInit: true, // 是否进行初始化，false: 只进行表格创建
    page: true, // 是否包含底部分页信息
    onlyInfoPage: false, // 设置为 true 只显示总数据数，而不显示分页按钮。需要 page=true
    columnDefs: [
        // { display: 'ID', field: 'id', isTitle: false, width: 20, sort: 'id' } // width为number，sort为字符串（需要排序的key）
    ],
    // 加载服务器数据之前的处理程序，可以用来格式化数据。参数：res为从服务器请求到的数据。
    resHandler: function(res) {
        return res;
    },
    // 选中行事触发事件  参数：已勾选的列表 selArray
    onSelect: function() {},
};

// 项目变更需重新配置以下参数
const KEY = {
    list: 'data',
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

class Table {
    constructor(opts, $rootScope, $compile, $controller) {
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.$controller = $controller;
        this.opts = Object.assign({}, OPTIONS, opts);
        this.isAppend = false;
        this.scope = this.opts.scope ? this.opts.scope.$new() : $rootScope.$new(true);


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
        var that = this;
        this.$grid = angular.element("<div class='ui-grid'></div>");
        this.$header = angular.element("<div class='ui-grid-header'></div>");
        this.$gridList = angular.element("<div class='ui-grid-list'></div>");
        this.$grid.append(this.$header).append(this.$gridList);
        if (this.opts.class) {
            this.$grid.addClass(this.opts.class);
        }

        // 如果获取到了父节点，则添加表格，如果未获取到，则在请求之后添加表格
        let tryCount = 0;

        function tryAdd() {
            let p = angular.element(that.opts.parent);
            if (p.length > 0) {
                p.append(that.$grid);
                that.isAppend = true;
            } else if (tryCount > 50) {
                console.warn('neTable创建失败，未找到父节点');
            } else {
                tryCount += 1;
                setTimeout(tryAdd, 100);
            }
        }
        tryAdd();

        if (this.opts.page) {
            this.$grid.addClass('with-bottom');
            this.$gridBottom = angular.element("<div class='ui-grid-bottom'></div>");
            this.$grid.append(this.$gridBottom);
        }

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
            let $row = $(`<div class='ui-grid-row' ng-class='{"ui-grid-row-select": rowSelect[${index}]}'></div>`);
            this.$gridList.append($row);
            this.opts.columnDefs.forEach((colum) => {
                let cellWidth = colum.width ? (colum.width + '%') : equalWidth;
                let $cell = $(`<div class='ui-grid-row-cell' ng-click='rowClick(${index})' style='width: ${cellWidth}'></div>`);

                if (typeof colum.field === 'string') {
                    $cell.append(rowData[colum.field]);
                } else if (typeof colum.field === 'function') {
                    $cell.append(colum.field(rowData, this.scope.data));
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
            if (this.opts.hasCheckBox === true) {
                $row.addClass('ui-grid-hasCheck');
                $row.append("<div class='ui-grid-check'><input type='checkbox' ng-change='checkChange()' ng-model='rowSelect[" + index + "]'></div>");
            }
        });
        this.$compile(this.$gridList)(this.scope);
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
            this.opts.onSelect && this.opts.onSelect(this.getSelect());
        };
        // 单行点击事件
        this.scope.rowClick = (index) => {
            this.scope.rowSelect.forEach((item, i) => {
                this.scope.rowSelect[i] = (i !== index) ? false : !this.scope.rowSelect[i];
            });
            this.scope.rowSelectAll = (this.scope.rowSelect.length === 1) ? this.scope.rowSelect[index] : false;
            this.opts.onSelect && this.opts.onSelect(this.getSelect());
        };

        // 全选按钮
        this.scope.checkAllChange = () => {
            this.scope.rowSelect.fill(this.scope.rowSelectAll);
            this.opts.onSelect && this.opts.onSelect(this.getSelect());
        };
        // 排序点击事件
        let orderType = KEY.orderAsc;
        this.scope.SortAscDesc = (colData, index) => {
            // TODO
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
            let d = {};
            d[KEY.orderBy] = colData.sort;
            d[KEY.orderType] = orderType;
            Object.assign(this.scope.httpData, d);
            this.getData();
        };
    }

    createHeader() {
        this.$header.empty();
        let equalWidth = ((1 / this.scope.columnDefs.length) * 100) + '%';
        let cellWidth = (this.scope.columnDefs[0].width) ? '{{col.width}}%' : equalWidth;
        this.$header.append(`<div class="ui-grid-header-cell" ng-repeat="col in columnDefs" ng-click="SortAscDesc(col, $index)" style="width: ${cellWidth}">{{col.display}}</div>`);
        // 添加全选按钮
        if (this.opts.hasCheckBox === true) {
            this.$header.addClass('ui-grid-hasCheck');
            this.$header.append("<div class='ui-grid-check'><input type='checkbox' class='checkAll' ng-model='rowSelectAll' ng-change='checkAllChange()'></div>");
        }
        // 定时控制表头宽度
        this.interval = setInterval(() => {
            if (this.$grid.is(':hidden')) {
                clearInterval(this.interval);
                this.close;
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
        var that = this;
        var scope = this.scope;
        var LENGTH = 4;
        that.$gridBottom.empty();
        if (!that.opts.page) {
            return;
        }

        scope.isShow = !that.opts.onlyInfoPage;
        let $page = $('<div class="ui-grid-bottom-page" ng-show="isShow" ></div>');
        $page.append('<a class="page" ng-click="pageTo(\'上一页\')">上一页</a>');

        scope.pageList = [];
        let sNum = scope.curPage - LENGTH;
        let eNum = scope.curPage + LENGTH;
        sNum = sNum < 1 ? 1 : sNum;
        eNum = eNum > scope.pageCount ? scope.pageCount : eNum;
        for (let i = sNum; i <= eNum; i += 1) {
            scope.pageList.push(i);
        }
        if (sNum >= 2) {
            if (sNum > 2) {
                scope.pageList.unshift('...');
            }
            scope.pageList.unshift(1);
        }
        if (eNum <= (scope.pageCount - 2)) {
            if (eNum < (scope.pageCount - 2)) {
                scope.pageList.push('...');
            }
            scope.pageList.push(scope.pageCount);
        }
        $page.append('<a class="page" ng-repeat="num in pageList track by $index" ng-class="{sel:curPage == num}" ng-click="pageTo(num)">{{num}}</a>');
        $page.append('<a class="page" ng-click="pageTo(\'下一页\')">下一页</a>');
        that.$gridBottom.append("<div class='ui-grid-bottom-info'>共&nbsp{{totalCount}}&nbsp条，{{pageCount}}页</div>");
        that.$gridBottom.append($page);
        scope.pageTo = function(num) {
            if (num === '...') {
                return;
            }
            if (num === '上一页') {
                scope.httpData[KEY.httpCurPage] = scope.curPage > 1 ? (scope.curPage - 1) : 1;
            } else if (num === '下一页') {
                scope.httpData[KEY.httpCurPage] = scope.curPage < scope.pageCount ? (scope.curPage + 1) : scope.pageCount;
            } else {
                scope.httpData[KEY.httpCurPage] = num;
            }
            that.getData();
        };
        // 页面跳转事件
        scope.goClick = function() {
            if (scope.jumpTo > scope.pageCount) {
                scope.jumpTo = scope.pageCount;
            }
            scope.httpData[KEY.httpCurPage] = scope.jumpTo;
            that.getData();
        };

        this.$compile(that.$gridBottom)(scope);
    }
    getData() {
        var scope = this.scope;
        var that = this;

        scope.http(scope.httpData, function(data) {
            if (that.opts.resHandler) {
                scope.data = that.opts.resHandler(data);
            } else {
                scope.data = data;
            }

            scope.gridData = scope.data[KEY.list];
            scope.pageCount = scope.data[KEY.pageCount];
            scope.curPage = scope.data[KEY.curPage];
            scope.totalCount = scope.data[KEY.totalCount];
            that.refreshGrid();
        });
    }
    setData(data) {
        var scope = this.scope;
        var that = this;
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
        var res = [];
        for (let item of this.scope.rowSelect) {
            if (item === true) {
                res.push(item);
            }
        }
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


class NeTable {
    constructor($rootScope, $compile, $controller) {
        this.$rootScope = $rootScope;
        this.$compile = $compile;
        this.$controller = $controller;
    }
    create(opts) {
        return new Table(opts, this.$rootScope, this.$compile, this.$controller);
    }
}

NeTable.$injector = ['$rootScope', '$compile', '$controller'];

app.service('neTable', NeTable);
