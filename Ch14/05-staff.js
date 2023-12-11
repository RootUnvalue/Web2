const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

const staff = {
  mitch: { name: "Mitch",
    bio: 'Mitch is the man to have at your back in a bar fight.' },
  madeline: { name: "Madeline", bio: 'Madeline is our Oregon expert.' },
  walt: { name: "Walt", bio: 'Walt is our Oregon Coast expert.' },
}

//:name 부분은 라우트 매개변수 -> req.params 객체에 name이 키
app.get('/staff/:name', (req, res, next) => {
  const info = staff[req.params.name]
  if(!info) return next()
  res.render('05-staffer', info)
})

app.get('/staff', (req, res) => {
  res.render('05-staff', { staffUrls: Object.keys(staff).map(key => '/staff/' + key) })
})

app.get('*', (req, res) => res.send('Check out the "<a href="/staff">staff directory</a>".'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nnavigate to http://localhost:${port}/staff`))