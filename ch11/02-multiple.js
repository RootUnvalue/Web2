const sgMail = require('@sendgrid/mail')
const credentials = require('./credentials')
const api_key = process.env.SENDGRID_API_KEY || credentials.sendgrid.password
sgMail.setApiKey(api_key)

const msg = {
  from: 'aa@e-mail.com',
  to: ['bb@e-mail.com', 'cc@e-mail.com'],
  subject: '제목',
  text: '내용',
  html: '<strong>HTML내용</strong>',
}

sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
