const flashMiddleware = (req, res, next) => {
    res.locals.flash = req.session.flash
    console.log('[Debug Msg] : flash.js, flash = ' + req.session.flash)
    if(req.session.flash) {
        console.log('[Debug Msg] : flash.js type = ' + req.session.flash.type)
    }
    delete req.session.flash
    next()
}

module.exports = flashMiddleware