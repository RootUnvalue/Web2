const nodemailer = require('nodemailer')
const credentials = require('./lib/credentails')

const mailTransport = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    auth: {
        user: credentials.sendgrid.user,
        pass: credentials.sendgrid.password,
    },
})

//비동기 함수라서 먼저 보내고 응답이 올때까지 기다리지 않는다.
async function go() {
    try {
        const result = await mailTransport.sendMail({
            //보내는 사람 "" 내부는 이름
            from: '"Meadowlark Travel" <aa@e-mail.com>',
            //받는사람
            to: 'bb@e-mail.com',
            subject: '제목',
            text: '내용',
        })
        console.log('메일을 보냄: ', result)
    } catch(err) {
        console.log('메일을 보낼 수 없음: ', err.message)
    }
}

//함수를 1번 실행하고 종료
go()