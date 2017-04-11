import app from 'app.config';
import angular from 'angular';
/*
传入多条数据的情况下，注意x轴的一致性
 */

const COLOR = ['#f086d0', '#7cb9f2', '#f1ae55', '#f38588', '#12dae9'];

const PIE_OPTION = {
  tooltip: {
    trigger: 'item',
    formatter: function(params) {
      return `${params.name}: ${params.value}(${params.percent}%)`;
    }
  },
  color: COLOR,
  legend: {
    orient: 'vertical',
    right: '10%',
    bottom: '20%',
    data: [] // ['name1', 'name2']
  },
  series: [{
    name: '',
    clockwise: false,
    type: 'pie',
    radius: '55%',
    center: ['40%', '50%'],
    data: [] // { value: 235, name: 'name1' },
  }]
};

const CIRCLE_OPTION = angular.extend({}, PIE_OPTION, {
  series: [{
    name: '',
    clockwise: false,
    type: 'pie',
    radius: ['40%', '60%'],
    center: ['40%', '50%'],
    data: [] // { value: 235, name: 'name1' },
  }]
});

const LINE_OPTION = {
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '8%',
    right: '8%',
  },
  legend: {
    orient: 'horizontal',
    right: '8%',
    data: []
  },
  color: COLOR,
  xAxis: [{
    type: 'category',
    data: [],
    axisLabel: {
      textStyle: {
        color: '#999999'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#999999'
      }
    },
  }],
  yAxis: [{
    type: 'value',
    name: '',
    axisLine: {
      show: false
    },
    axisLabel: {
      textStyle: {
        color: '#999999'
      }
    },
    axisTick: {
      show: false,
    }
  }],
  series: []
};
const LINE_STYLE = {
  normal: {
    width: 1
  }
};
const MAP_OPTION = {
  tooltip: {
    formatter: function(params) {
      return '';
    },
  },
  visualMap: {
    min: 0,
    max: 100,
    left: '4%',
    top: 'bottom',
    text: [],
    calculable: true,
  },
  series: [{
    name: '',
    type: 'map',
    roam: false,
    mapType: 'china',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: true,
        textStyle: {
          color: 'black'
        }
      }
    },
    itemStyle: {
      normal: {
        areaColor: '#f3f3f3',
        borderColor: '#999999',
      },
      emphasis: {
        areaColor: '#f3f3f3', // TODO hover颜色
        shadowColor: 'rgba(0, 0, 0, 0.3)',
        shadowBlur: 10,
      }
    },
    data: []
  }]
};

// 获取对象中 data最大值 {line1: [{data, time}, {data, time}], line2: [{data, time}]}
function getTheMax(data) {
  let values = [];
  for (let key of Object.keys(data)) {
    values.push(...data[key].map(obj => obj.data));
  }
  return Math.max(...values);
}

// 根据value值获取 对应的 带宽单位 Gbps Mbps Kbps bps
function getAutoBanwidth(value) {
  if (value > Math.pow(10, 9)) {
    return 'Gbps';
  } else if (value > Math.pow(10, 6)) {
    return 'Mbps';
  } else if (value > Math.pow(10, 3)) {
    return 'Kbps';
  }
  return 'bps';
}

// 根据value值获取 对应的 流量单位 Byte KB MB GB
function getAutoFlow(value) {
  if (value > Math.pow(10, 9)) {
    return 'GB';
  } else if (value > Math.pow(10, 6)) {
    return 'MB';
  } else if (value > Math.pow(10, 3)) {
    return 'KB';
  }
  return 'Byte';
}
// const UNIT = {
//   banwidth: ['bps', 'Kbps', 'Mbps', 'Gbps'], //带宽
//   flow: ['Byte', 'KB', 'MB', 'GB'],
//   size: ['b', 'kb', 'mb', 'GB'],
//   speed: ['b/s', 'Kb/s', 'Mb/s', 'Gb/s']
// };

// function getSuitUnit(value, type = 'b') {
//   let n = Math.log(value) / Math.log(10)
// }

// 将数据转换成对应单位
function parseToUnit(value, unit) {
  let v = value;
  if (unit === 'Gbps' || unit === 'GB') {
    v = (value / Math.pow(1024, 3)).toFixed(2);
  } else if (unit === 'Mbps' || unit === 'MB') {
    v = (value / Math.pow(1024, 2)).toFixed(2);
  } else if (unit === 'Kbps' || unit === 'KB') {
    v = (value / Math.pow(1024, 1)).toFixed(2);
  }
  return v;
}

// 根据传入值，换算成相对合适的y轴数值 78->100, 32->50
function getY(value) {
  let wei = Math.log(value) / Math.log(10);
  if (wei <= 0) { // value <= 1
    return 1;
  }
  let half = Math.pow(10, Math.floor(wei)) * 5;
  let max = Math.ceil(value / half) * half;
  return max;
}

