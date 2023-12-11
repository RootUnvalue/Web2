const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const cookieSecret = Math.random().toString()
app.use(cookieParser(cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: cookieSecret,
}))

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '04-main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

app.post('/login', (req, res) => {
  req.session.user = { email: req.body.email }
  req.session.authorized = true
  res.redirect('/secret')
})

app.get('/logout', (req, res) => {
  delete req.session.user
  delete req.session.authorized
  res.redirect('/public')
})

app.use((req, res, next) => {
  if(req.session) res.locals.user = req.session.user
  next()
})

function authorize(req, res, next) {
  if(req.session.authorized) return next()
  res.render('not-authorized')
}

app.get('/public', (req, res) => res.render('public'))

app.get('/secret', authorize, (req, res) => res.render('secret'))

app.get('*', (req, res) => res.send('Check out the <a href="/public">public content</a>.'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nnavigate to http://localhost:${port}/public`))
