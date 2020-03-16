// pages/detail/detail.js
const db = wx.cloud.database()
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    todos: {},
    detailId: '',
    creatTime: '',
    getDate: ''
  },
  
  pageData: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options){
    //console.log(options)
    this.pageData.id = options.id
    console.log(this.pageData)
    this.setData({
      detailId: options.id,
    })
    let res = await tasks.doc(options.id).get()
    // tasks.doc(options.id).get().then(res=>{
      console.log(res)
      this.setData({
        todos: res.data,
        creatTime: new Date(res.data.time)
       })
    // })
    let creatDate = this.data.creatTime;
    console.log(creatDate)
    /**
     * 
     */
    // this.setData({
    //   getDate: creatDate
    // })
    // console.log(typeof(creatDate))
    // console.log(creatDate)
    let year = creatDate.getFullYear();
    // console.log(year)
    let month = creatDate.getMonth()+1;
    // console.log(month)
    let day = creatDate.getDate();
    // console.log(day)
    let h = creatDate.getHours();
    // console.log(h)
    let m = creatDate.getMinutes();
    // console.log(m)
    this.setData({
      getDate: `${year}-${month}-${day}  ${h}:${m}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onChange: function(){
    wx.showActionSheet({
      itemList: ['执行', '项目', '等待','未来'],
      success: (res)=> {
        console.log(res.tapIndex)
        switch (res.tapIndex) {
          case 0:
            tasks.doc(this.data.detailId).update({
              data: {
                status: '执行'
              }
            }).then(res=>{
              console.log(res)
              wx.showToast({
                title: '更改成功',
                icon:'success'
              })
              this.onPullDownRefresh()
            })
            break;
          case 1:
            tasks.doc(this.data.detailId).update({
              data: {
                status: '项目'
              }
            }).then(res=>{
              console.log(res)
              wx.showToast({
                title: '更改成功',
                icon:'success'
              })
              this.onPullDownRefresh()
            })
            break;
          case 2:
            tasks.doc(this.data.detailId).update({
              data: {
                status: '等待'
              }
            }).then(res=>{
              console.log(res)
              wx.showToast({
                title: '更改成功',
                icon:'success'
              })
              this.onPullDownRefresh()
            })
            break;
          case 3:
            tasks.doc(this.data.detailId).update({
              data: {
                status: '未来'
              }
            }).then(res=>{
              console.log(res)
              wx.showToast({
                title: '更改成功',
                icon:'success'
              })
              this.onPullDownRefresh()
            })
            break;
          default:
            break;
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },

  onPullDownRefresh:function(){
    tasks.doc(this.data.detailId).get().then(res=>{
      console.log(res)
      this.setData({
        todos: res.data
      })
      succecc: wx.stopPullDownRefresh();
    })
  },
})