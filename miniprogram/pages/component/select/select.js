Component({
  properties: {
    options:{
      type: Array,
      value: []
    },
    defaultOption: {
      type: Object,
      value:  {
        id: '000',
        name: '全部城市'
      }
    },
    key: {
      type: String,
      value: 'id'
    },
    text: {
      type: String,
      value: 'name'
    }
  },
  data: {
    result: [],
    isShow: false,
    current: {}
  },
  methods: {
    optionTap(e) {
       let dataset = e.target.dataset
       this.setData({
         current: dataset,
         isShow: false
       })
       this.triggerEvent('change', {...dataset})
    },
    openClose() {
      this.setData({
        isShow: !this.data.isShow
      })
    },
    close() {
      this.setData({
        isShow: false
      })
    }
    
  },
  lifetimes: {
    attached() {
       // 属性名称转换, 如果不是 { id: '', name:'' } 格式，则转为 { id: '', name:'' } 格式
       let resule = []
       if(this.data.key != 'id' || this.data.text != 'name'){
         for(let item of this.data.options) {
           let {[this.data.key]:id, [this.data.text]:name} =   item
           resule.push({id, name})
         }
       }
       this.setData({
         current: Object.assign({}, this.data.defaultOption),
         result: resule
       })
    }
  }
})


{/* <view class="container" bindtap="close">
  <view class="select-wrap">
    <select id="select" options="{{options}}" key="city_id" text="city_name" bind:change="change"></select>
  </view>
</view> */}