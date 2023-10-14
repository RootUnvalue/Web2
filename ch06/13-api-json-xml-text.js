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

app.get('/api/tours', (req, res) => {
    const toursXML = '<?xlm version="1.0"?><tours>' + tours.map(p => `<tour price="{${p.id}}" id="${p.id}">${p.name}</tour>`).join('') + '</tours>'
    const toursText = tours.map(p => `${p.id}: ${p.name} (${p.price})`).join('\n')
    res.format({
        'application/json': () => res.json(tours),
        'application/xml': () => res.type('text/xml').send(toursXML),
        'text/xml': ()=> res.type('text/xml').send(toursXML),
        'text/plain': () => res.type('text/plain').send(toursXML)
    })
})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})