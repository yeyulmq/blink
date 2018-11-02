// pages/book-detail/book-detail.js
import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like.js'
const bookModel = new BookModel();
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book :{},//书籍详情
    likeStatus : false,//点赞状态
    likeCount : 0, //点赞数量
    comments :[], //短评

    posting : false //短评输入弹出显示
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading()
    console.log(options.bid)
    const bid = options.bid
    
    // bookModel.getDetail(bid).then(
    //   res => this.setData({
    //     book: res
    //   })
    // )

    // bookModel.getLikeStatus(bid).then(
    //   res => this.setData({
    //     likeStatus: res.like_status,
    //     likeCount : res.fav_nums
    //   })
    // )

    // bookModel.getComments(bid).then(
    //   res => this.setData({
    //     comments: res.comments
    //   })
    // )
    const getDetail = bookModel.getDetail(bid)
    const getLikeStatus = bookModel.getLikeStatus(bid)
    const getComments = bookModel.getComments(bid)
    Promise.all([getDetail, getLikeStatus, getComments])
      .then(res => {
        this.setData({
          book: res[0],
          likeStatus: res[1].like_status,
          likeCount: res[1].fav_nums,
          comments: res[2].comments
        })
        wx.hideLoading()
      })
  },

  onLike(event){
    const like_or_cancel = event.detail.behavior;
    likeModel.like(like_or_cancel,this.data.book.id,400)
  },

  onFakePost(){
    this.setData({
      posting: true
    })
  },

  onPost(event){
    const comment =  event.detail.text || event.detail.value;
    if(!comment){
      return
    }
    if(comment.length > 12){
      wx.showToast({
        title: '短评最多12个字',
        icon:'none'
      })
      return
    }
    bookModel.postComment(this.data.book.id,comment)
    .then(res =>{
      wx.showToast({ //发送成功弹出+1
        title: '+1'
      })
    })
    this.data.comments.unshift({ //this.data.comments头部添加新增的短评
      content : comment,
      nums : 1
    })
    this.setData({ //更新comments,关闭弹窗
      comments : this.data.comments,
      posting:false
    })
  },

  onCancel(){
    this.setData({
      posting : false
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