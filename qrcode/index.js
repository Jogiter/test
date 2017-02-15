var $ = function(e) {
    return document.querySelector(e);
};

$('.btn').onclick = function() {
    var value = $('#txt').value;
    value = value.replace(/(^\s*)|(\s*$)/g, '');
    if (!value) {
        alert('请输入二维码内容！');
        return ;
    }
    $('#result').innerHTML = '';
    var qrcode = new QRCode($('#result'), {
        text: value,
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
};
