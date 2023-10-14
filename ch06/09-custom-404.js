const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.use((req, res) => {
    res.status(500).render('404')
})



app.listen(port, () => {
    console.log("http://localhost:3000/")
})