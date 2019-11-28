'use strict';

/**
 * 设置链接中参数对中key的值为value。
 * @param  {String} key                 链接中参数对的键
 * @param  {String} value               链接中参数对的值
 * @param  {String} [url=location.href] 可选，默认是当前页面的链接
 * @return {String}                     新的链接
 */
function setUrlParam(key, value) {
	var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : location.href;

	var hashIndex = url.indexOf('#');
	var hashString = '';
	var ret = null;
	if (hashIndex > -1) {
		hashString = url.slice(hashIndex);
		url = url.slice(0, hashIndex);
	}
	var reg = new RegExp('(' + key + ')=([^&]*)', 'ig');
	var result = reg.exec(url);
	if (result) {
		ret = url.replace(result[0], key + '=' + value) + hashString;
	} else {
		var _reg = /\?(.*)#?(.*)/gi;
		var search = _reg.exec(url);
		if (search !== null) {
			ret = url.replace(search[1], search[1] + '&' + key + '=' + value) + hashString;
		} else {
			ret = url + '?' + key + '=' + value + hashString;
		}
	}
	return ret;
}

var url = setUrlParam('timestamp', Date.now(), location.href)
new QRCode(document.querySelector('#drawTable'), {
	text: url,
	width: 72,
	height: 72,
	colorDark: "#000000",
	colorLight: "#ffffff",
	correctLevel: QRCode.CorrectLevel.H
});

// 生成 qrcode 是一个异步操作，因此需要等待
function checkQrcodeFinished(callback) {
	var timer = setInterval(function () {
		var isFinished = document.querySelector('#drawTable img')
		if (isFinished) {
			clearInterval(timer)
			callback()
		}
	}, 20);
}

function events() {
	function handleClick() {
		alert(this.textContent || this.innerHTML)
	}

	document.querySelector('#again').addEventListener('click', handleClick, false)
	document.querySelector('#share').addEventListener('click', handleClick, false)

	var offsetTop = document.querySelector('.to-hide').offsetTop
	document.querySelector('.cover').style.top = offsetTop + 'px'
};

document.addEventListener('DOMContentLoaded', events);

checkQrcodeFinished(function () {
	html2canvas(document.querySelector("#capture"), {
		useCORS: true,
		onclone: function(el) {
			el.querySelector('.hide').style.display = 'block'
			return el
		}
	}).then(function (canvas) {
		var img = new Image()
		img.id = 'saveImage'
		img.src = canvas.toDataURL()
		document.querySelector('#capture').style['display'] = 'none'
		document.body.appendChild(img)
	})
})
