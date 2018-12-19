var myCharts = require("../../utils/wxcharts.js")//引入一个绘图的插件
var lineChart_light = null
var app = getApp()

Page({
  data: {
  },
  onPullDownRefresh: function () {
    console.log('onPullDownRefresh', new Date())
  },
  //把拿到的数据转换成绘图插件需要的输入格式
  convert: function () {
    var categories = [];
    var light = [];

    var length = app.globalData.light.datapoints.length
    for (var i = 0; i < length; i++) {
      categories.push(app.globalData.light.datapoints[i].at.slice(11, 19));
      light.push(app.globalData.light.datapoints[i].value);
    }
    return {
      categories: categories,
      light: light

    }
  },

  onLoad: function () {
    var wheatherData = this.convert();

    //得到屏幕宽度
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var wheatherData = this.convert();

    //新建光照强度图表
    lineChart_light = new myCharts({
      canvasId: 'light',
      type: 'line',
      categories: wheatherData.categories,
      animation: true,
      background: '#f5f5f5',
      series: [{
        name: 'light',
        color: '#13A878',
        data: wheatherData.light,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true,
        fontColor: '#2F6C5E'
      },
      yAxis: {
        title: 'light (lux)',
        fontColor: '#2F6C5E',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 190
      },
      width: windowWidth,
      height: 200,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
 
  
})