const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT||3000

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/public'))

app.post('/process-contact', (req, res) => {
    console.log(`received contact form ${req.body.name} <${req.body.email}>`)
    res.redirect(303, '10-thank-you')
})

app.get('/10-thank-you', (req, res) => {
    res.render('10-thank-you')
})

app.use((req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})