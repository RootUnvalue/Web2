const express = require('express')
const app = express()
const port = process.env.PORT||3000

app.use((req, res, next) => {
    console.log(`processing request for ${req.url}`)
    next()
})

app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing')
})

app.use((rqe, res, next) => {
    console.log(`whoops, I'll neer get called!`)
})

app.listen(port, () => {
    console.log(`${port}`)
})