const express = require('express')
const expresshandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const handlers = require('./lib/handlers.js')
const weatherMiddleware = require('./lib/middleware/weather.js')

app.engine('handlebars', expresshandlebars.engine({
    // extname: 'hbs', //handlebars 파일의 확장자를 hbs로 변경
    defaultLayout: 'main',
    //기존 레이아웃을 수정하고 싶은 경우 helper 사용
    helpers: {
        section: function(name, options) {
            console.log('name = '+name)
            console.log('options = ' + options)
            if(!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            // console.log('this._sections[name] = '+this._sections[name])
            return null
        },
    },
}))

app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + 'node_modules/bootstrap/dist'))
app.use(express.static(__dirname + 'node_modules/jquery/dist'))
app.use(express.static(__dirname + 'node_modules/popper.js/dist'))

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use(bodyParser.urlencoded({ extended: true })) //POST 사용시 URL로 인코드된 바디를 분석하는 미들웨어 필요

app.use(weatherMiddleware)

app.get('/', handlers.home)

app.get('/newsletter-signup', handlers.newsletterSignup)

app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)

app.get('/newsletter-signup/thank-you',  handlers.newsletterSignupThankYou)

app.get('/newsletter', handlers.newsletter)

app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

app.get('/contest/vacation-photo', handlers.vacationPhotoContest)

app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)

app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
    console.log('got fields: ', fields)
    console.log('and files: ', files)
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })

})

app.get('/contest/vacation-photo-thank-you', handlers.vacationPhotoContestProcessThankYou)

app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.api.vacationPhotoContestError(req, res, err.message)
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})

app.get('/section-test', handlers.sectionTest)

app.listen(port, () => {
    console.log("http://localhost:3000/")
})