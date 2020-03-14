const db = wx.cloud.database();
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    changeId:'',
    changeStatus: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取数据库数据
  onLoad: function (options) {
    // tasks.get().then(res=>{
    //     console.log(res)
    //     this.setData({
    //       todos: res.data
    //     })
    // })
    this.getData(res =>{});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  onReachBottom: function(){
    //console.log('event');
    this.getData();

  },

  onPullDownRefresh:function(){
    this.data.todos =[];
    this.pageData.skip =0;
    this.getData(res=>{
      wx.stopPullDownRefresh();
    });
  },
  
  getData: function(callback){
    if(!callback){
      callback = res =>{}
    }
    wx.showLoading({
      title: '获取任务...',
    })
    tasks.skip(this.pageData.skip).get().then(res=>{
      //console.log(res)
      let oldData = this.data.todos;
      this.setData({
        todos: oldData.concat(res.data)
      },res=>{
          this.pageData.skip = this.pageData.skip + 20;
          wx.hideLoading()
        //回调函数为了让刷新的动画加载不会立马停止
        callback();
      })
  })
  },

  pageData: {
    skip:0
  },
  _handlerchange: function(evt){
    console.log(evt.detail.value,evt.currentTarget.dataset.checkid)
    this.setData({
      changeId: evt.currentTarget.dataset.checkid,
      changeStatus: evt.detail.value
    })
    tasks.doc(this.data.changeId).update({
      data:{
        isFinish: this.data.changeStatus
      }
    }).then(res=>{
      console.log(res)
    })
    // wx.cloud.callFunction({
    //   name: "upDate",
    //   data: {

    //   }
    // }).then(res=>{
    //   console.log("数据更新")
    // })
  }
})