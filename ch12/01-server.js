const express = require('express')
const expressHandlebars = require('express-handlebars')
const cluster = require('cluster')

const app = express()

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
  }))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
  if(cluster.isWorker)
    console.log(`Worker ${cluster.worker.id} received request`)
  next()
})

app.get('/fail', (req, res) => {
    throw new Error('Nope!')
})

app.get('/epic-fail', (req, res) => {
  process.nextTick(() => {
    throw new Error('Kaboom!')
  })
  res.send('embarrased')
})

app.get('*', (req, res) => res.send('online'))

app.use((err, req, res, next) => {
    console.error(err.message, err.stack)
    res.render('500')
})

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION\n', err.stack);
  process.exit(1)
})

function startServer(port) {
  app.listen(port, function() {
    console.log(`Express started in ${app.get('env')} ` +
      `mode on http://localhost:${port}` +
      `; press Ctrl-C to terminate.`)
  })
}

if(require.main === module) {
  startServer(process.env.PORT || 3000)
} else {
  module.exports = startServer
}