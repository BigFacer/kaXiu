// let userFun = require('userFun')
const  userFun = require('../component/components')
Page({
  data: {
    startDate:'',
    endDate:'',
    index: 0,
    date: '',
    timeList:[],
    newDate: new Date().getFullYear()+ '-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
  },
  onLoad: function(){
  //  let a = userFun.sevenDate();
   console.log(userFun)
   let aFun = new userFun;
  //  let timeList = aFun.sevenDate();
  console.log(aFun.sevenDate())
   
     this.setData({
       timeList: aFun.sevenDate(),
       date:  this.data.newDate,
       startDate: this.data.newDate,
       endDate: '2021-03-09'
       
     })  
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }
})