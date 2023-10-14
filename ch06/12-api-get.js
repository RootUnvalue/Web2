const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT||3000

const tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id:1, name: 'Oregon Coast', price: 149.95 }
]

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/api/tours', (req, res) => res.json(tours))

app.listen(port, () => {
    console.log("http://localhost:3000/")
})