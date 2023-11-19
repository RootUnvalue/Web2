const express = require('express')
const expressHandlebars = rquire('express-handlebars')
const nodemailer = rquire('nodemailer')
const app = express()
const port = process.env.PORT||3000

const mailTransport = nodemailer.createTransport({
    auth: {
        user: credentials.sendgrid.user,
        pass: credentials.sendgrid.password,
    }
})

try {
    const result = await mailTransport.sendMain({
        from: '관심좌 <mls1218@naver.com>',
        to: 'min24rcy@gmail.com',
        subject: '대충 이메일 제목(스팸아님)',
        text: '고맙소 동무! I\'m 신뢰에요!'
    })
} catch(err) {
    console.log('이메일 전송 불가\n' + err.message)
}

app.listen(port, ()=> {
    console.log(`http://localhost:${port}/`)
})