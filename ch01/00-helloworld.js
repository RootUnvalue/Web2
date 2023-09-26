const http = require('http');
const port = process.env.port||3000;
const server = http.createServer((req, res) =>{
    res.writeHead(200, {'Context-Type' : 'text/plain'})
    res.end('Hello World')
});

server.listen(port, () => {
    console.log(`server started on port ${port}; `  + 'press Control + z  to terminate...')
})