const nodemailer = require('nodemailer')
const credentials = require('./lib/credentails')

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.user,
        pass: credentials.sendgrid.password,
    },
})

async function go() {
    try {
        const result = await mailTransport.sendMail({
            from: '"Meadowlark Travel" <aa@e-mail.com>',
            to: 'bb@e-mail.com, cc@e-mail.com',
            subject: '제목',
            text: '내용',
        })
        console.log('메일을 보냄: ', result)
    } catch(err) {
        console.log('메일을 보낼 수 없음: ', err.message)
    }
}

go()