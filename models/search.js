import { Http } from '../common/utils/http_promise.js'

class Search extends Http{
  key = 'q'      //添加缓存的key
  maxLength = 10 //历史记录最多数量
  getHistory(){ //获取历史搜索
    return wx.getStorageSync(this.key) || []
  
  }
  getHot(){//获取热门搜索
    return this.request({
      url: '/book/hot_keyword'
    })
  }

  addHistory(keyword){//添加历史搜索
    let history = this.getHistory()
    const has = history.includes(keyword)
    if(!has){
      if(history.length >= this.maxLength){
        history.pop()
      }
      history.unshift(keyword)
      wx.setStorageSync(this.key, history)
    }
  }
}

export { Search }