const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.get('/text', (req, res) => {
    res.type('text/plain')
    res.send('text')
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})