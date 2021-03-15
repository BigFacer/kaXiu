const clude = require('wx-server-sdk');
const rq = require('request-promise');
clude.init();
exports.main = async (event, context) => {
  let url = 'http://v3.wufazhuce.com:8000/api/channel/one/0/上海';
  return await rq(url).then((res)=> {
    console.log("成功"+res)
    return res
  }).catch((err) => {
    console.log('失败')
    return '失败'
  })
}