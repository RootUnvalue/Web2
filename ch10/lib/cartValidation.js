module.exports = {

    resetValidation(req, res, next) {
      const { cart } = req.session
      if(cart) {
        cart.warnings = []
        cart.errors = []
      }
      next()
    },
  
    checkWaivers(req, res, next) {
      const { cart } = req.session
      if(!cart) return next()
      if(cart.items.some(item => item.product.requiresWaiver)) {
        cart.warnings.push('선택된 항목 중, 면책 동의서를 요구하는 항목이 있습니다.')
      }
      next()
    },
  
    checkGuestCounts(req, res, next) {
      const { cart } = req.session
      if(!cart) return next()
      if(cart.items.some(item => item.guests > item.product.maxGuests )) {
        cart.errors.push('선택된 항목 중, 제한된 인원을 초과하여 선택된 항목이 있습니다.')
      }
      next()
    },
  
  }