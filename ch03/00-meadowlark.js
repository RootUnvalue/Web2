const express = require('express')
const app = express()
const port = process.env.port||3000

app.get('/about', (req, res) => {
    res.type('text/plain')
    res.send('About Meadowlark Treavel')
})

app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})

app.use((err, req, res, next) =>{
    console.error(err.message)
    res.status(500)
    res.send('500 - Server Error')
})

app.listen(port, () => console.log(
    `Express started on http:localhost:${port};` + 'press Ctrl C Or if use MacOs, Command Z to terminate.'
))