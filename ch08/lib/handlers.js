const tours = require('./tours')
exports.api = {}

exports.home = (req, res) => res.render('home', tours.toursContext)
exports.sectionTest = (req, res) => {
    res.locals.title = '웹프로그래밍2'
    res.render('section-test', {test_msg: '테스트 메세지 입니다.'})
}

exports.newsletter = (req, res) => {
    // we will learn about CSRF later...for now, we just
    // provide a dummy value
    res.render('newsletter', { csrf: 'CSRF token goes here' })
}

exports.newsletterSignup = (req, res) => {
    res.render('newsletter-signup', { csrf: 'CSRF token goes here' })
}

exports.api.newsletterSignup = (req, res) => {
    console.log('CSRF token (from hidden form field): ' + req.body._csrf)
    console.log('Name (from visible form field): ' + req.body.name)
    console.log('Email (from visible form field): ' + req.body.email)
    res.send({ result: 'success' })
}

exports.newsletterSignupProcess = (req, res) => {
    console.log('Form (form querystring): ' + req.query.form)
    console.log('CSRF token (form hidden form field): ' + req.body._csrf)
    console.log('Name (form visible form field: ' + req.body.name)
    console.log('Email (form visible form field): ' + req.body.email)
    res.redirect(303, '/newsletter-signup/thank-you')
}

exports.vacationPhotoContest = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestAjax = (req, res) => {
    const now = new Date()
    res.render('contest/vacation-photo-ajax', { year: now.getFullYear(), month: now.getMonth() })
}

exports.vacationPhotoContestProcess = (req, res, fields, files) => {
    console.log('field data: ', fields)
    console.log('files: ', files)
    // files.path('/data/')
    res.redirect(303, '/contest/vacation-photo-thank-you')
}

exports.api.vacationPhotoContest = (req, res, fields, files) => {
    console.log('field data[ajax]: ', fields)
    console.log('files[ajax]: ', files)
    files.path('/data/')
    res.send({ result: 'success' })
}

exports.vacationPhotoContestProcessThankYou = (req, res) => {
    res.render('contest/vacation-photo-thank-you')
}

exports.newsletterSignupThankYou = (req, res) => {
    res.render('newsletter-signup-thank-you')
}