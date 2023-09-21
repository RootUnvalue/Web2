//정적 자원(HTML 파일, 이미지 등) 전송하는 서버
//localhost:3000 또는 이외의 모든 URL은 page.html 을 라우팅함
//localhost:3000/img 는 _1.png 를 라우팅함
const http = require('http')
const fs = require("fs")
const port = process.env.PORT||3000

const server = http.createServer((req, res)=>{
    const path = req.url.replace().toLowerCase()
   
    
    if(path == "/img"){
        res.writeHead(200, {'Content-Type':'image/png'})
        fs.readFile(__dirname + '/public/img/_1.png', (err, data) => {
            res.end(data)
        })
    } else {
        res.writeHead(200, {'Content-Type':'text/html'})
        fs.readFile(__dirname + '/public/page.html', (err, data) => {
        res.end(data)
        })
    }
})

server.listen(port, ()=>{
    console.log("서버 실행")
})