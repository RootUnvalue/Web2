const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverErr)

if(require.main == module){
    app.listen(port, () => console.log(`http://localhost:${port}; ` + `Cotrol Z 를 눌러 서버를 끄세요`))
} else {
    module.exports = app
}
