const express = require('express')
const app = express()
const expressHandlebars = require('express-handlebars')
const port = process.env.PORT||3000

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')

app.use((err, req, res, next) => {
    console.error('**SERVER ERROR **' + err.message)
    res.stauts(500).render('08-error', { message: "you shouldn't have clicked that!" })

})

app.listen(port, () => {
    console.log("http://localhost:3000/")
})