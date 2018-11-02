// components/nav/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title :String,
    first :Boolean, //是否是最后一期
    last : Boolean //是否是最新一期，最新的上一个为空disabled
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeft:"images/triangle.dis@left.png",
    left: "images/triangle@left.png",
    disRight: "images/triangle.dis@right.png",
    right:"images/triangle@right.png"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft(){
      !this.properties.last && this.triggerEvent("toLeft",{},{})
    },
    onRight(){
      !this.properties.first && this.triggerEvent("toRight",{},{})
    }
  }
})
