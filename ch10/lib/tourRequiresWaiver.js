module.exports = (req, res, next) => {
    const {cart} = req.session
    if(!cart) return next()
    if(cart.items.some(item => item.product.requiresWaiver)) {
        cart.warnings.push('선택된 항목 중 면책 동의서를 요구하는 항목이 있습니다.')
    }
    next()
}