import {
  Http
} from '../common/utils/http.js'

class LikeModel extends Http {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {//当前期刊的点赞状态
    this.request({
      url: 'classic/' + category + '/' + artID + '/favor',
      success: sCallback
    })
  }

}

export {
  LikeModel
}