// pages/oneinfo/oneinfo.js
let app = getApp();
let { homeUrl, imgUrl } = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      id:0,
      info:{},
      imgurl:imgUrl,
      userid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  queryOneinfo(){
    let token=wx.getStorageSync('token');
    if(!token){
      wx.showToast({
        title: '请先登录',
        duration:3000,
        success:()=>{
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }
      })
    }
    wx.request({
      url: homeUrl+'wx/info/12',
      method:"get",
      data:{id:this.data.id,userid:this.data.userid},
      header:{token},
      success:(res)=>{
        if(res.data.code==200 && res.data.data){
          this.setData({
            info:res.data.data
          });
        }
      }
    })
  },
  onLoad: function (options) {
    this.data.id = options.id;
    this.data.userid=options.userid;
    this.queryOneinfo();
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})