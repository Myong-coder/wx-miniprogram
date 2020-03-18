import * as echarts from '../../ec-canvas/echarts';

let chart = null;

const db = wx.cloud.database()
const tasks = db.collection('tasks')
var dataList1 = []
var dataList2 = []
var dataList3 = []
Page({
  data: {
    todos: [],
    ec: {
      onInit: initChart,
      //lazyLoad: true
    }
  },
  onLoad: function (options) {
    this.echartsComponent = this.selectComponent('#mychart')
    this.getData();
  },

  getData: function () {
    tasks.get().then(res => {
      //console.log("全部数据:",res.data)
      this.setData({
        todos: res.data
      })
      console.log(this.data.todos[0].tomatoTime)
    })
    let sum = 0
    let sum1 = 0
    let sum2 = 0
    var arr = this.data.todos;
    console.log(arr)
    console.log(arr.length)
    for (let i = 0; i < arr.length; i++) {
      console.log(arr[i].tomatoTime)
      sum = sum + arr[i].tomatoTime
      console.log(sum)
      console.log(arr.isFinish)
      if (arr.isFinish === true) {
        sum1 = sum1 + 1
        console.log(sum1)
      }
      else {
        sum2 = sum2 + 1
        console.log(sum2)
      }
    }
    dataList1 = [10]
    dataList2 = [20]
    dataList3 = [30]
    //console.log(dataList1,dataList2,dataList3)
  },

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      //console.log(chart)
    }, 2000);
  }
});

function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option = {
    color: ['#37a2da', '#32c5e9', '#67e0e3'],
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['番茄记录', '完成', '未完成']
    },
    grid: {
      left: 20,
      right: 20,
      bottom: 15,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: ['任务记录'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {
        name: '番茄记录',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: dataList1,
        itemStyle: {
          // emphasis: {
          //   color: '#37a2da'
          // }
        }
      },
      {
        name: '完成',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: dataList2,
        itemStyle: {
          // emphasis: {
          //   color: '#32c5e9'
          // }
        }
      },
      {
        name: '未完成',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: dataList3,
        itemStyle: {
          // emphasis: {
          //   color: '#67e0e3'
          // }
        }
      }
    ]
  };

  chart.setOption(option);
  return chart;
}



