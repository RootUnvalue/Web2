const express = require('express')
const expressHandlebars = require('express-handlebars')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const cartValidation = require('./lib/cartValidation')

const app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//쿠키 시크릿 설정(난수)
const secret = String(Math.random())
app.use(cookieParser(secret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret,
}))

app.engine('handlebars', expressHandlebars.engine({
  defaultLayout: 'main',
}))
app.set('view engine', 'handlebars')

const products = [
    { id: 'TRAVEL0001', name: '벨베데레 궁전', price: 239.95, maxGuests: 2 },
    { id: 'TRAVEL0006', name: '베르사유 궁전', price: 89.95, maxGuests: 6 },
    { id: 'TRAVEL0002', name: '가야의 유산', price: 159.95, maxGuests: 4 },
    { id: 'TRAVEL0012', name: '프랑스 와인의 명가', price: 229.95, maxGuests: 30 },
    { id: 'TRAVEL003', name: '인제대학교 학과 체험', price: 22.95, maxGuests: 3 },
    { id: 'TRAVEL004', name: '제주 수중동굴', price: 22.95, maxGuests: 2, requiresWaiver: true },
]
//object.reduce() 배열을 누적해 더함
//object.assign('타겟', '소스') 함수는 '소스'로 부터 속성을 가져와 '타겟'에 붙여넣음
const productsById = products.reduce((byId, p) => Object.assign(byId, { [p.id]: p }), {})
//결과는 products와 같음
// console.log(productsById)

//cartValidation 모듈 사용
app.use(cartValidation.resetValidation)
app.use(cartValidation.checkWaivers)
app.use(cartValidation.checkGuestCounts)

app.get('/', (req, res) => {
  //라우링되면 세션스토리지*cart 가 있으면 cart에 넣고, 없으면 빈배열을 넣는다.
  const cart = req.session.cart || { items: [] }
  //products와 cart를 context에 담아 home에 보내고 렌더
  const context = { products, cart }
  res.render('home', context)
})

//잘 이해가 안 가는 부분..
app.post('/add-to-cart', (req, res) => {
  if(!req.session.cart) req.session.cart = { items: [] }
  const { cart } = req.session
  Object.keys(req.body).forEach(key => {
    if(!key.startsWith('guests-')) return
    const productId = key.split('-')[1]
    const product = productsById[productId]
    const guests = Number(req.body[key])
    if(guests === 0) return
    if(!cart.items.some(item => item.product.id === productId)) cart.items.push({ product, guests: 0 })
    const idx = cart.items.findIndex(item => item.product.id === productId)
    const item = cart.items[idx]
    item.guests += guests
    if(item.guests < 0) item.guests = 0
    if(item.guests === 0) cart.items.splice(idx, 1) 
  })
  res.redirect('/')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `Express started on http://localhost:${port}` +
  '; press Ctrl-C to terminate.'))