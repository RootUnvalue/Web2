const express = require('express')
const app = express()

//라우팅패스에 아무것도 없을 경우 -> 404
app.use((req, res, next) => {
    console.log('\n\nAllways')
    next()
})

//라우팅패스가 /a인 경우
app.get('/a', (rqe, res) => {
    console.log('/a: route terminated')
    res.send('a')
})

//실행x
app.get('/a', (req, res) => {
    console.log('/a: never called')
})

//라우팅패스가 /b인 경우
app.get('/b', (req, res) => {
    console.log('/b: route not terminated')
    next()
})

//미들웨어 실행
app.use((req, res, next) => {
    console.log('SOMETIMES')
    next()
})

//미들웨어 실행 에러(b failed) 만듦
app.get('/b', (req, res, next) => {
    console.log('/b (part 2): error thrown')
    throw new Error('b failed')
})

//next()가 없지만 use로 받았기 때문에 처리됨 next(err) -> 500
app.use('/b', (err, req, res, next) => {
    console.log('/b error detected and passed on')
    next(err)
})

//라우팅패스가 /c인 경우
app.get('/c', (req, res, next) => {
    console.log('/c: error thrown')
    throw new Error('c failed')
})

//next() -> 404
//404인 이유는 서버에러가 아니라 단순히 next()호출, 받을 수 있는 미들웨어가 404밖에 없기 때문.
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