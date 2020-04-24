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
    isDelete: false,
    rank: '',
    spendTime: '',
    weekDay: '',

    progressValue:'',
    projectStatus:'',
    projectId:'',
    progress:'',
    progressSum:''
  },

  async onLoad(options){
    console.log(options.id)
    let proId = options.id
    await this.setData({
      projectId:proId
    })
    await tasks.where({
      projectId:proId
    }).get().then(res=>{
      this.setData({
        progressValue:res.data.length
      })
    })
    await tasks.where({
      projectId: proId
    }).get().then(res => {
      this.setData({
        progressValue: res.data.length
      })
    })
    await tasks.where({
      projectId:proId,
      isFinish:true,
      isDelete:false
    }).get().then(res=>{
      this.setData({
      progress: res.data.length,
      })
    })
    //console.log((100 / this.data.progressValue) * this.data.progress)
    this.setData({
      progressSum: Math.ceil((100 / this.data.progressValue) * this.data.progress)
    })
  },


  //输入框获取输入并判断输入是否合法
  _handlerAddTask: function (evt) {
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

  _radioChange: function (evt) {
    //console.log(evt)
    let status = evt.detail.value;
    this.setData({
      radioRecord: status
    })
    if (status === '执行') {
      this.setData({
        nowStatus: true
      })
    }
    // else if (status === '项目') {
    //   this.setData({
    //     nowStatus: true
    //   })
    // }
    else if (status === '等待') {
      this.setData({
        nowStatus: true
      })
    }
    else if (status === '未来') {
      this.setData({
        nowStatus: true
      })
    }
    else {
      nowStatus: false
    }
  },


  onSubmit: function (evt) {
    let nowDate = new Date;
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let day = nowDate.getDate();
    let today = `${year}-${month}-${day}`
    let second = Date.now();
    let weekday = nowDate.getDay();
    let progressstatus = 'project'


    console.log(evt, this.data.radioRecord, today)
    this.setData({
      dateRecord: today,
      rank: second,
      weekDay: weekday,
      progressStatus:progressstatus
    })
    tasks.add({
      data: {
        title: evt.detail.value.title,
        status: this.data.radioRecord,
        isFinish: this.data.isFinish,
        dateRecord: this.data.dateRecord,
        isDelete: this.data.isDelete,
        time: this.data.rank,
        spendTime: this.data.spendTime,
        weekDay: this.data.weekDay,
        progressStatus: this.data.progressStatus,
        projectId: this.data.projectId
      }
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: '努力完成💪',
        icon: 'success'
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

  deleteProject:function(evt){
    let proId=this.data.projectId
    // wx.cloud.callFunction({
    //   name: 'delete',
    //   data: {
    //     a:proId
    //   }
    // }).then(res => {
    //   console.log(res)
    //   console.log(proId)
    // })
    wx.showModal({
      title: '删除此项目',
      content: '确定要删除此项目吗，删除后子任务也会同时删除',
      success: res => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'delete',
            data:{
              a:proId
            }
          }).then(res => {
            console.log(res)
            console.log(proId)
          })
          wx.switchTab({
            url: '/pages/index/index',
          })
          console.log('点击确认回调')
        } else {
          console.log('点击取消回调')
        }
      }
    })
  }
})