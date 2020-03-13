const db = wx.cloud.database();
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    tasks.get().then(res=>{
        console.log(res)
        this.setData({
          todos: res.data
        })
    })
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

})