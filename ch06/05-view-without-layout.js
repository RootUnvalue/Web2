const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.get('/no-layout', (req, res) => {
    res.render('no-layout', { layout: null })
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})