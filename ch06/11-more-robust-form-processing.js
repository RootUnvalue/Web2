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
    try {
        if (req.body.simulateError) throw new Error("error saving contact!")
        console.log(`contact from ${req.body.name} <${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/thank-you'),
            'application/json': () => res.json({ success: true })
        })
    } catch(err) {
        console.error(`error processing contact from ${req.body.name} ` + `<${req.body.email}>`)
        res.format({
            'text/html': () => res.redirect(303, '/contact-error'),
            'application/json': () => res.status(500).json({ error: 'error saving contact information' })
        })
    }
})

app.get('/thank-you', (req, res) => {
    res.render('10-thank-you')
})

app.get('contact-error', (req, res) => {
    res.render('08-error')
})

app.use((req, res) => {
    res.render('home')
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})