const axios = require("axios");
const Base64 = require("js-base64").Base64;
const md5 = require("blueimp-md5");

// https://doc.xfyun.cn/rest_api/%E8%AF%AD%E9%9F%B3%E5%90%88%E6%88%90.html
const apiKey = "32471f55f2675d9c02e2105c983d28d3";
const appId = "5b4d620f";

// * x-param 处理
function getbase64(n) {
  return Base64.encode(JSON.stringify(n).replace(/\:/gi, ": "));
}

function post(url, header, data) {
  let time = Math.floor(Date.now() / 1000) + "";
  let xhrs = {
    method: "POST",
    url,
    headers: {
      "X-Appid": appId,
      "X-CurTime": time,
      "X-Param": getbase64(header),
      "X-CheckSum": md5(apiKey + time + getbase64(header)),
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    },
    data: data
  };
  // console.log(xhrs);
  return axios(xhrs);
}

let url = "http://api.xfyun.cn/v1/service/v1/tts";
let header = {
  auf: "audio/L16;rate=16000",
  aue: "raw",
  voice_name: "xiaoyan",
  speed: "50",
  volume: "50",
  pitch: "50",
  engine_type: "intp65",
  text_type: "text"
};

post(url, header, {
  text: "如何播放二进制音频"
})
  .then(res => {
    console.log(res.data);
    // 如何播放二进制音频
    // let url = URL.createObjectURL(new Blob([res], {type: 'audio/mpeg'}))
    //
    // let ad = document.createElement('audio')
    // ad.src = url
    // ad.play()
    // document.body.append(ad)
  })
  .catch(e => {
    console.log(e);
  });
