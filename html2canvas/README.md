## 微信直接分享图片需求

+ [html2canvas](https://html2canvas.hertzen.com/configuration)
+	[CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)
+ [一次 H5 「保存页面为图片」 的踩坑之旅](https://juejin.im/post/5a17c5e26fb9a04527254689)
+ [启用了 CORS 的图片
](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image)
+ [convert-image-into-base64](https://stackoverflow.com/questions/6150289/how-to-convert-image-into-base64-string-using-javascript)


参考 [一次 H5 「保存页面为图片」 的踩坑之旅](https://juejin.im/post/5a17c5e26fb9a04527254689) 可以完成 90% 的工作量

### 3.2.2 图片画出来怎么不见了

**方案一**

>尽管不通过 CORS 就可以在画布中使用图片，但是这会污染画布。一旦画布被污染，你就无法读取其数据。例如，你不能再使用画布的 toBlob(), toDataURL() 或 getImageData() 方法，调用它们会抛出安全错误。

**将图片转换成 base64**

```js
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

toDataURL(
  'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
  function(dataUrl) {
    console.log('RESULT:', dataUrl)
  }
)
```

**方案二**

`html2canvas` 开启 `useCORS`(Whether to attempt to load images from a server using CORS)

```js
html2canvas(document.body, {
  useCORS: true
}).then(function(canvas) {
	let img = new Image()
	img.src = canvas.toDataURL()
	document.body.appenChild(img)
})
```
