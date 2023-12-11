const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// configure Handlebars view engine
app.engine('handlebars', expressHandlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// provide a home page
app.get('/', (req, res) => res.render('06-home.handlebars'))

const autoViews = {}
const fs = require('fs')
const { promisify } = require('util')
const fileExists = promisify(fs.exists)


//미들웨어가 없지만 view파일이 있는 경우 자동으로 로딩
app.use(async (req, res, next) => {
  const path = req.path.toLowerCase()
  //캐시를 확인 있으면 뷰 렌더링
  if(autoViews[path]) return res.render(autoViews[path])
  //캐시에 없으면 일치하는 뷰 찾고 있다면 렌더링
  if(await fileExists(__dirname + '/views' + path + '.handlebars')) {
    autoViews[path] = path.replace(/^\//, '')
    return res.render(autoViews[path])
  }
  //없는 경우 -> 404
  next()
})
app.use((req,res) => res.render('404'))
app.use((err,req,res) => res.render('500'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nnavigate to http://localhost:${port}/staff`))
