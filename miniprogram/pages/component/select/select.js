Component({
  properties: {
    propArray:{
      type: Array
    }
    
  },
  data: {
      selectShow: false,
      nowText: "请选择",
      animationData: {}
  },
  methods: {
    selectToggle: function() {
      let nowShow = this.data.selectShow;
      let animation = wx.createAnimation({
        timingFunction: 'ease'
      })
      this.animation = animation;
      if(nowShow){
        animation.rotate(0).step();
        this.setData({
          animationData: animation.export()
        })
      }else{
        animation.rotate(180).step();
        this.setData({
            animationData: animation.export()
        })
      }
      this.setData({
        selectShow: !nowShow
      })
    },
    setText: function(e) {
      let nowData = this.properties.propArray;
      let nowIdx = e.target.dataset.index;//当前点击的索引
      let nowText = nowData[nowIdx].value;//当前点击的内容;
      let nowId = nowData[nowIdx].id
      this.animation.rotate(0).step();
      this.setData({
        selectShow: false,
        nowText: nowText,
        animationData: this.animation.export()
      })
      this.triggerEvent("time",nowId)

    }
  }

})