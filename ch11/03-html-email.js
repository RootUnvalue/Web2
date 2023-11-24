const sgMail = require('@sendgrid/mail')
const credentials = require('./credentials')
const api_key = process.env.SENDGRID_API_KEY || credentials.sendgrid.password
sgMail.setApiKey(api_key)

const msg = {
    from: '"Meadowlark Travel" <aa@e-mail.com>',
    to: ['bb@e-mail.com'],
    subject: 'Your Meadowlark Travel Tour',
    text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
    'We look forward to your visit!',
    html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
    'Meadowlark Travel.  <b>We look forward to your visit!</b>',
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
  