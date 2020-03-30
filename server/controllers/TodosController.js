const { Todo } = require('../models')

class TodoControllers {

    static getTodos(req, res) {
        Todo.findAll()
            .then(todo => {
            
            })
            .catch(err => {
            
        })
    }
}

module.exports = TodoControllers