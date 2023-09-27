const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT||3000

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use('static file')

app.listen(port, () => {
    console.log(`${port}에서 실행중임`)
})