const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.get('/custom-layout', (req, res) => {
    res.render('custom-layout', { layout: 'custom' })
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})