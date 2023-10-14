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

app.delete('/api/tour/:id', (req, res) => {
    const idx = tours.findIndex(tour => tour.id === parseInt(req.params.id))
    if(idx < 0) return res.json({ error: 'No such tour exists.' })
    tours.splice(idx, 1)
    res.json({ success: true })
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})