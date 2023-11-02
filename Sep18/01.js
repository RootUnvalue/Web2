//항상 "Hello Wolrd" 만을 리턴하는 서버
const http = require("http")
const port = process.env.PORT||3000
const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type":"text/plain"})
    res.end("Hello World")
})

server.listen(port)