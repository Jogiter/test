[nodeMailer](https://github.com/nodemailer/nodemailer)
======================================================

Send e-mails with Node.JS – easy as cake!

```js
'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gmail.user@gmail.com',
        pass: 'yourpass'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo ��" <foo@blurdybloop.com>', // sender address
    to: 'bar@blurdybloop.com, baz@blurdybloop.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});
```

> [pass应该填**客户端授权密码**而非你的邮件账户密码](https://cnodejs.org/topic/55b78babf30671210b35fa31)

-	[services.json](https://github.com/nodemailer/nodemailer-wellknown/blob/master/services.json#L125)
