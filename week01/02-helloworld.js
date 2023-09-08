const http = require('http');
const fs = requirt('fs');
const port = process.env.port||3000;

function serverStaticFile(res, path, contentType, responseCode = 200){
    fstat.readFile(__dirname + path, (err, data) => {
        if(err){
            res.writeHead(500, {'contentType' : 'text/plain'});
            return res.end('500 - Internal Error');
        }
        res.writeHead(responseCode, {'contentType' : 'text/plain'});
        res.end(data);
    })
}

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
    switch(path){
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html');
            break;

        case '/about':
            serverStaticFile(res, 'public/about.html', 'text/html');
            break;

        case '/img/logo.img':
            serverStaticFile(res, 'public/img/logo.img', 'image/png');

        default:
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            break;
    }
})

server.listen(port, () => {
    console.log(`server started on port ${port}; `  + 'press Control + z  to terminate...')
})