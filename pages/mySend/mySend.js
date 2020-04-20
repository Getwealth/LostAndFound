// pages/mySend/mySend.js
let app = getApp();
let { homeUrl, imgUrl, userInfo} = app.globalData;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mySends:[],
    limit:10,
    page:0,
    total:0,
    where:"",
    imgurl:imgUrl,
    flag:false
  },
  ifinished(e){
    this.setData({
      flag:e.detail.value
    });
    let id = e.currentTarget.id;
    let finish=0;
    if(e.detail.value){
      finish=1;
    }else{
      finish = 2;
    }
    let token = wx.getStorageSync('token');
    wx.request({
      url: homeUrl+'wx/mysend',
      method:"post",
      data:{id:id,isfinished:finish},
      header:{
        token
      },
      success:(res)=>{
        if(res.data.code==200){
          let newArr = this.data.mySends.map(ele => {
            if (ele.id == id) {
              ele.isfinished = ele.isfinished == 1 ? 2 : 1;
            }
            return ele;
          })
          this.setData({
            mySends: newArr
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  mySendquery() {
    let pages = ++this.data.page;
    let token = wx.getStorageSync('token');
    wx.showLoading({
      title: '正在加载',
      mask: true
    });
    this.setData({ page: pages })
    let { page, limit} = this.data;
    wx.request({
      url: homeUrl + 'wx/mysend',
      data: {
        page, limit
      },
      dataType: 'json',
      header: {
        'content-type': 'application/json',
        'responseType': 'text',
         token
      },
      success: (res) => {
        if (this.data.total && this.data.mySends.length >= this.data.total) {
          return false;
        }
        wx.stopPullDownRefresh();
        if (res.data.code == 200 && res.data.data) {
          let data = res.data.data.map(ele => Object.assign({}, ele, { ithumbs: ele.ithumbs.replace('\\', '/') }));
          this.data.mySends.push(...data);
          this.setData({
            mySends: this.data.mySends,
            total: res.data.total
          });
        } else if (res.data.code == 401){
          wx.showToast({
            title: '请先登录',
            icon:'none',
            duration:3000,
            mask:true
          });
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }
      },
      complete: () => {
        wx.hideLoading();
      }
    })
  },
  onLoad: function (options) {
      this.data.where = options.userid;
      this.mySendquery();
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
    this.setData({
      page: 0,
      mySends: [],
      total: 0
    });
    this.mySendquery();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.mySendquery();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})