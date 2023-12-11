const express = require('express')
const app = express()


//처음 요청을 받는 라우터
app.use((req, res, next) => {
    console.log(`processing request for ${req.url}`)
    next()
})

//next() 로 미들웨어 호출됨
app.use((req, res, next) => {
    console.log('terminating request')
    res.send('thanks for playing')
})

//라우팅되지 않음
app.use((rqe, res, next) => {
    console.log(`whoops, I'll neer get called!`)
})

const port = process.env.PORT||3000
app.listen(port, () => {
    console.log(`${port}`)
})