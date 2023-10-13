//express.get 기본적인 사용법
const express = require('express')
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000
const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.get('/about', (req, res) => {
    res.render('about')
})

app.listen(port, () => {
    console.log(`localhost:${port}`)
})  