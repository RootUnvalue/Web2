const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.get('/rgb',
  (req, res, next) => {
    if(Math.random() > 0.33) return next()
    res.send('red')
  },
  (req, res, next) => {
    if(Math.random() > 0.5) return next()
    res.send('green')
  },
  function(req, res){
    res.send('blue')
  },
)

app.get('*', (req, res) => res.send('Check out the "<a href="/rgb">rgb</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(
  `\nnavigate to http://localhost:${port}/rgb\n` +
  "\n...and try reloading a few times\n"))
