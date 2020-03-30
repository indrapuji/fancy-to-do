const { Todo } = require('../models')

class TodoControllers {

    static getTodos(req, res) {
        Todo.findAll()
            .then(todos => {
                res.status(200).json({ todos: todos })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static getTodoId(req, res) {
        const option = { where: { id: req.params.id } }
        Todo.findOne(option)
            .then(todo => {
                if (todo) {
                    res.status(200).json({ todo: todo })
                } else {
                    res.status(404).json({
                        message: 'error not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static addTodo(req, res) {
        const { title, description, due_date } = req.body
        Todo.create({
            title,
            description,
            status: false,
            due_date
        })
            .then(todo => {
                res.status(201).json({ todo })
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        
    }

    static deleteTodo(req, res) {
        const option = { where: { id: req.params.id } }
        Todo.destroy(option)
            .then(todo => {
                if (todo) {
                    res.status(200).json({ todo: todo })
                } else {
                    res.status(404).json({
                        message: 'error not found'
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoControllers