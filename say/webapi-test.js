var appid = "5a573b3e";
var appkey = "cf998150c6af472aa3d5d2fc6cf4d622";
var url = "https://api.xfyun.cn/v1/aiui/v1/text_semantic";
var time = Math.floor(new Date().getTime() / 1000); // Date.now()
var body = JSON.stringify({
  name: "Hubot",
  login: "hubot"
});
var xp = "eyJzY2VuZSI6Im1haW4iLCAidXNlcmlkIjoidXNlcl8wMDAxIn0=";
var checkSum = md5(appkey + time + xp + body);
$.ajax(url, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    charset: "utf-8",
    "X-Appid": appid,
    "X-CurTime": time,
    "X-Param": xp,
    "X-CheckSum": checkSum,
    "Access-Control-Allow-Origin": "*"
  },
  body: body
})
  .then(json => {
    console.log(JSON.stringify(json));
  })
  .catch(e => {
    console.log(e);
  });
// fetch(url, {
// 	method: 'POST',
// 	credentials: 'include',
// 	headers: {
// 		'Content-Type': 'application/x-www-form-urlencoded',
// 		'charset': 'utf-8',
// 		'X-Appid': appid,
// 		'X-CurTime': time,
// 		'X-Param': xp,
// 		'X-CheckSum': checkSum,
// 		'origin': 'http://api.xfyun.cn'
// 	},
// 	body: body
// }).then(json => {
// 	console.log(json)
// }).catch(e => {
// 	console.log(e)
// })
