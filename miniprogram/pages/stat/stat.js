var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
const db = wx.cloud.database();
const tasks = db.collection('tasks');
var chartData = {
  main: {
    title: '总成交量',
    data: [15, 20, 45, 37],
    categories: ['已完成', '未完成', '番茄记录']
  }
};
var dataList =[]
Page({
  data: {
    todos:[],
    chartTitle: '任务完成记录',
    isMainChartDisplay: true
  },

  async onReady(e) {
    await tasks.get().then(res => {
      //console.log("全部数据:",res.data)
      this.setData({
        todos: res.data
      })
      //console.log(this.data.todos[0].tomatoTime)
    })
    let sum = 0
    let sum1 = 0
    let sum2 = 0
    var arr = this.data.todos;
    //console.log(arr)
    console.log(arr.length)
    console.log(arr[1].isFinish)
    for (let i = 0; i < arr.length; i++) {
      //console.log(arr[i].tomatoTime)
      if (arr[i].tomatoTime != undefined) {
        sum = sum + arr[i].tomatoTime
        //console.log(sum)
      }
      //console.log(arr[i].isFinish)
      if (arr[i].isFinish) {
        sum1 = sum1 + 1
        //console.log(sum1)
      }
      else {
        sum2 = sum2 + 1
        //console.log(sum2)
      }
    }
    console.log(sum, sum2, sum1)
    dataList = [sum1,sum2,sum]
    chartData.main.data=dataList
    var windowWidth = 400;
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: chartData.main.categories,
      series: [{
        name: '完成量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) ;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '',
        min: 0
      },
      xAxis: {
        disableGrid: false,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 40
        }
      },
      width: windowWidth,
      height: 500,
    });
  }
});