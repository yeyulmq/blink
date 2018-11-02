// components/classic/music/index.js
import { classicBeh } from '../component_behavior.js'

const mMgr = wx.getBackgroundAudioManager() //bgm接口方法
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src:String
  },

  /**
   * 组件的初始数据
   */
  data: {
    playing:false,
    playImage : "images/player@play.png",
    pauseImage : "images/player@pause.png"
  },

  attached(event) {
    // 跳转页面 当前 切换
    this._recoverStatus()
    this._monitorSwitch()
  },

  detached: function (event) {
    // wx:if hidden
    // mMgr.stop()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap(event){
      console.log(this.properties.src)
      if(!this.data.playing){
        this.setData({
          playing:true
        })
        mMgr.src = this.properties.src
      }else{
        this.setData({
          playing:false
        })
        mMgr.pause()
      }
    },

    _recoverStatus: function () {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (mMgr.src == this.properties.src) {
        this.setData({
          playing: true
        })
      }
    },

    _monitorSwitch: function () {
      mMgr.onPlay(() => {
        this._recoverStatus()
      })
      mMgr.onPause(() => {
        this._recoverStatus()
      })
      mMgr.onStop(() => {
        this._recoverStatus()
      })
      mMgr.onEnded(() => {
        this._recoverStatus()
      })
    }
  }
})
