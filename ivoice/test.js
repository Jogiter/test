const axios = require('axios')
const Base64 = require('js-base64').Base64
const md5 = require('blueimp-md5')

axios({
	method: 'post',
	url: './static/7-years.mp3',
	// headers: {
	// 	"X-Appid": "5ab0686d",
  //   "X-CurTime": 1532051115,
  //   "X-Param": "eyJhdWYiOiJhdWRpby9MMTY7cmF0ZT0xNjAwMCIsImF1ZSI6ImxhbWUiLCJ2b2ljZV9uYW1lIjoieGlhb3lhbiJ9",
  //   "X-CheckSum": "45d55f7a8bf5a544a331adcba3128601",
  //   "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
	// },
	// "data": {
  //   "text": "科大讯飞是中国最大的智能语音技术提供商"
  // }
}).then(res => {
	console.log(res);
}).catch(e => {
	// time out|illegal X-CurTime
	console.log(e);
})
