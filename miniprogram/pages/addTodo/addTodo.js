//初始化云数据库
const db = wx.cloud.database();
//初始化实例
const tasks = db.collection('tasks');

Page({
  data: {
    isBe: false,
    nowStatus: false,
    radioRecord: [],
    dateRecord: '',
    inputClear: null,
    radioClear: null,
    isFinish: false,
    isDelete: false
  },

  //输入框获取输入并判断输入是否合法
  _handlerAddTask: function(evt){
    //console.log(evt.detail.value)
    let task = evt.detail.value;
    this.setData({
      isBe: task.length > 0,
    })
    // if(task.length > 0){
    //   this.setData({
    //     isBe: true,
    //   })
    // }
    // else
    // {
    //   this.setData({
    //     isBe: false,
    //   })
    // }
  },

  _radioChange: function(evt){
    //console.log(evt)
    let status = evt.detail.value;
    this.setData({
      radioRecord: status
    })
    if(status === '执行'){
      this.setData({
        nowStatus: true
      })
    }
    else if(status === '项目')
    {
      this.setData({
        nowStatus: true
      })
    }
    else if(status === '等待')
    {
      this.setData({
        nowStatus: true
      })
    }
    else if(status === '未来')
    {
      this.setData({
        nowStatus: true
      })
    }
    else
    {
      nowStatus: false
    }
  },


  onSubmit: function(evt){
    let nowDate = new Date;
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth()+1;
    let day = nowDate.getDay();
    let today = `${year}-${month}-${day}`
    console.log(evt,this.data.radioRecord,today)
    this.setData({
      dateRecord: today
    })
    tasks.add({
      data:{
        title: evt.detail.value.title,
        status: this.data.radioRecord,
        isFinish: this.data.isFinish,
        dateRecord: this.data.dateRecord,
        isDelete: this.data.isDelete
      }
    }).then(res => { 
      console.log(res)
      wx.showToast({
        title: '努力完成💪',
        icon:'success'
      })
    })
    this.setData({
      inputClear: null,
      radioClear: false,
      isBe: false,
      nowStatus: false,
      isDelete: false
    })
   },
})