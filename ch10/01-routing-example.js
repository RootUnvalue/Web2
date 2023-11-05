const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log('\n\nAllways')
    next()
})

app.get('/a', (rqe, res) => {
    console.log('/a: route terminated')
    res.send('a')
})

app.get('/a', (req, res) => {
    console.log('/a: never called')
})

app.get('/b', (req, res) => {
    console.log('/b: route not terminated')
    next()
})

app.use((req, res, next) => {
    console.log('SOMETIMES')
    next()
})

app.get('/b', (req, res, next) => {
    console.log('/b (part 2): error thrown')
    throw new Error('b failed')
})

app.use('/b', (err, req, res, next) => {
    console.log('/b error detected and passed on')
    next(err)
})

app.get('/c', (req, res, next) => {
    console.log('/c: error thrown')
    throw new Error('c failed')
})

app.use('/c', (err, req, res, next) => {
    console.log('/c: error detected but not passed on')
    next()
})

app.use((err, req, res, next) => {
    console.log('unbandled error detected: ' + err.message)
    res.send('500 - Server Error')
})

app.use((req, res) => {
    console.log('route not handled')
    res.send('404 - Not Found')
})

const port = process.env.PORT||3000
app.listen(port, () => {
    console.log("진입점")
})