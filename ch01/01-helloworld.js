const http = require('http');
const port = process.env.port||3000;

const server = http.createServer((req, res) => {
    const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case '':
            res.writeHead(200, {'Content-Type' : 'text/plain'});
            res.end('Hompage');
            break;

        case '/about':
            res.writeHead(200, {'Content-Type' : 'text/plain'});
            res.end('About');
            break;

        default:
            res.writeHead(404, {'Content-Type' : 'text/plain'});
            res.end('Not Found');
            break;
    }
})

server.listen(port, () => {
    console.log(`server started on port ${port}; `  + 'press Control + z  to terminate...')
})