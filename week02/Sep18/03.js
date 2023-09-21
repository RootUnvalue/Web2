//02.js와 같은 기능을 하는 express 코드.
const express = require("express")
const app = express()
const port = process.env.PORT||3000

app.get('/img', (req, res) => {
    res.type('image/png')
    res.sendFile(__dirname + '/public/img/_1.png')
})

app.use((req, res) => {
    res.type('text/plain')
    res.send('Main Page')
})

app.listen(port, () => console.log("서버 실행"))