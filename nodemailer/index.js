var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: 'user@163.com',
        pass: 'pass'
    }
});
var mailOptions = {
    from: 'jogiter@163.com', // sender address
    to: 'jogiter@163.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};
transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: ' + info.response);
    }
});
