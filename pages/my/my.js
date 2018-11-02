import ClassicModel from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

import {
  promisic
} from '../../common/utils/utils.js'

const classicModel = new ClassicModel()
const bookModel = new BookModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },

  onShow(options) {
    this.userAuthorized1() //获取用户信息
    this.getMyBookCount() //获取书籍数量
    this.getMyFavor() //获取喜欢的期刊信息
  },

  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
      })
    })
  },

  getMyBookCount() {
    bookModel.getMyBookCount()
      .then(res => {
        this.setData({
          bookCount: res.count
        })
      })
  },

  userAuthorized1() { //页面显示查看是否授权，若授权显示用户信息
    promisic(wx.getSetting)()
      .then(data => {
        if (data.authSetting['scope.userInfo']) {
          return promisic(wx.getUserInfo)()
        }
        return false
      })
      .then(data => {
        if (!data) return
        this.setData({
          authorized: true,
          userInfo: data.userInfo
        })
      })
  },

  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                authorized: true,
                userInfo: data.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo(event) {//当在授权弹窗确定时，显示用户信息
    const userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        userInfo,
        authorized: true
      })
    }
  },

  onJumpToAbout(event) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },

  onJumpToDetail(event) {
    const cid = event.detail.cid
    const type = event.detail.type
    // wx.navigateTo
    wx.navigateTo({
      url: `/pages/classic-detail/classic-detail?cid=${cid}&type=${type}`
    })
  }

})
