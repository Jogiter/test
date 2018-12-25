function toDataURL(src, callback, outputFormat) {
	var img = new Image();
	img.crossOrigin = 'Anonymous';
	img.onload = function() {
		var canvas = document.createElement('CANVAS');
		var ctx = canvas.getContext('2d');
		var dataURL;
		canvas.height = this.naturalHeight;
		canvas.width = this.naturalWidth;
		ctx.drawImage(this, 0, 0);
		dataURL = canvas.toDataURL(outputFormat);
		callback(dataURL);
	};
	img.src = src;
	if (img.complete || img.complete === undefined) {
		img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
		img.src = src;
	}
}

// 将图片转换成 base64 格式，从而避免 cors 问题
// 所有的图片。 img[src] css 中的 url('') 都需要替换成 base64
function reloadImageToBase64(cb) {
	var $img = document.querySelector('#source')
	var src = $img.getAttribute('src')
	$img.setAttribute('src', toDataURL(src, function(base64) {
		$img.setAttribute('src', base64)
		cb()
	}))
}

function replaceHTMLWithImage(canvas) {
	var img = new Image()
	img.id = 'saveImage'
	img.src = canvas.toDataURL('image/jpeg')
	document.querySelector('#capture').style['display'] = 'none'
	document.body.appendChild(img)
}

function main () {
	reloadImageToBase64(function () {
		html2canvas(document.querySelector("#capture"), {
			allowTaint: true,
			onclone: function(el) {
				console.log(el);
				var url = location.href
				new QRCode(el.querySelector('#drawTable'), {
					text: url,
					width: 120,
					height: 120,
					colorDark : "#000000",
					colorLight : "#ffffff",
					correctLevel : QRCode.CorrectLevel.H
				});

				return el
			}
		}).then(replaceHTMLWithImage)
	})
}

main()
