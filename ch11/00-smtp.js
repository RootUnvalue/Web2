const express = require('express')
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
        from: '"보내는 사람" <aa@e-mail.com>',
        to: 'bb@e-mail.com',
        subject: '이메일 제목',
        text: '내용'
    })
} catch(err) {
    console.log('이메일 전송 불가\n오류 내용:' + err.message)
}

app.listen(port, ()=> {
    console.log(`http://localhost:${port}/`)
})