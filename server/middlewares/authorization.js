const { Todo } = require('../models')

const authorization = function (req, res, next) {
    let id = req.params.id
    let option = { where: { id } }
    Todo.findOne(option)
        .then(data => {
            if (!data) {
                res.status(404).json({
                    message: 'Todo not found'
                })
            } else {
                if (data.userId !== req.user.id) {
                    res.status(400).json({
                        message: 'forbiden access'
                    })
                }
            }
            next()
        })
        .catch(err => {
            res.status(500).json({
                message: 'Internal server Error'
            })
        })
}

module.exports = authorization