app.service('appChartService', function(request) {
  let self = this;

  // 饼图 data = { key: value}
  this.pie = function(id, data = {}, opts = {}) {
    let legendNames = [];
    let series = [];
    if (!Array.isArray(data)) {
      if (Object.keys(data).length === 0) {
        data = { '暂无数据': 0 };
      }
      for (let key of Object.keys(data)) {
        legendNames.push(key);
        series.push({
          value: data[key],
          name: key
        });
      }
    } else {
      series = data;
    }
    let myChart = echarts.init(document.getElementById(id));

    let option = $.extend(true, {}, PIE_OPTION, opts);
    option.legend.data = legendNames;
    option.series[0].data = series;
    myChart.setOption(option);
    return myChart;
  };

  // 环状图
  this.circle = function(id, data, opts = {}) {
    opts = $.extend(true, {}, CIRCLE_OPTION, opts);
    return self.pie(id, data, opts);
  };

  // 线图 data = {lineName: [{data, time}, {data, time}]}
  this.line = function(id, data = {}, opts = {}, type = '') {
    let max = getTheMax(data);
    let unit = '';
    if (type === 'banwidth') {
      unit = getAutoBanwidth(max);
    } else if (type === 'flow') {
      unit = getAutoFlow(max);
    }
    for (let key of Object.keys(data)) {
      for (let item of data[key]) {
        item.originalValue = item.data; // 保存转化前数据
        item.data = parseToUnit(item.data, unit); // 数据转换成对应单位，值过小的情况下直接置为0（否则echart会出现无法绘制的情况）
        item.data = item.data > 0.01 ? item.data : 0;
      }
    }

    let legendNames = [];
    let series = [];
    let xAxis = [];
    for (let key of Object.keys(data)) {
      legendNames.push(key);
      series.push({
        name: key,
        type: 'line',
        lineStyle: LINE_STYLE,
        data: data[key].map(obj => obj.data),
        originalValue: data[key].map(obj => obj.originalValue)
      });
      // 生成x轴
      if (xAxis.length === 0) {
        xAxis = data[key].map(obj => obj.time);
      }
    }

    let myChart = echarts.init(document.getElementById(id));
    let option = $.extend(true, {}, LINE_OPTION, opts, {
      tooltip: {
        formatter: function(params) {
          // console.log(params);
          let tip = `${params[0].name}`;
          for (let item of params) {
            let originalValue = series[item.seriesIndex].originalValue[item.dataIndex];
            let valueUnit = '';
            if (type === 'banwidth') {
              valueUnit = getAutoBanwidth(originalValue);
            } else if (type === 'flow') {
              valueUnit = getAutoFlow(originalValue);
            }
            let num = (valueUnit !== '') ? parseToUnit(originalValue, valueUnit) : originalValue;
            tip += `<br/><i class="fa fa-square" style="color: ${item.color}"></i> ${item.seriesName}: ${num} ${valueUnit}`;
          }
          return tip;
        }
      },
      legend: {
        data: legendNames
      },
      series: series,
      yAxis: [{
        name: unit
      }],
      xAxis: [{
        data: xAxis
      }]
    });
    myChart.setOption(option);
    return myChart;
  };

  // 线图 带宽
  this.lineOfBanwidth = function(id, data = {}, opts = {}) {
    return self.line(id, data, opts, 'banwidth');
  };

  // 线图 流量
  this.lineOfFlow = function(id, data = {}, opts = {}) {
    return self.line(id, data, opts, 'flow');
  };

  // 线图 两个Y轴 data = {line1: [{data, time}, {data, time}], line2: [{data, time}, {data, time}]}
  this.lineWithTwoY = function(id, data = {}, type = ['', '']) {
    let legendNames = [];
    let series = [];
    let xAxis = [];
    let unit = [];
    let keys = Object.keys(data);
    let max = [];
    if (keys.length !== 2) {
      console.log('暂不支持大于两条线的展示');
      return;
    }
    for (let index = 0; index < 2; index += 1) {
      max[index] = getTheMax({ _name: data[keys[index]] });
      if (type[index] === 'banwidth') {
        unit[index] = getAutoBanwidth(max[index]);
      } else if (type[index] === 'flow') {
        unit[index] = getAutoFlow(max[index]);
      }
      for (let item of data[keys[index]]) {
        item.data = parseToUnit(item.data, unit[index]);
      }
    }

    for (let key of keys) {
      legendNames.push(key);
      series.push({
        name: key,
        type: 'line',
        lineStyle: LINE_STYLE,
        data: data[key].map(obj => obj.data)
      });
      if (xAxis.length === 0) {
        xAxis = data[key].map(obj => obj.time);
      }
    }
    series[1].yAxisIndex = 1;
    let myChart = echarts.init(document.getElementById(id));
    let option = $.extend(true, {}, LINE_OPTION, {
      tooltip: {
        formatter: function(params) {
          let tip = `${params[0].name}`;
          for (let index = 0; index < params.length; index += 1) {
            let item = params[index];
            tip += `<br/><i class="fa fa-square" style="color: ${item.color}"></i> ${item.seriesName}: ${item.data} ${unit[index]}`;
          }
          return tip;
        }
      },
      legend: {
        data: legendNames
      },
      series: series,
      yAxis: [{
        name: ''
      }],
      xAxis: [{
        data: xAxis
      }]
    });
    // 拷贝一个y轴
    option.yAxis[1] = angular.copy(option.yAxis[0]);
    $.extend(true, option, {
      yAxis: [{
        name: unit[0],
        max: getY(parseToUnit(max[0], unit[0]))
      }, {
        name: unit[1],
        max: getY(parseToUnit(max[1], unit[1]))
          // splitLine: false,
          // axisLabel: false
      }]
    });
    myChart.setOption(option);
    return myChart;
  };
});
