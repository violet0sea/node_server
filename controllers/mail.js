const nodemailer = require('nodemailer');

module.exports = sendMail;

function sendMail() {
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host : 'smtp.163.com',
            port: 465,
            secure: true,
            auth: {
                user : '',
                pass : ''
            }
        });

        let mailOptions = {
            from: 'dudulu <violet0sea@163.com>', // sender address
            to: 'qq <383758774@qq.com>', // list of receivers
            subject: 'hello ✔', // Subject line
            html: '<b>'+ 'mail from node server' +'</b>' // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return console.log(error);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    })
}