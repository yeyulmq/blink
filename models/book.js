import { Http } from '../common/utils/http_promise.js'

class BookModel extends Http {
  getHotList(){ //书籍列表
    return this.request({
      url:"book/hot_list"
    })
  }
  getDetail(bid) {//书的详情
    return this.request({
      url: `book/${bid}/detail`
    })
  }

  getLikeStatus(bid) {//书的点赞状态
    return this.request({
      url: `/book/${bid}/favor`
    })
  }

  getComments(bid) {//书的短评
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postComment(bid, comment) { //写书评发送
    return this.request({
      url: 'book/add/short_comment',
      method: 'POST',
      data: {
        book_id: bid,
        content: comment
      }
    })
  }

  search(start, q) { //搜索书籍
    return this.request({
      url: 'book/search?summary=1',
      data: {
        q: q,
        start: start
      }
    })
  }

  getMyBookCount() { //获取我喜欢的书籍数量
    return this.request({
      url: '/book/favor/count'
    })
  }
}

export { BookModel }