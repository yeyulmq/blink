// components/search/index.js
import { Search } from '../../models/search.js'
import { BookModel } from '../../models/book.js'
import { paginationBev } from '../behaviors/pagination.js'
const search = new Search()
const bookModel = new BookModel()
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[paginationBev],
  properties: {
    
    more :{ //触发加载更多，由页面下拉事件传递
      type : String,
      observer:"loadMore"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    historyWords : [],
    hotWords : [],
    searching: false, //搜索结果页显示
    keyword:'', //搜索关键词
    loadingCenter:false
    
  },

  attached(){
    const historyWords = search.getHistory()
    this.setData({
      historyWords
    })
    search.getHot().then(
      res => {
        this.setData({
          hotWords : res.hot
        })
      }
    )
  },
  /**
   * 组件的方法列表
   */
  methods: {
    loadMore(){
      if(!this.data.keyword){
        return
      }
      if(this.isLocked()){
        return
      }
      if(this.hasMore()){
        this.locked()
        bookModel.search(this.getCurrentStart(),this.data.keyword).then(
          res => {
            this.setMoreData(res.books)
            this.unLocked()
          },
          () =>{this.unLocked()}
        )
      }
    
    },
    onCancel(){
      this.initialize()
      this.triggerEvent('onCancel', {}, {})
    },
    onConfirm (event){
      this.setData({
        searching : true
      })
      this._showLoadingCenter()
      const q = event.detail.value || event.detail.text
      this.setData({
        keyword : q
      })
      bookModel.search(0,q).then(
        res => {
          this.setMoreData(res.books)
          this.setTotal(res.total)
          search.addHistory(q)
          this._hideLoadingCenter()
        }
      )
      

    },
    onDelete(){
      this.initialize()
      this.setData({
        searching:false,
        keyword : ""
      })
      
    },
    _showLoadingCenter(){
      this.setData({
        loadingCenter :true
      })
    },
    _hideLoadingCenter(){
      this.setData({
        loadingCenter:false
      })
    }
  },
  
})
