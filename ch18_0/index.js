const https = require('https')
const fs = require('fs')
const port = process.env.PROT||3000
const express = require('express')
const app = express()
const options = {
    key: fs.readFileSync(__dirname + "/ssl/key.pem"),
    cert: fs.readFileSync(__dirname + "/ssl/key.crt")
}

app.use((req, res) => {
    res.send('https test')
})

https.createServer(options, app).listen(port, () => {
    console.log('https 진입')
})

app.listen(app.get(port), () => {
    console.log('http 진입')
})