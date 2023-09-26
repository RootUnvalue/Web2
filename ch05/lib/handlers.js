const fortune = require('./fortune')

exports.home = (req, res) => res.render('home')

exports.about = (req, res) => res.render('about', {fortune : fortune.getFortune()})

exports.notFound = (req, res) => res.render('404')


//익스프레스에서는 매개변수가 모두 할당되어야 작동, 아래와 같이 매개변수 next가 사용되지 않았음에도 두는 이유가 이것이다.
//그렇기 때문에 eslint에서 지적한 no-unused-vars 규칙을 다음에 한하여 비활성화 한다.

/* eslint-disable no-unused-vars */
exports.serverErr = (err, req, res, next) => {
    console.log(err)
    res.render('500')
}
/* eslint-disable no-unused-vars */