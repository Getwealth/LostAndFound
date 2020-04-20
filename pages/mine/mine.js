// pages/mine/mine.js
let app = getApp();
let {homeUrl}=app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      userinfo:{},
      openid: '',
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      isHide: false,
  },
  primary(){
    this.setData({
      isHide:true
    })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.request({
              url: homeUrl + 'wx/login',
              data: { code: res.code },
              success: (result) => {
                if (result.data.code == 200 && result.data) {
                  this.setData({
                    openid: result.data.openid
                  });
                  let { nickName, avatarUrl, gender, city, province } = e.detail.userInfo;
                  let data = { nickname: nickName, avatarurl: avatarUrl, gender: gender, city: city, province: province, openid: this.data.openid };
                  wx.request({
                    url: homeUrl + 'wx/login',
                    method: 'POST',
                    data: data,
                    dataType: 'json',
                    header: {
                      'content-type': 'application/json',
                      'responseType': 'text'
                    },
                    success: (res) => {
                      if (res.data.code == 200) {
                        wx.setStorageSync('token', res.data.token);
                        app.globalData.userInfo = data;
                        this.setData({
                          userinfo:data
                        });
                      }
                    }
                  })
                  this.setData({
                    isHide: false,
                  });
                }
              }
            })
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        userinfo: app.globalData.userInfo
      });
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