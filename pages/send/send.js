// pages/send/send.js
let app = getApp();
let { homeUrl, userInfo } = app.globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [],
    idesc:'',
    images: [],
    choose: [{ id: 1, name: '丢失' }, { id: 2, name: '捡还'}],
    ithumbs:"",
    cid:"",
    istate:"",
    tel:"",
    openid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindblur(e){
    this.setData({
      tel:e.detail.value
    })
  },
  textareablur(e){
    this.setData({
      idesc: e.detail.value
    })
  },
  which(e){
    this.setData({
      istate: e.detail.value
    })
  },
  radioChange: function (e) {
    wx.request({
      url: homeUrl+'wx/catelist/1',
      method:"get",
      data: { value: e.detail.value},
      success:(res)=>{
        this.setData({
          cid:res.data.data.cid
        })
      }
    })
  },
  chooseImage(e) {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
      sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        // 限制最多只能留下3张照片
        this.data.images = images.length <= 1 ? images : images.slice(0, 1)
        this.setData({
          images:this.data.images
        })
        wx.uploadFile({
          url: homeUrl+'wx/uploads/upload',
          filePath: res.tempFilePaths[0],
          name: 'file',
          success:(res1)=>{
            let obj = JSON.parse(res1.data);
            obj.data=obj.data.slice(9);
            this.setData({
              ithumbs:obj.data
            });
          }
        })
      }
    })
  },
  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.setData({
      images: this.data.images
    })
  },
  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images
    wx.previewImage({
      current: images[idx],  //当前预览的图片
      urls: images,  //所有要预览的图片
    })
  },
  insert(){
    let token = wx.getStorageSync('token');
    if(!token){
      wx.switchTab({
        url: '/pages/mine/mine',
      })
    }else{
      let { istate, idesc, ithumbs, cid, tel } = this.data;
      if (istate == "" || idesc == "" || cid == "" || tel == "") {
        wx.showToast({
          title: '请填写完整信息',
          icon: 'none',
          duration: 2000
        })
        return false;
      } else {
        let data = { istate: istate, idesc: idesc, ithumbs: ithumbs, cid: cid, tell: tel };
        wx.request({
          url: homeUrl + 'wx/info',
          method: "post",
          data: data,
          header: { token },
          success: (res) => {
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }
    }
    
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  catelistQuery(){
    wx.request({
      url: homeUrl+'wx/catelist',
      method:"get",
      success:(res)=>{
        this.setData({
          items:res.data.data
        });
      }
    })
  },
  onLoad: function (options) {
      this.catelistQuery();
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