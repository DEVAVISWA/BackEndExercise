const { info } = require("./logger")

const requestLogger = (req, res, next) => {
    info('Method :', req.method)
    console.log('Path :', req.path)
    info('Body :', req.body)
    info('Headers :', req.headers)
    info('--------------------')
    next()
}
module.exports ={
    requestLogger
}