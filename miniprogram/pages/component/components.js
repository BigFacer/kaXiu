
class userFun {
  sevenDate() {
    let newDate = new Date()
    let nowTime = newDate.getTime();
    let oneDayTime = 24*60*60*1000;
    let selectDayList = [] 
    for(let i = 0; i< 10; i++){
      if(selectDayList.length >= 7){
        return selectDayList
      }else{
        let showTime = nowTime+ (i+1)*oneDayTime
        let myDate = new Date(showTime);
        let year = myDate.getFullYear();
        let month = myDate.getMonth()+1;
        let day = myDate.getDate();
        let time = year + '-' +  month+ '-' + day
        let str = "星期" + "日一二三四五六".charAt(myDate.getDay())
        if(str != '星期一'){
          selectDayList.push(time+ str)
        }
     
      }
    }
    return selectDayList
  }

}
module.exports = userFun;
