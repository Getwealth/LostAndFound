// pages/login/login.js
let app = getApp();
let {homeUrl,userInfo,imgUrl} = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userimg:'',
    infos:[],
    page: 0,
    limit: 5,
    total: 0,
    where:0,
    imgurl:imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  infoQuery(){
    let pages = ++this.data.page;
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    this.setData({ page: pages })
    let { page, limit,where  } = this.data;
    wx.request({
      url: homeUrl + 'wx/info',
      data: {
        page, limit, where 
      },
      dataType: 'json',
      header: {
        'content-type': 'application/json',
        'responseType': 'text'
      },
      success: (res) => {
        if (this.data.total && this.data.infos.length >= this.data.total) {
          return false;
        }
        wx.stopPullDownRefresh();
        if (res.data.code == 200 && res.data.data) {
          let data = res.data.data.map(ele => Object.assign({}, ele, { ithumbs: ele.ithumbs.replace('\\', '/') }));
          this.data.infos.push(...data);
          this.setData({
            infos: this.data.infos,
            total: res.data.total
          });
          
        }
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },
  all(){
    this.setData({
      infos:[],
      where:0,
      page: 0,
      limit: 5,
      total: 0,
    })
    this.infoQuery();
  },
  lose(){
    this.setData({
      infos: [],
      where:1,
      page: 0,
      limit: 5,
      total: 0,
    });
    this.infoQuery();
  },
  found() {
    this.setData({
      infos: [],
      where: 2,
      page: 0,
      limit: 5,
      total: 0,
    });
    this.infoQuery();
  },
  onLoad: function (options) {
      // 查看是否授权
    // wx.getSetting({
    //   success: (res) =>{
    //     if (res.authSetting['scope.userInfo']) {
    //       wx.getUserInfo({
    //         success:  (res)=> {
    //           wx.login({
    //             success: res => {
    //               if(res.code){
    //                 wx.request({
    //                   url: homeUrl + 'wx/login',
    //                   data: { code: res.code },
    //                   success: (result) => {
    //                     if (result.data.code == 200 && result.data) {
    //                       this.setData({
    //                         openid: result.data.openid
    //                       });
              
    //                     }
    //                   }
    //                 })
    //               }
    //             }
    //           });
    //         }
    //       });
    //     } else {
    //       this.setData({
    //         isHide: true,
    //       });
    //     }
    //   }
    // });
    
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
    this.infoQuery();
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
    this.setData({
      page: 0,
      infos: [],
      total: 0
    });
    this.infoQuery();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.infoQuery();
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})