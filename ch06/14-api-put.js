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

app.put('/api/tour/:id', (req, res) => {
    const p = tours.find(p => p.id === parseInt(req.params.id))
    if(!p) return res.status(404).json({ error: ' No such tour exists' })
    if(req.body.name) p.name = req.body.name
    if(req.body.price) p.price = req.body.price
    res.json({ success: true })
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})