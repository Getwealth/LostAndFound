// pages/search/search.js
let app = getApp();
let { homeUrl,  imgUrl } = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    search: {
      searchValue: '',
      showClearBtn: false
    },
    pageNum: 1,
    pageSize: 5,
    hasMoreData: true,
    searchResult: [],
    imgurl:imgUrl
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  //输入内容时
  searchActiveChangeinput: function (e) {
    const val = e.detail.value;
    this.setData({
      'search.showClearBtn': val != '' ? true : false,
      'search.searchValue': val
    })
  },
  //点击清除搜索内容
  searchActiveChangeclear: function (e) {
    this.setData({
      'search.showClearBtn': false,
      'search.searchValue': ''
    })
  },
  //点击聚集时
  focusSearch: function () {
    if (this.data.search.searchValue != '') {
      this.setData({
        'search.showClearBtn': true
      })
    }
  },
  searchSubmit: function () {
    var that = this;
    that.setData({
      searchResult: [],
      hasMoreData: true,
      pageNum: 1
    })
    that.doSearch();
  },
  //搜索提交
  doSearch: function () {
    const val = this.data.search.searchValue;
    if (val) {
      const that = this,
        app = getApp();
      wx.showToast({
        title: '搜索中',
        icon: 'loading'
      });
      wx.request({
        url: homeUrl+'wx/info',
        data: {
          where: val,
          page: that.data.pageNum,
          limit: that.data.pageSize
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
        },
        method: 'get', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          var contentlistTem = that.data.searchResult;
          if (res.data.code == 200) {
            if (that.data.pageNum == 1) {
              contentlistTem = []
            }
            var contentlist = res.data.data;
            if (that.data.pageNum >= res.data.data.total) {
              that.setData({
                searchResult: contentlistTem.concat(contentlist),
                hasMoreData: false,
                'search.showClearBtn': false
              })
            } else {
              that.setData({
                searchResult: contentlistTem.concat(contentlist),
                hasMoreData: true,
                pageNum: that.data.pageNum + 1,
                'search.showClearBtn': false,
              })
            }

          } else {
            wx.showLoading({
              title: res.data.msg,
              mask:true
            });
            setTimeout(function () {
              wx.hideLoading()
            }, 2000)
          }
        },
        fail: function () {
          // fail
          wx.showToast({
            title: '加载数据失败',
            icon: none
          })
        },
        complete: function () {
          // complete
          wx.hideToast();
        }
      })
    }},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.data.pageNum = 1
    this.doSearch()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.hasMoreData) {
      this.doSearch()
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})