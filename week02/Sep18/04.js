//express-handlebars 를 사용한 서버
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000
const random = require('./lib/random')

app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.get("/random", (req, res) => {
    res.render('random', {randomNumber : random.getNumber()})
})

app.use((req, res) => res.render('default'))

app.listen(port, () => {
    console.log("서버 실행")
})