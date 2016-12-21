import app from 'app.config';

// 首页
app.config(($stateProvider) => {
    $stateProvider.state('home', {
        url: '/home',
        template: require('../console.html')
    }).state('home.index', {
        url: '/index',
        views: {
            'console': { template: require('./home.html') }
        }
    });
});

app.service('homeService', () => {
    this.name = 'homeService';
});

app.controller('homeCtrl', ($scope, neDialog, neTable) => {
    $scope.onLayerTest = function() {
        let html = '<div class="ne-dialog"><button ng-click="layerBtn()">{{name}}</button></div>';
        $scope.layerBtn = function() {
            $scope.name += 1;
        };
        neDialog.confirm({
            content: html,
            scope: $scope
        });
    };
    $scope.$on('login.success', function() {
        $scope.name = 0;
        $scope.$apply();
    });

    // let grid = neTable.create({
    //     parent: '#grid',
    //     class: 'dddd',
    //     scope: $scope,
    //     // isInit: false,
    //     data: {
    //         page_now: 1,
    //         page_total: 1,
    //         records: 2,
    //         data: [{ id: 1 }, { id: 2 }]
    //     },
    //     columnDefs: [
    //         { display: 'ID', field: 'id' },
    //         { display: '姓名', field: 'name' },
    //         { display: '账号', field: 'name' },
    //         { display: '角色', field: 'name' },
    //         { display: '权限', field: 'name' }, {
    //             display: '操作',
    //             field: function(rowData) {
    //                 var id = rowData.id;
    //                 return '<a class="btn-control" ng-click="onOperateClick($event, 0, ' + id + ')" title="编辑" ><i class="fa fa-pencil-square-o"></i>&nbsp;</a>' +
    //                     '<a class="btn-control" ng-click="onOperateClick($event, 5, ' + id + ')" title="删除" ><i class="fa fa-trash-o"></i>&nbsp;</a>';
    //             },
    //             sort: false
    //         },
    //     ],
    //     resHandler: function(resData) {
    //         $scope.gridList = resData.data.data;
    //         return resData.data;
    //     },
    //     onSelect: function(array) {
    //         $scope.gridSel = array;
    //     }
    // });
});
