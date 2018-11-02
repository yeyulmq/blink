import ClassicModel from '../../models/classic.js'

import { LikeModel } from '../../models/like.js'

const classicModel = new ClassicModel()
const likeModel = new LikeModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic : {},
    first : false,
    last: true,
    like_status:false,//点赞信息不能缓存，重新定义
    fav_nums:0
  },

  isLike(e){
    let url = e.detail.behavior == "like" ? "like" : "like/cancel"

    likeModel.like(url, this.data.classic.id, this.data.classic.type)
  
  },

  toPrev(){ //上一期数据
    this._updateClassic("previous")
  },
  toNext(){ //上一期数据
    this._updateClassic("next")
  },
  _updateClassic(prevOrNext){
    let index = this.data.classic.index
    classicModel.getPrevOrNext(index,prevOrNext,(res) => {
      this._getLike(res.id,res.type)
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        last: classicModel.isLate(res.index)
      })
    })
  },
  _getLike(id,type,scallback){
    likeModel.getClassicLikeStatus(id,type,(res) => {
      this.setData({
        like_status : res.like_status,
        fav_nums :res.fav_nums
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest( res =>{
      this.setData({
        classic: res,
        like_status : res.like_status,
        fav_nums :res.fav_nums
      })
      console.log(this.data.classic)
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