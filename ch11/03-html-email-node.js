const nodemailer = require('nodemailer')

const credentials = require('./credentials')

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
      to: 'bb@e-mail.com',
      subject: 'Your Meadowlark Travel Tour',
      html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
        'Meadowlark Travel.  <b>We look forward to your visit!</b>',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('메일 전송됨: ', result)
  } catch(err) {
    console.log('메일을 전송할 수 없음: ' + err.message)
  }
}

go()
  