import { Http } from '../common/utils/http.js'

class ClassicModel extends Http {
  getLatest(sCallback) { //获取最新一期数据
    this.request({
      url: 'classic/latest',
      success: res => {
        this._setLatestIndex(res.index)
        sCallback(res)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res) //初始加载一次，当上一期为最新一期从缓存拿数据
      }
    })
  }

  getPrevOrNext(index,prevOrNext,sCallback){//获取上一期的数据
    let key = prevOrNext == 'next' ?
            this._getKey(index + 1) : this._getKey(index - 1)
    let data = wx.getStorageSync(key)
    if(!data){
      this.request({
        url :"classic/" + index + '/' + prevOrNext,
        success: res => {
          wx.setStorageSync(key,res)
          sCallback(res)
        }
      })
    }else{
      sCallback(data)
    }
    
  }

  isFirst(index){ //是否是第一期，index为1是第一期
    return index == 1 ? true : false;
  }

  isLate(index) { //是否是最新期,获取最新期index保存和当前index对比
    let latestIndex = this._getLatestIndex()
    return latestIndex == index ? true : false
  }

  _setLatestIndex(index) { //最新期刊的index本地存储存放数据
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() { //获取本地缓存数据
    const index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index){
    return "classic-" + index
  }

  getMyFavor(success) { //获取喜欢的期刊信息
    const params = {
      url: 'classic/favor',
      success: success
    }
    this.request(params)
  }
}

export default ClassicModel