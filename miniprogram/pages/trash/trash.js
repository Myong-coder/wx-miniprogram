const db = wx.cloud.database();
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
    delId: ''
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
      title: '更新任务...',
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


  _handlerDel: function(evt){
    console.log(evt.currentTarget.dataset.delid)
    this.setData({
      delId: evt.currentTarget.dataset.delid
    })
    wx.showModal({
      title: '是否删除',
      content: '确定要删除该任务记录吗，删除将无法恢复',
      success: res=> {
        if (res.confirm) {  
          tasks.doc(this.data.delId).remove({
            success: console.log,
            fail: console
            })
          console.log('点击确认回调')
        } else {   
          console.log('点击取消回调')
        }
      }
    })
  },
})