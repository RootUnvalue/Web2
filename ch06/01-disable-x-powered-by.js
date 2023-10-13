//헤더? 라우팅 패스 확인
//By헤더 비활성화
const express = require('express')
const port = process.env.PORT||3000
const app = express()

app.disable('x-powered-by')

app.get('/headers', (req, res) => {
    res.type('text/plain')
    const headers = Object.entries(req.headers).map(([key, value]) => 
        `${key}: ${value}`)
        res.send(headers.join('\n'))
})

app.listen(port, () => {
    console.log(`localhost:${port}`)
})  