const clude = require('wx-server-sdk');
const rp = require('request-promise');
clude.init();
exports.main = async (event, context) => {
  
  const get_options = {

    method: 'GET',
    url:'http://v3.wufazhuce.com:8000/api/channel/one/0/shanghai',
    qs: {},

    json: true

   

  };
  const get_res = await rp(get_options);
  return {get_res}
  // return await rq(url).then((res)=> {
  //   console.log("成功"+res)
  //   return res
  // }).catch((err) => {
  //   console.log('失败')
  //   return '失败'
  // })
}