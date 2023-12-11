const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const { env } = require('process')

const app = express()
//환경에 따라서 개발환경 -> 로깅x, 실무환경 -> 로깅o
switch(app.get('env')) {
    case 'development':
        app.use(morgan('dev'))
        break
    case 'production':
        const stream = fs.createWriteStream(__dirname + '/access.log',
        { flags: 'a' }
        )
        app.use(morgan('combined', { stream }))
        break
}

app.get('*', (req, res) => {    
    res.send('hello!')
})

const port = process.env.PORT||3000
app.listen(port, () => console.log('Express Started In ' + `${app.get('env')} at http://localhost:${port}`))