// pages/uploadPic/uploadPic.js
const app = getApp();
var util = require('../../utils/util.js');
var upFiles = require('../../utils/upFiles.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    upImgArr: [], //存图片
    upFilesBtn: true,
    maxUploadLen: 9,  //限制上传数量
  },

  // 选择图片或者视频
  uploadFiles(e) {
    var that = this,
      type = e.currentTarget.dataset.type,
      maxUploadLen = that.data.maxUploadLen;
    if (type == 'image') {
      upFiles.chooseImage(that, maxUploadLen);
    } else if (type == 'video') {
      upFiles.chooseVideo(that, maxUploadLen);
    }
  },

  // 删除上传图片 或者视频
  delFile(e) {
    let that = this;
    wx.showModal({
      title: '温馨提示',
      content: '您确认要删除这张图片吗？',
      success(res) {
        if (res.confirm) {
          let delNum = e.currentTarget.dataset.index,
            delType = e.currentTarget.dataset.type,
            upImgArr = that.data.upImgArr,
            upVideoArr = that.data.upVideoArr;
          if (delType == 'image') {
            upImgArr.splice(delNum, 1)
            that.setData({
              upImgArr: upImgArr
            })
          } else if (delType == 'video') {
            upVideoArr.splice(delNum, 1)
            that.setData({
              upVideoArr: upVideoArr
            })
          }

          let upFilesArr = upFiles.getPathArr(that);
          if (upFilesArr.length < that.data.maxUploadLen) {
            that.setData({
              upFilesBtn: true,
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  // 预览图片
  previewImg(e) {
    let that = this,
      imgsrc = e.currentTarget.dataset.presrc,
      arr = that.data.upImgArr,
      preArr = [];
    arr.map(function (v, i) {
      preArr.push(v.path)
    })
    //console.log(preArr)
    wx.previewImage({
      current: imgsrc,
      urls: preArr
    })
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