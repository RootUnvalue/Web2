const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use((req,res) => {
    res.render('home')
})

// app.get('/about', (req,res) => {
//     res.render('about')
// })
app.get('about', (req, res) => res.status(200).render('about'))//같은 문법

app.listen(port, () => {
    console.log('http://localhost:3000/')
})