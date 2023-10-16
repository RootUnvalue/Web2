const tours = require('./tours')
exports.home = (req, res) => res.render('home', tours.toursContext)
exports.sectionTest = (req, res) => {
    res.locals.title = '웹프로그래밍2'
    res.render('section-test', {test_msg: '이 것은 테스트 메세지 입니다.'})
}

