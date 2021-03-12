// let userFun = require('userFun')
const  userFun = require('../component/components')
Page({
  data: {
    startDate:'',
    endDate:'',
    index: 0,
    date: '',
    monNub: '3',
    timeList:[],
    showTimeList: [],
    selectDayArray: [{
      "id": "0",
      "value": "上午"
  }, {
      "id": "1",
      "value": "下午"
  }],
    newDate: new Date().getFullYear()+ '-'+(new Date().getMonth()+1)+'-'+new Date().getDate()
  },
  onLoad: function(){
 
   let aFun = new userFun;
   let timeList = aFun.sevenDate();
   let changeTimeList = [];
  
  for(let i in timeList){
    console.log(timeList[i])
    let b = timeList[i].split('星');
    changeTimeList.push({
      value: timeList[i],
      id: b[0],
      day: '星'+b[1]
    
    })
  
  }
 this.setData({
       timeList: aFun.sevenDate(),
       showTimeList: changeTimeList,
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
  },
  getTime: function(e) {
    console.log(e)
  }
})