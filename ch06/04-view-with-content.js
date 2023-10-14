const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/greeting', (req, res) => {
    res.render('greeting', {
        message: 'Hello esteemed programmer!',
        style: req.query.style,
        // userid: req.cookies.userid,
        // username: req.session.username
    })

})

app.listen(port, () => {
    console.log('http://localhost:3000/')
})