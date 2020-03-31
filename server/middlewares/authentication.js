const jwt = require('jsonwebtoken')

const authentication = function (req, res, next) {
    try {
        const { token } = req.headers
        if (!token) {
            res.status(404).json({
                message: 'token not found'
            })
        } else {
            const decoded = jwt.verify(token, 'apaajadeh')
            req.user = decoded
            next()
        }
    } catch (error) {
        res.status(400).json({
            message: 'forbidden access'
        })
    }
}

module.exports = authentication