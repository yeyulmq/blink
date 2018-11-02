// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isLike:{
      type: Boolean,
      value:false
    },
    count:{
      type:Number,
      value:0
    },
    readOnly:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesImage:"images/like.png",
    noImage:"images/like@dis.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike(){
      if(this.properties.readOnly){
        return
      }
      let Like = this.properties.isLike;
      let count = this.properties.count;
      count = Like ? count -1 : count +1;
      this.setData({
        isLike:!Like,
        count
      })
      let behavior = this.properties.isLike ? "like" : "cancal";
      this.triggerEvent("like",{
        behavior
      },{})
    }
  }
})
