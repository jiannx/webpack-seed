
```
方法
neTable.create(options)
close()销毁
refresh() 表格数据刷新
getSelect() 获取表格当前选中行
setHttp() 重设http请求
setData() 重设表格数据
setHttpData() 重设httpdata数据
showSlidePanel(index) 显示下拉面板(index为要显示的行号)
hideSlidePanel(index) 隐藏下拉面板(index为要隐藏的行号，如果index为空，则隐藏全部)

Demo
neTable.create({
    parent: '#log-table',
    data: {
        page_now: 1,
        page_total: 7,
        records: 100,
        data: [
            { id: 1, name: 11 },
        ]
    },
    columnDefs: [
        { display: 'ID', field: 'id' },
        { display: 'name', field: 'name' },
    ]
});
neTable.create({
    parent: '#log-table',
    http: request.api.getUserList,
    columnDefs: [
        { display: 'ID', field: 'id' },
        { display: 'name', field: 'name' },
    ]
});
let table = neTable.create({
    parent: '#log-table',
    scope: $scope,
    http: request.api.getUserList,
    httpData: {
        page_now: 10
    },
    withCheckBox: false,
    withSlidePanel: true,
    slidePanel: {
        height: '200px;',
        field: function(rowData, rowIndex, colIndex){ return rowIndex + ':' + colIndex;}
    },
    style: {
        class: 'table-class'
    },
    withPage: true,
    page: {
        custom: function(numberBtnsDom, pageInfoDom){ return 'custom buttom page'}
    },
    columnDefs: [
        { display: 'ID', field: 'id' },
        { display: 'name', field: 'name' },
    ],
    onResHandler: function(res){
        return res.data;
    },
    onSelect: function(list){
        let selList = list;
    },
    onRowClick: function(rowData, index, slidePanelId, slidePanelCellIds) {
        this.showSlidePanel(index);
        //this.hideSlidePanel(index);
    }
});
```